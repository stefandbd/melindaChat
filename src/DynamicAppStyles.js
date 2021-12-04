import { Platform, Dimensions, I18nManager } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import invert from 'invert-color'
import TNColor from './Core/truly-native/TNColor'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainTextColor: '#000000',
  mainSubtextColor: '#7e7e7e',
  mainThemeForegroundColor: '#4395f8',
  hairlineColor: '#e0e0e0',
  grey0: '#eaeaea',
  grey3: '#f5f5f5',
  grey6: '#d6d6d6',
  grey9: '#939393',
  whiteSmoke: '#f5f5f5',
  grey: 'grey',
  inputBgColor: '#E8E8E8',
}

const darkColorSet = {
  mainThemeBackgroundColor: TNColor('#ffffff'),
  mainTextColor: TNColor('#000000'),
  mainSubtextColor: TNColor('#7e7e7e'),
  mainThemeForegroundColor: '#4395f8',
  hairlineColor: TNColor('#e0e0e0'),
  grey0: TNColor('#eaeaea'),
  grey3: TNColor('#f5f5f5'),
  grey6: TNColor('#d6d6d6'),
  grey9: TNColor('#939393'),
  whiteSmoke: TNColor('#e0e0e0'),
  grey: 'grey',
  inputBgColor: TNColor('#E8E8E8'),
}

const colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
}

const navLight = {
  backgroundColor: '#fff',
  fontColor: '#000',
  headerStyleColor: '#E8E8E8',
  iconBackground: '#F4F4F4',
}

const navDark = {
  backgroundColor: invert('#fff'),
  fontColor: invert('#000'),
  headerStyleColor: invert('E8E8E8'),
  iconBackground: invert('#e6e6f2'),
}

const navThemeConstants = {
  light: navLight,
  dark: navDark,
  'no-preference': navLight,
}

const fontFamily = {
  system: Platform.OS === 'ios' ? 'SFProDisplay-Semibold' : '0',
  boldFont: 'Oswald-Bold',
  semiBoldFont: 'Oswald-SemiBold',
  regularFont: 'Oswald-Regular',
  mediumFont: 'Oswald-Medium',
  lightFont: 'Oswald-Light',
  extraLightFont: 'Oswald-ExtraLight',
}

const iconSet = {
  logo: require('../assets/icons/photo-camera.png'),
  menuHamburger: require('./CoreAssets/hamburger-menu-icon.png'),
  playButton: require('./CoreAssets/play-button.png'),
  home: require('../assets/icons/home-icon.png'),
  home_android: require('../assets/icons/home-icon-24.png'),
  add_user: require('../assets/icons/add-user-icon.png'),
  add_user_filled: require('../assets/icons/add-user-icon-filled.png'),
  camera_filled: require('../assets/icons/camera-filled-icon.png'),
  camera: require('../assets/icons/camera-icon.png'),
  chat: require('../assets/icons/chat-icon.png'),
  close: require('../assets/icons/close-x-icon.png'),
  checked: require('../assets/icons/checked-icon.png'),
  delete: require('../assets/icons/delete.png'),
  friends: require('../assets/icons/friends-icon.png'),
  inscription: require('../assets/icons/inscription-icon.png'),
  menu: require('../assets/icons/menu.png'),
  private_chat: require('../assets/icons/private-chat-icon.png'),
  search: require('../assets/icons/search-icon.png'),
  profile: require('../assets/icons/profile.png'),
  users: require('../assets/icons/users.png'),
  users_android: require('../assets/icons/users-icon-48.png'),
  user: require('../assets/icons/user.png'),
  user_android: require('../assets/icons/account-detail.png'),
  share: require('../assets/icons/share-icon.png'),
  mail: require('../assets/icons/mail.png'),
  lock: require('../assets/icons/lock.png'),
  edit: require('../assets/icons/edit.png'),
  // defaultUser: require('../assets/icons/default_user.jpg'),
  accountDetail: require('../assets/icons/account-detail.png'),
  settings: require('../assets/icons/settings.png'),
  contactUs: require('../assets/icons/contact-us.png'),
  logout: require('../assets/icons/shutdown.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  addCamera: require('../assets/icons/add-camera.png'),
  backArrow: require('../assets/icons/backArrow.png'),
}

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
}

const loadingModal = {
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
}

const sizeSet = {
  buttonWidth: '65%',
  inputWidth: '80%',
  radius: 25,
}

const styleSet = {
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
    },
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: '#fff',
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
}

const appleButtonStyle = {
  dark: AppleButton?.Style?.WHITE,
  light: AppleButton?.Style?.BLACK,
  'no-preference': AppleButton?.Style?.WHITE,
}

const StyleDict = {
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  iconSet,
  styleSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  appleButtonStyle,
}

export default StyleDict
