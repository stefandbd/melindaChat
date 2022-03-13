import { StyleSheet } from 'react-native'

const dynamicStyles = (appStyles, colorScheme) => {
  const fontSet = appStyles.fontFamily
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    userImageContainer: {
      borderWidth: 0,
    },
    chatsChannelContainer: {
      // flex: 1,
      padding: 10,
    },
    chatItemContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    chatItemContent: {
      flex: 1,
      alignSelf: 'center',
      marginLeft: 10,
    },
    chatFriendName: {
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontWeight: '500',
    },
    content: {
      flexDirection: 'row',
      marginTop: 5,
    },
    message: {
      flex: 2,
      color: appStyles.colorSet[colorScheme].mainSubtextColor,
      fontWeight: '500',
    },
    unReadmessage: {
      fontWeight: 'bold',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    badgeContainer: {
      width: 20,
      height: 20,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    badgeText: {
      color: '#fff',
      fontSize: 10,
      fontFamily: fontSet.main,
      fontWeight: 'bold',
    },
  })
}

export default dynamicStyles
