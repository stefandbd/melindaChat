/* https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
// import * as RNLocalize from "expo-localization";
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { setI18nConfig } from './src/Core/localization/IMLocalization';
import { AppNavigator } from './src/navigations/AppNavigation';
import { IMAVAppCallWrapper } from './src/Core/avchat';
import reduxStore from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ConfigData } from './src/config/config';

const MainNavigator = IMAVAppCallWrapper(AppNavigator);

const useForceUpdate = () => useState()[1];

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    setI18nConfig('ro');
    // RNLocalize.addEventListener("change", handleLocalizationChange);
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => {
      // RNLocalize.removeEventListener("change", handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
    useForceUpdate();
  };

  return (
    <Provider store={reduxStore}>
      <StripeProvider
        publishableKey={`${ConfigData.publishKeyTest}`}
        merchantIdentifier="merchant.melinda"
      >
        <AppearanceProvider>
          <StatusBar />
          <MainNavigator screenProps={{ theme: colorScheme }} />
        </AppearanceProvider>
      </StripeProvider>
    </Provider>
  );
};

// AppRegistry.registerComponent("App", () => App);

export default App;
