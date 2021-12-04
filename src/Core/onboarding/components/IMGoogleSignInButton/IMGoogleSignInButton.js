import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function IMGoogleSignInButton({ containerStyle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image
        source={require('../../../../CoreAssets/googlebutton.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}
