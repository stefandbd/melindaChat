import { StyleSheet, Dimensions } from 'react-native'
import { AppColors, AppSizes } from '../../../theme';
import { Fonts } from '../../../../assets/fonts';
const { height, width } = Dimensions.get('window');

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    imgBg: {
      flex: 1,
      width: width,
      height: height,
  },
  greetingText: {
    fontSize: 32,
    color: AppColors.textWhite,
  },
  chatButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppColors.textWhite,
    fontFamily: Fonts.MontserratLight,
},
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
},
actinoButtonItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textWhite,
    fontFamily: Fonts.MontserratLight,
}
  })
}

export default dynamicStyles
