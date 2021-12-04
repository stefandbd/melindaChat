import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IMLocalized } from '../../../localization/IMLocalization'
import { setUserData } from '../../../onboarding/redux/auth'
import { userAPIManager } from '../../../api'
import IMFormComponent from '../IMFormComponent/IMFormComponent'
import { Appearance } from 'react-native-appearance'

export default function IMUserSettingsScreen(props) {
  const appStyles = props.route.params.appStyles
  let screenTitle = props.route.params.screenTitle || IMLocalized('Settings')
  let COLOR_SCHEME = Appearance.getColorScheme()
  let currentTheme = appStyles.navThemeConstants[COLOR_SCHEME]

  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const form = props.route.params.form
  const initialValuesDict = currentUser.settings || {}

  const willBlurSubscription = useRef(null)
  const didFocusSubscription = useRef(null)
  // const [form] = useState(props.form);
  const [alteredFormDict, setAlteredFormDict] = useState({})

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
    willBlurSubscription.current = props.navigation.addListener(
      'beforeRemove',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        ),
    )
    didFocusSubscription.current = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener(
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

  const onFormSubmit = () => {
    var newSettings = currentUser.settings || {}

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key]
        if (newValue != null) {
          newSettings[field.key] = alteredFormDict[field.key]
        }
      })
    })

    let newUser = { ...currentUser, settings: newSettings }
    userAPIManager.updateUserData(currentUser.id, newUser)
    dispatch(setUserData({ user: newUser }))
    props.navigation.goBack()
  }

  const onFormChange = alteredFormDict => {
    setAlteredFormDict(alteredFormDict)
  }

  const onFormButtonPress = buttonField => {
    onFormSubmit()
  }

  return (
    <IMFormComponent
      form={form}
      initialValuesDict={initialValuesDict}
      onFormChange={onFormChange}
      navigation={props.navigation}
      appStyles={appStyles}
      onFormButtonPress={onFormButtonPress}
    />
  )
}
