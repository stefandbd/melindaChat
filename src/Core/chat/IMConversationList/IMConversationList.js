import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ActivityIndicator } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import IMConversationView from '../IMConversationView'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { TNEmptyStateView } from '../../truly-native'

const IMConversationList = memo(props => {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    user,
    appStyles,
    headerComponent,
  } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)
  const filterUnreadMessages = conversations?.filter((item) => {
    return item.markedAsRead === false;
  });

  useEffect(()=>{
    if(filterUnreadMessages && filterUnreadMessages.length >0){
      PushNotificationIOS.setApplicationIconBadgeNumber(filterUnreadMessages.length);
    }
  })

  const renderConversationView = ({ item }) => (
    <IMConversationView
      onChatItemPress={onConversationPress}
      item={item}
      appStyles={appStyles}
      user={user}
    />
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        <FlatList
          vertical={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={conversations}
          renderItem={renderConversationView}
          keyExtractor={item => `${item.id}`}
          removeClippedSubviews={false}
          ListHeaderComponent={headerComponent}
          ListEmptyComponent={
            <View style={styles.emptyViewContainer}>
              <TNEmptyStateView
                emptyStateConfig={emptyStateConfig}
                appStyles={appStyles}
              />
            </View>
          }
        />
      </View>
    </View>
  )
})

IMConversationList.propTypes = {
  onConversationPress: PropTypes.func,
  conversations: PropTypes.array,
}

export default IMConversationList
