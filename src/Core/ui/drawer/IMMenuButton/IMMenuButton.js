import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import dynamicStyles from './styles'

const IMMenuButton = props => {
  const { appStyles } = props
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.btnClickContain, props.containerStyle]}
      underlayColor={styles.btnClickContain.backgroundColor}>
      <View style={styles.btnContainer}>
        {props.source && <Image source={props.source} style={styles.btnIcon} />}
        <Text style={styles.btnText}>{props.title}</Text>
        {props.badge && 
      <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{props.friendsNotification}</Text>
      </View>
      }
      </View>
    </TouchableHighlight>
  )
}

export default IMMenuButton
