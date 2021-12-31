import { StyleSheet, Dimensions, I18nManager } from 'react-native'
import { modedColor } from '../../helpers/colors'
import TNColor from '../../truly-native/TNColor'
import { AppColors, AppSizes } from '../../../theme';
import { Fonts } from '../../../../assets/fonts';
const { height, width } = Dimensions.get('window');
const imageSize = height * 0.232
const photoIconSize = imageSize * 0.27

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
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 25,
      marginBottom: 30,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },

    content: {
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: 'center',
      fontSize: appStyles.fontSet.middle,
      color: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    loginContainer: {
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 30,
    },
    loginText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
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

    signupContainer: {
      alignSelf: 'center',
      width: appStyles.sizeSet.buttonWidth,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      borderRadius: appStyles.sizeSet.radius,
      padding: 10,
      marginTop: 50,
    },
    signupText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageBlock: {
      flex: 2,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      height: imageSize,
      width: imageSize,
      borderRadius: imageSize,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '100%',
      flex: 4,
      alignItems: 'center',
    },
    photo: {
      marginTop: imageSize * 0.77,
      marginLeft: -imageSize * 0.29,
      width: photoIconSize,
      height: photoIconSize,
      borderRadius: photoIconSize,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d9d9d9',
      opacity: 0.8,
      zIndex: 2,
    },
    orTextStyle: {
      color: 'black',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    PhoneNumberContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    smsText: {
      color: '#4267b2',
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    buttonLogin: {
      backgroundColor: AppColors.brand.brightBlue,
      borderRadius: 5,
      width: AppSizes.screen.width * 0.8,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
  },
  buttonLoginDisabled: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      borderRadius: 5,
      width: AppSizes.screen.width * 0.8,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
  },
  buttonLogin2: {
      backgroundColor: 'rgba(54, 97, 153, 0.8)',
      opacity: 0.9,
      borderRadius: 5,
      width: AppSizes.screen.width * 0.9,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  touchableLogin: {
      color: AppColors.textWhite,
      fontSize: 18,
      fontWeight: '800',
  },
  touchableLoginDisabled: {
      color: AppColors.brand.brightBlue,
      fontSize: 18,
      fontWeight: '100',
      textDecorationLine: 'line-through',
  },
  textInput: {
      position: 'relative',
      backgroundColor: AppColors.primary,
      color: '#000',
      fontSize: 15,
      height: 50,
      paddingLeft: 10,
  },
  imgBg: {
      flex: 1,
      width: width,
      height: height,
  },
  loginTitle: {
      fontSize: 38,
      color: AppColors.textWhite,
      fontFamily: Fonts.MontserratLight,
  },
  loginCreateAccount: {
      fontSize: 14,
      color: AppColors.textWhite,
      fontFamily: Fonts.MontserratLight,
  },
  loginCreateAccountBold: {
      fontSize: 14,
      fontWeight: '600',
      color: AppColors.textWhite,
      fontFamily: Fonts.MontserratLight,
  },
  dontAccountView: {
      position: 'absolute',
      bottom: 30,
      justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
      width: AppSizes.screen.width * 0.8,
  },
  loginSubtitle: {
      fontSize: 25,
  },
  stateMessage: {
      fontSize: 14,
      color: AppColors.brand.third,
      padding: 5,
  },
  loginButtonView: {
      flexDirection: 'column',
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },
    inputView: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 5,
      marginBottom: 10,
  },
  amountContainer: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 5,
      marginTop: 20,
      padding: 10,
      height: 40,
      width: AppSizes.screen.width * 0.75,
      alignSelf: 'center',
      alignItems: 'center'
  },
  amountText: {
    fontSize: 16,
  },
  welcome: {
      color: AppColors.textWhite,
      fontWeight: '300',
      fontSize: 22,
  },
  welcomeUser: {
      color: AppColors.textWhite,
      fontWeight: '600',
      fontSize: 22,
  },
  welcomeContainer: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
  },
  mainContainerLogged: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
  },
  checkboxContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: AppSizes.screen.width * 0.6,
      marginHorizontal: 16,
  },
  termsText: {
      color: AppColors.textBlackish,
      fontWeight: '400',
      fontSize: 15,
      marginLeft: 10,
  },
  modalView: {
      margin: 0,
      justifyContent: 'flex-end',
  },
  modalContainerStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
  },
  modalContent: {
      width: '100%',
      height: '50%',
      backgroundColor: 'white',
      overflow: 'hidden',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'white',
      padding: 20,
      justifyContent: 'space-between',
  },
  errorText: {
      color: 'red',
      marginBottom: 8,
  }
  })
}

export default dynamicStyles
