import { StyleSheet } from 'react-native'
import AppStyles from '../../DynamicAppStyles'

const dynamicStyles = colorScheme => {
  return new StyleSheet.create({
    mainContainer: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
    },
    subContainer: {
      backgroundColor: AppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      flex: 1,
      marginHorizontal: 7,
    },
    searchSection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppStyles.colorSet[colorScheme].grey0,
      margin: 8,
      borderRadius: 8,
    },
    searchIcon: {
      padding: 10,
      paddingRight: 0,
      marginRight: 5,
    },
    input: {
      flex: 1,
      padding: 5,
      paddingLeft: 0,
      fontSize: 16,
      backgroundColor: 'transparent',
      color: AppStyles.colorSet[colorScheme].grey9,
    },

    userPhoto: {
      width: 40,
      height: 40,
      marginLeft: 5,
    },
    friends: {
      minHeight: 75,
      padding: 10,
    },
    friendDivider: {
      width: 20,
      height: '100%',
    },
    friendItemContainer: {
      alignItems: 'center',
    },
    friendPhoto: {
      height: 60,
      borderRadius: 30,
      width: 60,
    },
    friendName: {
      marginTop: 10,
      alignSelf: 'center',
      color: AppStyles.colorSet[colorScheme].grey9,
    },
    chats: {
      flex: 1,
      padding: 10,
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    chatItemIcon: {
      height: 55,
      borderRadius: 45,
      width: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatItemContent: {
      marginVertical: 9,
      marginLeft: 10,
      alignItems: 'flex-start',
    },
    chatFriendName: {
      color: AppStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontFamily: AppStyles.fontFamily.system,
    },
    content: {
      flexDirection: 'row',
    },
    message: {
      color: AppStyles.colorSet[colorScheme].grey9,
    },
    time: {
      marginLeft: 5,
      color: AppStyles.colorSet[colorScheme].mainSubtextColor,
    },
    test: {
      color: AppStyles.colorSet[colorScheme].testColor,
    },
    iconColor: {
      color: AppStyles.colorSet[colorScheme].grey9,
    },
    friendsIconStyle: { width: 47, height: 47 },
  })
}

export default dynamicStyles
