import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import DynamicAppStyles from '../DynamicAppStyles'
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'
import { IMChatScreen } from '../Core/chat'
import { IMFriendsScreen, IMCreateGroupScreen } from '../Core'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMBlockedUsersScreen,
} from '../Core/profile'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen'
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen'
import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen'
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen'
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen'
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen'
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen'
import { ResetPasswordScreen } from '../Core/onboarding'
import { IMUserSearchModal } from '../Core/socialgraph/friendships'
import ChatConfig from '../config'
import { NavigationContainer } from '@react-navigation/native'
import { IMLocalized } from '../Core/localization/IMLocalization'
import { authManager } from '../Core/onboarding/utils/api/'
const AuthStack = createStackNavigator()
const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
const RootStack = createStackNavigator()
const HomeSearchStackNavigator = createStackNavigator()
const FriendsSearchStackNavigator = createStackNavigator()

const LoginStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
          authManager: authManager,
        }}
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPasswordScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
          authManager: authManager,
        }}
      />
    </AuthStack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      headerMode="float"
      screenOptions={{ headerTitleAlign: 'center' }}>
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name="Home"
        component={HomeScreen}
      />
      <AppStack.Screen name="CreateGroup" component={IMCreateGroupScreen} />
      <AppStack.Screen name="PersonalChat" component={IMChatScreen} />
    </AppStack.Navigator>
  )
}

const HomeSearchStack = () => {
  return (
    <HomeSearchStackNavigator.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <HomeSearchStackNavigator.Screen
        name="Main"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <HomeSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </HomeSearchStackNavigator.Navigator>
  )
}

const FriendsStack = () => {
  return (
    <AppStack.Navigator initialRouteName="Friends" headerMode="float">
      <AppStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          showDrawerMenuButton: true,
        }}
        name="Friends"
        component={IMFriendsScreen}
      />
    </AppStack.Navigator>
  )
}

const FriendsSearchStack = () => {
  return (
    <FriendsSearchStackNavigator.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <FriendsSearchStackNavigator.Screen
        name="Main"
        component={FriendsStack}
        options={{ headerShown: false }}
      />
      <FriendsSearchStackNavigator.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </FriendsSearchStackNavigator.Navigator>
  )
}

const MyProfileStack = () => {
  return (
    <AuthStack.Navigator>
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
        }}
        name="MyProfile"
        component={MyProfileScreen}
      />
      <AuthStack.Screen name="AccountDetails" component={IMEditProfileScreen} />
      <AuthStack.Screen name="Settings" component={IMUserSettingsScreen} />
      <AuthStack.Screen name="ContactUs" component={IMContactUsScreen} />
      <AuthStack.Screen name="BlockedUsers" component={IMBlockedUsersScreen} />
    </AuthStack.Navigator>
  )
}

// drawer stack
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 270 }}
      drawerContent={({ navigation, state }) => {
        return (
          <IMDrawerMenu
            navigation={navigation}
            menuItems={ChatConfig.drawerMenu.upperMenu}
            menuItemsSettings={ChatConfig.drawerMenu.lowerMenu}
            appStyles={DynamicAppStyles}
            authManager={authManager}
            appConfig={ChatConfig}
          />
        )
      }}
      initialRouteName="HomeSearchStack">
      <Drawer.Screen name="HomeSearchStack" component={HomeSearchStack} />
      <Drawer.Screen name="FriendsSearchStack" component={FriendsSearchStack} />
      <Drawer.Screen name="MyProfileStack" component={MyProfileStack} />
    </Drawer.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="float">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
        }}
        name={IMLocalized('Home')}
        options={{ headerShown: false }}
        component={DrawerStack}
      />
    </Stack.Navigator>
  )
}

// Manifest of possible screens
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ animationEnabled: false, headerBackTitleVisible: false }}
      initialRouteName="LoadScreen">
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: ChatConfig,
        }}
        name="LoadScreen"
        options={{ headerShown: false }}
        component={LoadScreen}
      />
      <RootStack.Screen
        name="Walkthrough"
        options={{ headerShown: false }}
        component={WalkthroughScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      <RootStack.Screen
        name="MainStack"
        options={{ headerShown: false }}
        component={MainStackNavigator}
      />
      <RootStack.Screen name="PersonalChat" component={IMChatScreen} />
    </RootStack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }
