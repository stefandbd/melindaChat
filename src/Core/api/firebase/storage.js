import { ErrorCode } from '../../onboarding/utils/ErrorCode'
import { firebase } from './config'
import { processMediaFile } from '../../helpers/mediaProcessor'

const getBlob = async uri => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      resolve(xhr.response)
    }
    xhr.onerror = error => console.log('error')
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

const uploadFile = async (processedUri, callbackProgress) => {
  let finished = false
  const filename = processedUri.substring(processedUri.lastIndexOf('/') + 1)
  const blob = await getBlob(processedUri)
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(filename)
  const uploadTask = fileRef.put(blob)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        if (snapshot.state == firebase.storage.TaskState.SUCCESS) {
          if (finished == true) {
            return
          }
          finished = true
        }
        callbackProgress && callbackProgress(snapshot)
      },
      error => {
        console.log('upload error:', error)
        reject(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      },
    )
  })
}

const processAndUploadMediaFileWithProgressTracking = (
  file,
  callbackProgress,
  callbackSuccess,
  callbackError,
) => {
  processMediaFile(file, ({ processedUri, thumbnail }) => {
    // Success handler with SUCCESS is called multiple times on Android. We need work around that to ensure we only call it once
    uploadFile(processedUri, callbackProgress)
      .then(downloadURL => {
        if (thumbnail) {
          uploadFile(thumbnail, callbackProgress)
            .then(thumbnailURL => {
              callbackSuccess(downloadURL, thumbnailURL)
            })
            .catch(callbackError)

          return
        }
        callbackSuccess(downloadURL)
      })
      .catch(callbackError)
  })
}

const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      uploadFile(processedUri)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))

            return
          }
          resolve({ downloadURL })
        })
        .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))
    })
  })
}

const firebaseStorage = {
  processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking,
}

export default firebaseStorage
