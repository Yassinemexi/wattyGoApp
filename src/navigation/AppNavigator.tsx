import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkProvider } from '../context/NetworkProvider';
import LoadingManager from '../screens/Loading/LoadingManager';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import StartScreen1 from '../screens/StartScreen/StartScreen1';
import StartScreen2 from '../screens/StartScreen/StartScreen2';
import StartScreen3 from '../screens/StartScreen/StartScreen3';
import StartScreen4 from '../screens/StartScreen/StartScreen4';
import RegisterScreen from '../screens/Register/RegisterScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen'; 
import ForgetPasswordScreen1 from '../screens/ForgetPasswordScreen/ForgetPasswordScreen1';
import ForgetPasswordScreen2 from '../screens/ForgetPasswordScreen/ForgetPasswordScreen2';
import ForgetPasswordScreen3 from '../screens/ForgetPasswordScreen/ForgetPasswordScreen3';
import KeyScreen from '../screens/KeyScreen/KeyScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import RouteScreen from '../screens/RouteScreen/RouteScreen';
import RouteMapScreen from '../screens/RouteMapScreen/RouteMapScreen';
import SearchStationScreen from '../screens/SearchStationScreen/SearchStationScreen';
import StationDetailsScreen from '../screens/StationDetailsScreen/StationDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import MyAccountScreen from '../screens/AccountScreen/AccountScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen/EditPasswordScreen';
import HelpScreen from '../screens/HelpScreen/HelpScreen';
import SendFeedbackScreen from '../screens/SendFeedbackScreen/SendFeedbackScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NetworkProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading">
          {({ navigation }) => <LoadingManager onReady={() => navigation.replace('Home')} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={StartScreen1} />
        <Stack.Screen name="StartScreen2" component={StartScreen2} />
        <Stack.Screen name="StartScreen3" component={StartScreen3} />
        <Stack.Screen name="StartScreen4" component={StartScreen4} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen1} />
        <Stack.Screen name="ForgetPasswordScreen2" component={ForgetPasswordScreen2} />
        <Stack.Screen name="ForgetPasswordScreen3" component={ForgetPasswordScreen3} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="KeyScreen" component={KeyScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="RouteScreen" component={RouteScreen} />
        <Stack.Screen name="RouteMapScreen" component={RouteMapScreen} />
        <Stack.Screen name="SearchStationScreen" component={SearchStationScreen} />
        <Stack.Screen name="StationDetailsScreen" component={StationDetailsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
        <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen}/>
        <Stack.Screen name="SendFeedbackScreen" component={SendFeedbackScreen} />

        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NetworkProvider>
  );
};

export default AppNavigator;