import React, { useState } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'

import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { IMLocalized } from '../../../../localization/IMLocalization'
import IMProfileItemView from '../IMProfileItemView/IMProfileItemView'
import { TNProfilePictureSelector } from '../../../../truly-native'
import { storageAPI, authAPI } from '../../../../api'

const IMUserProfileComponent = props => {
  const { appStyles, menuItems, onUpdateUser, onLogout } = props

  const currentUser = useSelector(state => state.auth.user)

  const { profilePictureURL, userID } = currentUser

  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)
  const [profilePicture, setProfilePicture] = useState(profilePictureURL)

  const displayName = () => {
    const { firstName, lastName, fullname } = currentUser
    if (
      (firstName && firstName.length > 0) ||
      (lastName && lastName.length > 0)
    ) {
      return firstName + ' ' + lastName
    }
    return fullname || ''
  }

  const setProfilePictureFile = photoFile => {
    if (photoFile == null) {
      // Remove profile photo action
      setProfilePicture(null)
      authAPI.updateProfilePhoto(userID, null).then(finalRes => {
        if (finalRes.success == true) {
          onUpdateUser({ ...currentUser, profilePictureURL: null })
        }
      })
      return
    }
    // If we have a photo, we upload it to the backend, and then update the user
    storageAPI.processAndUploadMediaFile(photoFile).then(response => {
      if (response.error) {
        // there was an error, fail silently
      } else {
        authAPI
          .updateProfilePhoto(userID, response.downloadURL)
          .then(finalRes => {
            if (finalRes.success == true) {
              onUpdateUser({
                ...currentUser,
                profilePictureURL: response.downloadURL,
              })
            }
          })
      }
    })
  }

  const renderMenuItem = (menuItem, index) => {
    const { title, icon, onPress, tintColor } = menuItem
    return (
      <IMProfileItemView
        title={title}
        icon={icon}
        iconStyle={{ tintColor: tintColor }}
        onPress={onPress}
        appStyles={appStyles}
        key={index}
      />
    )
  }

  const myProfileScreenContent = () => {
    return (
      <>
        <View style={styles.container}>
          <StatusBar
          // backgroundColor={useDynamicValue('#ffffff', '#121212')}
          // barStyle={useDynamicValue('dark-content', 'light-content')}
          />
          <View style={styles.imageContainer}>
            <TNProfilePictureSelector
              setProfilePictureFile={setProfilePictureFile}
              appStyles={appStyles}
              profilePictureURL={profilePicture}
            />
          </View>
          <Text style={styles.userName}>{displayName()}</Text>
          {menuItems.map((menuItem, index) => {
            return renderMenuItem(menuItem, index)
          })}
          <Text onPress={onLogout} style={styles.logout}>
            {IMLocalized('Logout')}
          </Text>
        </View>
      </>
    )
  }

  return <>{myProfileScreenContent()}</>
}

export default IMUserProfileComponent
