import { subscribeSingleChannel, subscribeThreadSnapshot } from './channel'

export default class SingleChannelTracker {
  constructor(channel, userID) {
    this.channel = channel
    this.userID = userID
  }

  subscribe = (onMetadataChangeCallback, onMessagesChangeCallback) => {
    // We need to subscribe to the messages in this channelID
    this.unsubscribeThreadSnapshot = subscribeThreadSnapshot(
      this.channel,
      onMessagesChangeCallback,
      this.userID,
    )

    // We need to subscribe to the channel metadata changes
    this.unsubscribeSingleChannel = subscribeSingleChannel(
      this.channel.id,
      onMetadataChangeCallback,
    )
  }

  unsubscribe = () => {
    this.unsubscribeThreadSnapshot && this.unsubscribeThreadSnapshot()
    this.unsubscribeSingleChannel && this.unsubscribeSingleChannel()
  }
}
