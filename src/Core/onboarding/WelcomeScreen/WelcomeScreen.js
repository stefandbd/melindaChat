import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-native-button'
import { AppState, ImageBackground, Keyboard, Platform, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import TNActivityIndicator from '../../truly-native/TNActivityIndicator'
import { IMLocalized } from '../../localization/IMLocalization'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { setUserData } from '../redux/auth'
import { updateUser } from '../../api/firebase/auth'
import { IMDismissButton } from '../../truly-native';
import { AppImages } from '../../../theme'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { localizedErrorMessage } from '../utils/ErrorCode'

const WelcomeScreen = props => {
  const currentUser = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const appStyles = props?.appStyles
    ? props?.appStyles
    : props.route?.params?.appStyles
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)
  const appConfig = props?.appConfig
    ? props?.appConfig
    : props.route?.params?.appConfig
  const authManager = props?.authManager
    ? props?.authManager
    : props.route?.params?.authManager

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const onPressLogin = () => {
      setLoading(true)
      authManager
        .loginWithEmailAndPassword(
          email && email.trim(),
          password && password.trim(),
          appConfig,
        )
        .then(response => {
          if (response?.user) {
            const user = response.user
            props.setUserData({
              user: response.user,
            })
            Keyboard.dismiss()
            // props.navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'MainStack', params: { user: user } }],
            // })
            props.navigation.push('DashboardScreen', {
              user: user,
            })
          } else {
            setLoading(false)
            Alert.alert(
              '',
              localizedErrorMessage(response.error),
              [{ text: IMLocalized('OK') }],
              {
                cancelable: false,
              },
            )
          }
        })
    }
  
    const onForgotPassword = async () => {
      props.navigation.push('ResetPassword', {
        isResetPassword: true,
        appStyles,
        appConfig,
      })
    }

  useEffect(() => {
    registerOnNotificationOpenedApp()
    AppState.addEventListener('change', handleAppStateChange)
    tryToLoginFirst()
  }, [])

  const handleAppStateChange = async nextAppState => {
    const userID = currentUser?.id || currentUser?.userID
    const intialNotification = await messaging().getInitialNotification()

    if (intialNotification && Platform.OS === 'android') {
      const {
        data: { channelID, type },
      } = intialNotification

      if (type === 'chat_message') {
        handleChatMessageType(channelID)
      }
    }

    if (nextAppState === 'active' && userID && Platform.OS === 'ios') {
      updateUser(userID, { badgeCount: 0 })
    }
  }

  const tryToLoginFirst = async () => {
    authManager
      .retrievePersistedAuthUser(appConfig)
      .then(response => {
        if (response?.user) {
          const user = response.user
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user: user } }],
          })
          return
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const registerOnNotificationOpenedApp = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      const {
        data: { channelID, type, name },
      } = remoteMessage

      if (type === 'chat_message') {
        handleChatMessageType(channelID, name)
      }
    })
    messaging().onMessage(remoteMessage => {
      if (remoteMessage && Platform.OS === 'ios') {
        const userID = currentUser?.id || currentUser?.userID
        updateUser(userID, { badgeCount: 0 })
      }
    })
  }

  const handleChatMessageType = (channelID, name) => {
    const channel = {
      id: channelID,
      channelID,
      name,
    }

    props.navigation.navigate(
      'LoginStack',
      { screen: 'PersonalChat' },
      {
        params: {
          channel,
          appStyles,
          openedFromPushNotification: true,
        },
      },
    )
  }

  if (isLoading == true) {
    return <TNActivityIndicator appStyles={appStyles} />
  }

  return (
    <KeyboardAwareScrollView
    style={{ flex: 1, width: '100%' }}
    keyboardShouldPersistTaps="always">
    <ImageBackground
    style={styles.imgBg}
    resizeMode='cover'
    source={AppImages.bgImage}>

    <View style={styles.container}>
      {props.delayedMode && (
        <IMDismissButton
          style={styles.dismissButton}
          tintColor={appStyles.colorSet[colorScheme].mainThemeForegroundColor}
          onPress={() => props.navigation.goBack()}
        />
      )}
      <View style={styles.logo}>
                        <Text style={styles.logoTitle}>Melinda</Text>
      </View>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail')}
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={IMLocalized('Password')}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordText}
            onPress={() => onForgotPassword()}>
            {IMLocalized('Forgot password?')}
          </Button>
        </View>
        {loading && <TNActivityIndicator appStyles={appStyles} />}
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => onPressLogin()}>
        {IMLocalized('Log In')}
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => {
    props.navigation.navigate('LoginStack', {
                screen: 'Signup',
                params: {
                  appStyles,
                  appConfig,
                  authManager,
                },
              })
        }}>
        {IMLocalized('Sign Up')}
      </Button>
    </View>
    </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

export default connect(null, {
  setUserData,
})(WelcomeScreen)

