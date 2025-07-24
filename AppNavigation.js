import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/splashscreen';
import Login from './screens/Login';
import OtpVerification from './screens/OtpVerification';
import Home from './screens/Home';
import Signup from './screens/Signup';
import FoodItems from './screens/FoodItems';
import RestaurantDetails from './screens/RestaurantDetails';
import Cart from './screens/Cart';
import AddressScreen from './screens/AddressScreen'; // Import AddressScreen if needed


const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="FoodItems" component={FoodItems} options={{ headerShown: false }}/>
<Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{ headerShown: false }} />

      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ headerShown: true }}/>


      <Stack.Screen name="OtpVerification" component={OtpVerification} />
       
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
