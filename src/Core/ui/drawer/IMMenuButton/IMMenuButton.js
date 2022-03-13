import React from 'react'
import { useSelector } from 'react-redux'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import dynamicStyles from './styles'

const IMMenuButton = props => {
  const { appStyles } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)
  const friendships = useSelector(state => state.friends.friendships)
  const filterInboundFriends = friendships?.filter((friend) => {
    return friend.type === 'inbound'
  });
  const inboundLength = filterInboundFriends?.length > 0 ? filterInboundFriends?.length : '';

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.btnClickContain, props.containerStyle]}
      underlayColor={styles.btnClickContain.backgroundColor}>
      <View style={styles.btnContainer}>
        {props.source && <Image source={props.source} style={styles.btnIcon} />}
        <Text style={styles.btnText}>{props.title}</Text>
        {filterInboundFriends?.length > 0 && props.badge &&  
      <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{inboundLength}</Text>
      </View>
      }
      </View>
    </TouchableHighlight>
  )
}

export default IMMenuButton
