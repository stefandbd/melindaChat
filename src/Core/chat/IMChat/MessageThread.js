import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View, Animated, TouchableOpacity, Image } from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import ThreadItem from './ThreadItem'
import TypingIndicator from './TypingIndicator'
import dynamicStyles from './styles'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AppImages } from '../../../theme'

function MessageThread(props) {
  const {
    thread,
    user,
    onChatMediaPress,
    appStyles,
    onSenderProfilePicturePress,
    onMessageLongPress,
    channelItem,
    onSwipeReplyPress,
    setTempItem,
  } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  const [isParticipantTyping, setIsParticipantTyping] = useState(false)
  const [localItem, setLocalItem] = useState(null)

  useEffect(() => {
    if (channelItem?.typingUsers) {
      getUsersTyping()
    }
  }, [channelItem])

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })
    return (
      <TouchableOpacity style={styles.rightAction}>
        <Animated.View
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          <Image
            style={{ width: 24, height: 24, marginLeft: 8, marginTop: 8 }}
            source={AppImages.reply}
          />
        </Animated.View>
      </TouchableOpacity>
    )
  }

  const getUsersTyping = () => {
    const userID = user.id || user.userID
    const typingUsers = channelItem.typingUsers?.filter(
      typingUser => typingUser.isTyping && typingUser.userID !== userID,
    )

    if (typingUsers?.length > 0) {
      setIsParticipantTyping(true)
    } else {
      setIsParticipantTyping(false)
    }
  }

  const renderListHeaderComponent = () => {
    return (
      isParticipantTyping && (
        <View style={[styles.receiveItemContainer]}>
          <View style={styles.indicatorContainer}>
            <View style={styles.typingIndicatorContainer}>
              <TypingIndicator
                containerStyle={styles.indicatorDotContainer}
                dotRadius={5}
              />
            </View>
            <View style={styles.typingIndicatorContentSupport} />
            <View style={styles.typingIndicatorSupport} />
          </View>
        </View>
      )
    )
  }
  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    if (localItem) {
      closeRow(localItem);
    }
  }, [localItem]);

  const closeRow = (index) => {
    row[index].close();
    prevOpenedRow = row[index];
}

  const renderChatItem = ({ item, index }) => {
    const isRecentItem = 0 === index
    return (
      <Swipeable
        ref={ref => row[index] = ref}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={() => {onSwipeReplyPress(item, 0); setLocalItem(index)}}
        onSwipeableWillOpen={() => setTempItem(item)}>
        <ThreadItem
          item={item}
          key={'chatitem' + index}
          user={{ ...user, userID: user.id }}
          appStyles={appStyles}
          onChatMediaPress={onChatMediaPress}
          onSenderProfilePicturePress={onSenderProfilePicturePress}
          onMessageLongPress={onMessageLongPress}
          isRecentItem={isRecentItem}
        />
      </Swipeable>
    )
  }

  return (
    <FlatList
      inverted={true}
      vertical={true}
      style={styles.messageThreadContainer}
      showsVerticalScrollIndicator={false}
      data={thread}
      renderItem={renderChatItem}
      contentContainerStyle={styles.messageContentThreadContainer}
      removeClippedSubviews={true}
      ListHeaderComponent={() => renderListHeaderComponent()}
      keyboardShouldPersistTaps={'never'}
    />
  )
}

MessageThread.propTypes = {
  thread: PropTypes.array,
  user: PropTypes.object,
  onChatMediaPress: PropTypes.func,
}

export default MessageThread
