import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { BackHandler, Alert, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import TextButton from 'react-native-button'
import { userAPIManager } from '../../../api'
import IMFormComponent from '../IMFormComponent/IMFormComponent'
import { setUserData } from '../../../onboarding/redux/auth'
import { IMLocalized } from '../../../localization/IMLocalization'
import { Appearance } from 'react-native-appearance'
import {
  ErrorCode,
  localizedErrorMessage,
} from '../../../onboarding/utils/ErrorCode'
import { authManager } from '../../../onboarding/utils/api'
import dynamicStyles from './styles'

export default function IMEditProfileScreen(props) {
  const appStyles = props.route.params.appStyles
  const appConfig = props.route.params.appConfig
  let screenTitle = props.route.params.screenTitle
  let colorScheme = Appearance.getColorScheme()
  let currentTheme = appStyles.navThemeConstants[colorScheme]

  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const styles = dynamicStyles(appStyles, colorScheme)

  const form = props.route.params.form
  const onComplete = props.route.params.onComplete

  const [alteredFormDict, setAlteredFormDict] = useState({})

  const didFocusSubscription = useRef(null)
  const willBlurSubscription = useRef(null)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: screenTitle,
      headerRight: () => (
        <TextButton style={{ marginRight: 12 }} onPress={onFormSubmit}>
          Done
        </TextButton>
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    })
  }, [])

  useEffect(() => {
    didFocusSubscription.current = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        ),
    )
    willBlurSubscription.current = props.navigation.addListener(
      'beforeRemove',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        ),
    )

    return () => {
      didFocusSubscription.current && didFocusSubscription.current()
      willBlurSubscription.current && willBlurSubscription.current()
    }
  }, [])

  const onBackButtonPressAndroid = () => {
    props.navigation.goBack()
    return true
  }

  const isInvalid = (value, regex) => {
    const regexResult = regex.test(value)

    if (value.length > 0 && !regexResult) {
      return true
    }
    if (value.length > 0 && regexResult) {
      return false
    }
  }

  const onFormSubmit = () => {
    var newUser = { ...currentUser }
    var allFieldsAreValid = true

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key]?.trim()
        if (newValue != null) {
          if (field.regex && isInvalid(newValue, field.regex)) {
            allFieldsAreValid = false
          } else {
            newUser[field.key] = alteredFormDict[field.key]?.trim()
          }
        }
      })
    })

    if (allFieldsAreValid) {
      userAPIManager.updateUserData(currentUser.id, newUser)
      dispatch(setUserData({ user: newUser }))
      props.navigation.goBack()
      if (onComplete) {
        onComplete()
      }
    } else {
      alert(
        IMLocalized(
          'An error occurred while trying to update your account. Please make sure all fields are valid.',
        ),
      )
    }
  }

  const onFormChange = alteredFormDict => {
    setAlteredFormDict(alteredFormDict)
  }

  const onDeletePrompt = () => {
    Alert.alert(
      IMLocalized('Confirmation'),
      IMLocalized(
        'Are you sure you want to remove your account? This will delete all your data and the action is not reversible.',
      ),
      [
        {
          text: IMLocalized('Cancel'),
        },
        {
          text: IMLocalized('Yes'),
          onPress: onDeleteAccount,
        },
      ],
      {
        cancelable: false,
      },
    )
  }

  const onDeleteAccount = () => {
    authManager.deleteUser(currentUser?.id, response => {
      if (response.success) {
        Alert.alert(
          IMLocalized('Success'),
          IMLocalized('Successfully deleted account'),
        )
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoadScreen',
              params: { appStyles, appConfig },
            },
          ],
        })

        return
      }
      if (response.error === ErrorCode.requiresRecentLogin) {
        Alert.alert(
          IMLocalized(IMLocalized('Error')),
          IMLocalized(localizedErrorMessage(response.error)),
        )
        return
      }
      Alert.alert(
        IMLocalized(IMLocalized('Error')),
        IMLocalized(IMLocalized('We were not able to delete your account')),
      )
    })
  }

  return (
    <View style={styles.container}>
      <IMFormComponent
        form={form}
        initialValuesDict={currentUser}
        onFormChange={onFormChange}
        navigation={props.navigation}
        appStyles={appStyles}
      />
      <TextButton style={styles.deleteButton} onPress={onDeletePrompt}>
        {IMLocalized('Delete Account')}
      </TextButton>
    </View>
  )
}
