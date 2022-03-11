import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-native-button'
import { AppState, ImageBackground, Keyboard, Platform, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
// import * as RNLocalize from "expo-localization";
import DropDownPicker from 'react-native-dropdown-picker';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator'
import { IMLocalized } from '../../localization/IMLocalization'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { setUserData, setUserStripeData } from '../redux/auth'
import { updateUser } from '../../api/firebase/auth'
import { IMDismissButton } from '../../truly-native';
import { AppImages } from '../../../theme'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { localizedErrorMessage } from '../utils/ErrorCode'
import { ConfigData } from '../../../config/config';
import {setI18nConfig} from '../../../Core/localization/IMLocalization'


const WelcomeScreen = props => {
  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Română', value: 'ro'},
    {label: 'English', value: 'en'}
  ]);
  // useEffect(() => {
  //   RNLocalize.addEventListener("change", handleLocalizationChange);
  //   return () => {
  //     RNLocalize.removeEventListener("change", handleLocalizationChange);
  //   };
  // }, []);

  const handleLocalizationChange = (language) => {
    setI18nConfig(language);
    // useForceUpdate();
  };

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
  
    const onPressLogin = async () => {
      setLoading(true);
      const res = await fetch(`${ConfigData.getSubscriptionStatus}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email': email,
        })
    })
        .then(res => {
            console.log('res', res);
            return res.json();
        })
        .then((data) => {
            console.log('data', data);
            setIsLoading(false);
            const { subscriptions } = data.customer[0];
            const isActive = subscriptions.data[0].status;
            if (isActive === 'active') {
              authManager
              .loginWithEmailAndPassword(
                email && email.trim(),
                password && password.trim(),
                appConfig,
              )
              .then(response => {
                if (response?.user) {
                  const user = response.user;
                  response.user['stripeCustomerInfo'] = data.customer[0];
                  props.setUserData({
                    user: response.user,
                  })
                  props.setUserStripeData({
                    stripeUser: data.customer[0],
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
            } else {
                alert('Contul tau nu este platit!')
            }
            return data;
        })
        .catch(e => {
            setIsLoading(false);
            alert(e.message);
        });
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
    <View style={styles.languagePickerView}>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onSelectItem={(item) => {
        handleLocalizationChange(item.value);
      }}
      style={{
        backgroundColor: "#4395f8",
        height: 40,
      }}
      textStyle={{
        fontSize: 14,
        color: '#000'
      }}
      containerStyle={{
        backgroundColor: "#4395f8",
      }}
    />
      </View>
    </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

export default connect(null, {
  setUserData, setUserStripeData
})(WelcomeScreen)

