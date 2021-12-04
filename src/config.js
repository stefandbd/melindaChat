import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization'
import DynamicAppStyles from './DynamicAppStyles'

setI18nConfig()

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

const ChatConfig = {
  isSMSAuthEnabled: true,
  appIdentifier: 'rn-messenger-android',
  facebookIdentifier: '285315185217069',
  webClientId:
    '525472070731-mg8m3q8v9vp1port7nkbq9le65hp917t.apps.googleusercontent.com',
  onboardingConfig: {
    welcomeTitle: IMLocalized('Instachatty'),
    welcomeCaption: IMLocalized(
      'Send texts, photos, videos, and audio messages to your close friends.',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/icons/private-chat-icon.png'),
        title: IMLocalized('Private Messages'),
        description: IMLocalized(
          'Communicate with your friends via private messages.',
        ),
      },
      {
        icon: require('../assets/icons/group-chat-bubbles-icon.png'),
        title: IMLocalized('Group Chats'),
        description: IMLocalized(
          'Create group chats and stay in touch with your gang.',
        ),
      },
      {
        icon: require('../assets/icons/camera-walkthrough-icon.png'),
        title: IMLocalized('Send Photos & Videos'),
        description: IMLocalized(
          'Have fun with your friends by sending photos and videos to each other.',
        ),
      },
      {
        icon: require('../assets/icons/notification.png'),
        title: IMLocalized('Get Notified'),
        description: IMLocalized(
          'Receive notifications when your friends are looking for you.',
        ),
      },
    ],
  },
  drawerMenu: {
    upperMenu: [
      {
        title: IMLocalized('Home'),
        icon:
          Platform.OS === 'ios'
            ? DynamicAppStyles.iconSet.home
            : DynamicAppStyles.iconSet.home_android,
        navigationPath: 'HomeSearchStack',
      },
      {
        title: IMLocalized('Friends'),
        icon:
          Platform.OS === 'ios'
            ? DynamicAppStyles.iconSet.users
            : DynamicAppStyles.iconSet.users_android,
        navigationPath: 'FriendsSearchStack',
      },
      {
        title: IMLocalized('Profile'),
        icon:
          Platform.OS === 'ios'
            ? DynamicAppStyles.iconSet.user
            : DynamicAppStyles.iconSet.user_android,
        navigationPath: 'MyProfileStack',
      },
    ],
    lowerMenu: [],
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  isUsernameFieldEnabled: false,
  smsSignupFields: [
    {
      displayName: IMLocalized('First Name'),
      type: 'ascii-capable',
      editable: true,
      regex: regexForNames,
      key: 'firstName',
      placeholder: 'First Name',
    },
    {
      displayName: IMLocalized('Last Name'),
      type: 'ascii-capable',
      editable: true,
      regex: regexForNames,
      key: 'lastName',
      placeholder: 'Last Name',
    },
  ],
  signupFields: [
    {
      displayName: IMLocalized('First Name'),
      type: 'ascii-capable',
      editable: true,
      regex: regexForNames,
      key: 'firstName',
      placeholder: 'First Name',
    },
    {
      displayName: IMLocalized('Last Name'),
      type: 'ascii-capable',
      editable: true,
      regex: regexForNames,
      key: 'lastName',
      placeholder: 'Last Name',
    },
    {
      displayName: IMLocalized('E-mail Address'),
      type: 'email-address',
      editable: true,
      regex: regexForNames,
      key: 'email',
      placeholder: 'E-mail Address',
      autoCapitalize: 'none',
    },
    {
      displayName: IMLocalized('Password'),
      type: 'default',
      secureTextEntry: true,
      editable: true,
      regex: regexForNames,
      key: 'password',
      placeholder: 'Password',
      autoCapitalize: 'none',
    },
  ],
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: true,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('GENERAL'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            ...(Platform.OS === 'ios'
              ? {
                  displayName: IMLocalized('Enable Face ID / Touch ID'),
                  type: 'switch',
                  editable: true,
                  key: 'face_id_enabled',
                  value: false,
                }
              : {}),
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'push_notifications_enabled',
            value: '142 Steiner Street, San Francisco, CA, 94115',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'florian@instamobile.io',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your e-mail address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504850000',
}

export default ChatConfig
