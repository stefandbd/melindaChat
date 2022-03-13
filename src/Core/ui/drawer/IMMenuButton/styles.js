import { StyleSheet } from 'react-native'

const dynamicStyles = (appStyles, colorScheme) => {
  const colorSet = appStyles.colorSet[colorScheme]
  const fontSet = appStyles.fontFamily
  return new StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 5,
      marginTop: 0,
      marginBottom: 0,
      backgroundColor: colorSet.whiteSmoke,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colorSet.whiteSmoke,
      padding: 7,
    },
    btnIcon: {
      tintColor: colorSet.mainTextColor,
      height: 30,
      width: 30,
      marginRight: 20,
    },
    btnText: {
      fontFamily: fontSet.main,
      fontWeight: 'bold',
      marginTop: 5,
      color: colorSet.mainTextColor,
    },
    badgeContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      position: 'absolute',
      bottom: 0,
      left: 24,
    },
    badgeText: {
      color: '#fff',
      fontSize: 12,
      fontFamily: fontSet.main,
      fontWeight: 'bold',
    },
  })
}

export default dynamicStyles
