/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './AppNavigation'; 
import store from './redux/store';

function App() {
  

  return (
     <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}


export default App;
