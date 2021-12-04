/** @format */

import { AppRegistry, Platform, NativeModules } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';

const { LaunchManager } = NativeModules;

const options = {
  ios: {
    appName: 'Instachatty',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'io.instamobile.avchat',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};
console.log('configure RNCallKeep in index.js');

RNCallKeep.setup(options);
RNCallKeep.setAvailable(true);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Remote message received: ' + JSON.stringify(remoteMessage));
  const {
    data: { callType },
  } = remoteMessage;
  if (callType === 'video' || callType === 'audio') {
    presentIncomingCall(remoteMessage);
  }
});

presentIncomingCall = async (remoteMessage) => {
  if (Platform.OS !== 'android') {
    return;
  }

  try {
    RNCallKeep.addEventListener('answerCall', (body) =>
      onAnswerCallAction(body, remoteMessage.data),
    );

    const { callID, callerName } = remoteMessage.data;
    console.log(callerName, 'did try to display');
    RNCallKeep.displayIncomingCall(callID, callerName, callerName);
  } catch (error) {
    console.log(error);
  }
};

onAnswerCallAction = async (body, data) => {
  // await RNCallKeep.removeEventListener("endCall");
  console.log('onAnswerCallAction ' + body.callUUID);
  // RNCallKeep.rejectCall(body.callUUID);

  console.log('opening app on android upon accepting native incoming call');
  LaunchManager.openAppWithData(body.callUUID);
  // LaunchManager.openAppWithData(JSON.stringify(data));
};

AppRegistry.registerComponent(appName, () => App);
