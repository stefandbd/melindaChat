import { firebase } from '../../api/firebase/config'
import { updateUser, getUserByID } from '../../api/firebase/auth'
import { userAPIManager } from '../../api'

const notificationsRef = firebase.firestore().collection('notifications')

const fcmURL = 'https://fcm.googleapis.com/fcm/send'
const firebaseServerKey =
  'AAAAeliTfEs:APA91bGve5fyExjSiUCB0oI09Br1yGUSb0tPHelAk7L0FUytHWGOMlBPexJubTwSjjJTaIlK7oto3jDevoj9c5Q4Qalk6QEtQ9Y3tYfTxHD7OrmPZuVJjVGGciPBJXThG9QHCZQqx9Id'

const handleUserBadgeCount = async userID => {
  const user = await getUserByID(userID)
  if (user?.badgeCount) {
    const newBadgeCount = user.badgeCount + 1
    updateUser(userID, { badgeCount: newBadgeCount })
    return newBadgeCount
  }
  return 0
}

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {
  if (metadata && metadata.outBound && toUser.id == metadata.outBound.id) {
    return
  }
  if (toUser.settings && toUser.settings.push_notifications_enabled == false) {
    return
  }
  // first, we fetch the latest push token of the recipient
  const userData = await userAPIManager.getUserData(toUser.id)
  const recipientData = userData?.data
  if (!recipientData || !recipientData.pushToken) {
    return
  }

  const notification = {
    toUserID: toUser.id,
    title,
    body,
    metadata,
    toUser,
    type,
    seen: false,
  }

  const ref = await notificationsRef.add({
    ...notification,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  notificationsRef.doc(ref.id).update({ id: ref.id })

  const userBadgeCount = await handleUserBadgeCount(toUser.id || toUser.userID)

  const pushNotification = {
    to: recipientData.pushToken,
    notification: {
      title: title,
      body: body,
      sound: 'default',
      badge: userBadgeCount,
    },
    data: { type, toUserID: toUser.id, ...metadata },
    priority: 'high',
  }

  fetch(fcmURL, {
    method: 'post',
    headers: new Headers({
      Authorization: 'key=' + firebaseServerKey,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(pushNotification),
  })
  console.log('sent push notifications ' + body + ' to ' + toUser.pushToken)
}

const sendCallNotification = async (sender, recipient, callType, callID) => {
  if (!recipient.id) {
    return
  }

  // first, we fetch the latest push token of the recipient
  const userData = await userAPIManager.getUserData(recipient.id)
  const recipientData = userData?.data
  if (!recipientData || !recipientData.pushToken) {
    return
  }

  const pushNotification = {
    to: recipientData.pushToken,
    priority: 'high',
    data: {
      recipientID: recipient.id,
      senderID: sender.id,
      callType,
      callID,
      callerName: sender.firstName,
      priority: 'high',
      contentAvailable: true,
    },
  }

  try {
    const response = await fetch(fcmURL, {
      method: 'post',
      headers: new Headers({
        Authorization: 'key=' + firebaseServerKey,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(pushNotification),
    })
    console.log('jjj push notif ' + JSON.stringify(pushNotification))
    console.log(JSON.stringify(response))
  } catch (error) {
    console.log(error)
  }
}

export const notificationManager = {
  sendPushNotification,
  sendCallNotification,
}
