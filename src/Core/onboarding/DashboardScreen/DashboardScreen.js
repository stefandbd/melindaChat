import React from 'react'
import {
  ImageBackground,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import dynamicStyles from './styles'
import { useColorScheme } from 'react-native-appearance'
import { setUserData } from '../redux/auth'
import { AppImages } from '../../../theme'
import ActionButton from '../../../components/ActionButton';

const DashboardScreen = props => {
  const currentUser = useSelector(state => state.auth.user)
  const nickName = currentUser.nickName;
  const appStyles = props.route.params.appStyles
  const colorScheme = useColorScheme()
  const styles = dynamicStyles(appStyles, colorScheme)
  const onChatPress = () => {
              props.navigation.reset({
              index: 0,
              routes: [{ name: 'MainStack', params: { user: props.route.params.user } }],
            })
  }

  return (
    <ImageBackground
    style={styles.imgBg}
    resizeMode='cover'
    source={AppImages.bgImage}>
    <View style={styles.container}>
   <Text style={styles.greetingText}>Salutari {nickName}!</Text>
   <ActionButton
                        buttonColor="transparent"
                        icon={<Text style={styles.chatButtonText}>CHAT</Text>}
                        style={styles.chatButton}
                        itemSize={80}
                        buttonColor={'transparent'}
                        btnOutRange={'transparent'}
                    >
                        <ActionButton.Item buttonColor='#ff0266' title="Terapie" onPress={() => onChatPress('terapie')}>
                            <Text style={styles.actinoButtonItemText}>Terapie</Text>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1D232F' title="Parenting" onPress={() => onChatPress('parenting')}>
                            <Text style={styles.actinoButtonItemText}>Parenting</Text>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="Business" onPress={() => onChatPress('business')}>
                            <Text style={styles.actinoButtonItemText}>Business</Text>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#0FF' title="Etcetc" onPress={() => onChatPress('Etcetc')}>
                            <Text style={styles.actinoButtonItemText}>Etcetc</Text>
                        </ActionButton.Item>
                    </ActionButton>
      </View>
      </ImageBackground>
  )
}

export default connect(null, {
  setUserData,
})(DashboardScreen);

