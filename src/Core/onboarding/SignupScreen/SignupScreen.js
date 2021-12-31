import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import Button from 'react-native-button'
import CustomButton from '../../../components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppImages } from '../../../theme'
import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import TNActivityIndicator from '../../truly-native/TNActivityIndicator'
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector'
import { IMLocalized } from '../../localization/IMLocalization'
import { setUserData } from '../redux/auth'
import { connect } from 'react-redux'
import { localizedErrorMessage } from '../utils/ErrorCode'
import TermsOfUseView from '../components/TermsOfUseView'
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { ConfigData } from '../../../config/config';
import Modal from "react-native-modal";
import RNSmtpMailer from "react-native-smtp-mailer";

const SignupScreen = props => {
  const appConfig = props.route.params.appConfig
  const appStyles = props.route.params.appStyles
  const authManager = props.route.params.authManager

  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)

  const [inputFields, setInputFields] = useState({})

  const [profilePictureFile, setProfilePictureFile] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingUI, setLoadingUI] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [amountEnter, setAmountEnter] = useState(100);
  const [key, setKey] = useState('');
  const { confirmPayment, createPaymentMethod, confirmCardPayment } = useStripe();
  const registerDisabled = false;

  useEffect(() => {
    async function fetchMyAPI() {
        const response = await fetch(`${ConfigData.payStripe}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amountEnter,
                currency: 'eur',
            })
        })
            .then(res => {
                return res.json();
            })
            .then((data) => {
              console.log('clientSecret', data.clientSecret);
                setKey((data.clientSecret));
            })
            .catch(e => Alert.alert(e.message));
    }
    fetchMyAPI();
}, [amountEnter]);

  const validateEmail = text => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(String(text).toLowerCase()) ? true : false
  }

  const validatePassword = text => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])/
    return reg.test(String(text)) ? true : false
  }

  const onModalPress = async () => {
        setModalVisible(!isModalVisible);
}

const onOpenModal = () => {
  if (inputFields?.password !== inputFields?.repassword) {
    Alert.alert(
      '',
      IMLocalized('Passwords dont match'),
      [{ text: IMLocalized('OK') }],
      {
        cancelable: false,
      },
    )
    setInputFields(prevFields => ({
      ...prevFields,
      password: '',
      repassword: '',
    }))
    return
  }
  else {
  setModalVisible(true);
  }
}

  const trimFields = fields => {
    var trimmedFields = {}
    Object.keys(fields).forEach(key => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim()
      }
    })
    return trimmedFields
  }

  const onRegister = async () => {
    const { error: usernameError } =
      await authManager.validateUsernameFieldIfNeeded(inputFields, appConfig)
    if (usernameError) {
      Alert.alert(
        '',
        IMLocalized(usernameError),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      )
      setInputFields(prevFields => ({
        ...prevFields,
        password: '',
      }))
      return
    }

    if (!validateEmail(inputFields?.email?.trim())) {
      Alert.alert(
        '',
        IMLocalized('Please enter a valid email address.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    }

    if (inputFields?.password?.trim() == '') {
      Alert.alert(
        '',
        IMLocalized('Password cannot be empty.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      )
      setInputFields(prevFields => ({
        ...prevFields,
        password: '',
      }))
      return
    }

    if (inputFields?.password?.trim()?.length < 6) {
      Alert.alert(
        '',
        IMLocalized(
          'Password is too short. Please use at least 6 characters for security reasons.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      )
      setInputFields(prevFields => ({
        ...prevFields,
        password: '',
      }))
      return
    }

    // if (!validatePassword(password)) {
    //   Alert.alert(
    //     '',
    //     IMLocalized(
    //       'The password must contain at least one uppercase and lowercase letter',
    //     ),
    //     [{ text: IMLocalized('OK') }],
    //     {
    //       cancelable: false,
    //     },
    //   );
    //   setPassword('');
    //   return;
    // };

    setLoadingUI(true);

    const userDetails = {
      ...trimFields(inputFields),
      photoFile: profilePictureFile,
      appIdentifier: appConfig.appIdentifier,
    }
    if (userDetails.username) {
      userDetails.username = userDetails.username?.toLowerCase()
    }
    const result = await createPaymentMethod({
      type: 'Card',
      card: cardDetails,
      billing_details: {
          email: userDetails.email,
      },
  });
  console.log('result createPaymentMethod', result);

  const res = await fetch(`${ConfigData.paySubscription}`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          'payment_method': result.paymentMethod.id,
          'email': userDetails.email,
      })
  })
      .then(res => {
          console.log('res', res);
          return res.json();
      })
      .then((data) => {
          console.log('data', data);
          return data;
      })
      .catch(e => {
          Alert.alert(e.message);
          setLoadingUI(false);
      });
  // eslint-disable-next-line camelcase

  const { client_secret, status } = res;

      if (status === 'requires_action') {
          confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                  console.log('There was an issue!');
                  console.log(result.error);
                  setLoadingUI(false);
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
              } else {
                  console.log('You got the money!');
                  // Show a success message to your customer
              }
          });
      } else {
          console.log('You got the money!');
          authManager
          .createAccountWithEmailAndPassword(userDetails, appConfig)
          .then(response => {
            const user = response.user
            if (user) {
              props.setUserData({
                user: response.user,
              })
              Keyboard.dismiss();
              sendConfirmationEmail(userDetails.email);
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'MainStack', params: { user: user } }],
              })
            } else {
              setLoadingUI(false);
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
  }

  const sendConfirmationEmail = async (email) => {
    await RNSmtpMailer.sendMail({
      mailhost: "devnative.ro",
      port: "465",
      ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "office@devnative.ro",
      password: "4xB7TVv8uOMA",
      from: "melinda@musictherapy.ro",
      recipients: `${email}`,
      subject: "Bine ai venit la Melinda!",
      htmlBody: "<h1>Bine ai venit la Melinda!</h1><p>Contul tau a fost creat cu succes si este activ. Iti poti incepe calatoria!</p><h3>Detalii cont</h3><ul><li>Utilizator: " + email + "</li><li>Cont activ timp de: 1 luna</li></ul><span>Multumim,</span><br><span>Echipa <strong>MusicTherapy</strong></span>"
  })
      .then(success => console.log('success smtp', success))
      .catch(err => console.log('err smtp', err));
  } 

  const onChangeInputFields = (text, key) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }))
  }

  const renderInputField = (field, index) => {
    return (
      <TextInput
        key={index?.toString()}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        secureTextEntry={field.secureTextEntry}
        onChangeText={text => onChangeInputFields(text, field.key)}
        value={inputFields[field.key]}
        keyboardType={field.type}
        underlineColorAndroid="transparent"
        autoCapitalize={field.autoCapitalize}
      />
    )
  }

  const renderSignupWithEmail = () => {
    return (
      <>
        {appConfig.signupFields.map(renderInputField)}
        <TouchableOpacity disabled style={styles.amountContainer}>
          <Text style={styles.amountText}>111€/luna</Text>
        </TouchableOpacity>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          // onPress={() => onRegister()}>
          onPress={() => onOpenModal()}>
          {IMLocalized('Pay & Sign Up')}
        </Button>
      </>
    )
  }

  return (
    <ImageBackground
    style={styles.imgBg}
    resizeMode='cover'
    source={AppImages.bgImage}>
    <View style={styles.container}>
    <KeyboardAwareScrollView
    style={{ flex: 1, width: '100%' }}
    keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={appStyles.styleSet.backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{IMLocalized('Create new account')}</Text>
        <TNProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
          appStyles={appStyles}
        />
        {renderSignupWithEmail()}
        <TermsOfUseView
          tosLink={appConfig.tosLink}
          privacyPolicyLink={appConfig.privacyPolicyLink}
          style={styles.tos}
        />
    </KeyboardAwareScrollView>
      {loadingUI && <TNActivityIndicator appStyles={appStyles} />}
      <Modal isVisible={isModalVisible}
                        swipeDirection={['up', 'down']}
                        style={styles.modalView}
                    >
                         <KeyboardAvoidingView behavior="padding" style={{display: 'flex', flex: 1}}>
                        <View style={styles.modalContainerStyle}>
                            <View style={styles.modalContent}>
                                {loadingUI ? <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <ActivityIndicator size={'large'} />
                                </View> : <>
                                    <CardField
                                        postalCodeEnabled={false}
                                        placeholder={{
                                            number: '4242 4242 4242 4242',
                                        }}
                                        cardStyle={{
                                            backgroundColor: '#FFFFFF',
                                            textColor: '#000000',
                                        }}
                                        style={{
                                            width: '100%',
                                            height: 50,
                                            marginVertical: 30,
                                        }}
                                        onCardChange={(cardDetails) => {
                                            setCardDetails(cardDetails);
                                        }}
                                    />

                                    <View style={styles.loginButtonView}>
                                        <CustomButton
                                            label={'Pay & Sign Up'}
                                            buttonStyle={registerDisabled ? styles.buttonLoginDisabled : styles.buttonLogin}
                                            textColor={registerDisabled ? styles.touchableLoginDisabled : styles.touchableLogin}
                                            onPress={onRegister}
                                            disabled={registerDisabled}
                                        />
                                        <CustomButton
                                            label={'Inchide'}
                                            buttonStyle={styles.buttonLogin}
                                            textColor={styles.touchableLogin}
                                            onPress={onModalPress}
                                        />
                                    </View>
                                </>}
                            </View>
                        </View>
                        </KeyboardAvoidingView>
                    </Modal>
    </View>
    </ImageBackground>
  )
}

export default connect(null, {
  setUserData,
})(SignupScreen)
