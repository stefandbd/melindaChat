import { IMLocalized } from '../../localization/IMLocalization'

const formatMessage = message => {
  const mime = message?.url?.mime || message?.mime
  if (mime) {
    if (mime.startsWith('video')) {
      return IMLocalized('Someone sent a video.')
    } else if (mime.startsWith('audio')) {
      return IMLocalized('Someone sent an audio.')
    } else if (mime.startsWith('image')) {
      return IMLocalized('Someone sent a photo.')
    }
  }
  if (message?.content && message.content.length > 0) {
    return message?.content
  } else if (message && message.length > 0) {
    return message
  } else if (message) {
    return JSON.stringify(message)
  }
  return ''
}

export { formatMessage }
