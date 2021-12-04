import { Dimensions, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
import { AppColors } from '../../../theme';
import { Fonts } from '../../../../assets/fonts';
import { I18nManager } from 'react-native'
import { modedColor } from '../../helpers/colors'
import TNColor from '../../truly-native/TNColor'

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    imgBg: {
      flex: 1,
      width: width,
      height: height,
  },
  logoTitle: {
    fontSize: 60,
    color: AppColors.textWhite,
    fontFamily: Fonts.AdageScriptJF,
},
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: -100,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 50,
      marginBottom: 20,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      height: 48,
    },
    signupContainer: {
      justifyContent: 'center',
      width: '70%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      height: 45,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    dismissButton: {
      position: 'absolute',
      top: 36,
      right: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      marginTop: 25,
      marginBottom: 20,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 30,
    },
    loginText: {
      color: '#ffffff',
    },
    placeholder: {
      color: 'red',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: modedColor(
        appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
        TNColor('#e0e0e0'),
      ),
      paddingLeft: 20,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    forgotPasswordContainer: {
      width: '80%',
      alignSelf: 'center',
      alignItems: 'flex-end',
    },
    forgotPasswordText: {
      fontSize: 14,
      padding: 4,
      color: 'white',
    },
  })
}

export default dynamicStyles
