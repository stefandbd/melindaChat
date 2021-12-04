import { StyleSheet } from 'react-native'

const styles = (appStyles, colorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].whiteSmoke,
    },
    deleteButton: {
      marginVertical: 12,
      marginBottom: 50,
      color: 'red',
      fontWeight: 'bold',
    },
  })

export default styles
