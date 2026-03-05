import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CitizenHomeScreen from '../screens/CitizenHomeScreen';
import ReportGarbageScreen from '../screens/ReportGarbageScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="CitizenHome" component={CitizenHomeScreen} />
        <Stack.Screen name="ReportGarbage" component={ReportGarbageScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        
        {/* Placeholder for other screens */}
        {/* <Stack.Screen name="CollectorDashboard" component={CollectorDashboardScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
