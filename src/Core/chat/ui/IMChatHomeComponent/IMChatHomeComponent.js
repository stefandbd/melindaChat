import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'

import { SearchBarAlternate } from '../../..'
import { TNStoriesTray } from '../../../truly-native'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { IMConversationListView } from '../..'
import { IMLocalized } from '../../../localization/IMLocalization'

function IMChatHomeComponent(props) {
  const {
    friends,
    onSearchBarPress,
    onFriendItemPress,
    navigation,
    appStyles,
    onSenderProfilePicturePress,
    onEmptyStatePress,
    searchBarplaceholderTitle,
    emptyStateConfig,
    followEnabled,
  } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  const defaultEmptyStateConfig = {
    title: IMLocalized('No Conversations'),
    description: IMLocalized(
      'Add friends and start conversations',
    ),
    buttonName: IMLocalized('Add Friends'),
    onPress: onEmptyStatePress,
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        <IMConversationListView
          navigation={navigation}
          appStyles={appStyles}
          emptyStateConfig={emptyStateConfig ?? defaultEmptyStateConfig}
          headerComponent={
            <>
              <View style={styles.searchBarContainer}>
                <SearchBarAlternate
                  onPress={onSearchBarPress}
                  placeholderTitle={
                    searchBarplaceholderTitle ??
                    IMLocalized('Search for friends')
                  }
                  appStyles={appStyles}
                />
              </View>
              {friends && friends.length > 0 && (
                <TNStoriesTray
                  onStoryItemPress={onFriendItemPress}
                  storyItemContainerStyle={styles.userImageContainer}
                  data={friends}
                  displayLastName={false}
                  appStyles={appStyles}
                  showOnlineIndicator={true}
                />
              )}
            </>
          }
        />
      </View>
    </View>
  )
}

IMChatHomeComponent.propTypes = {
  onSearchClear: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFriendAction: PropTypes.func,
  onSearchBarPress: PropTypes.func,
  channels: PropTypes.array,
}

export default IMChatHomeComponent
