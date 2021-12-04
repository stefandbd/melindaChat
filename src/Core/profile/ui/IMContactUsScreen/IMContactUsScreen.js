import React, { useLayoutEffect, useRef, useEffect } from 'react'
import { BackHandler, Linking } from 'react-native'
import { IMLocalized } from '../../../localization/IMLocalization'
import IMFormComponent from '../IMFormComponent/IMFormComponent'
import { Appearance } from 'react-native-appearance'

function IMContactUsScreen(props) {
  let appStyles = props.route.params.appStyles
  let screenTitle = props.route.params.screenTitle || IMLocalized('Contact Us')
  let COLOR_SCHEME = Appearance.getColorScheme()
  let currentTheme = appStyles.navThemeConstants[COLOR_SCHEME]
  const form = props.route.params.form
  const phone = props.route.params.phone
  const initialValuesDict = {}

  const didFocusSubscription = useRef(null)
  const willBlurSubscription = useRef(null)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: screenTitle,
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

  const onFormButtonPress = _buttonField => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <IMFormComponent
      form={form}
      initialValuesDict={initialValuesDict}
      navigation={props.navigation}
      appStyles={appStyles}
      onFormButtonPress={onFormButtonPress}
    />
  )
}

export default IMContactUsScreen
