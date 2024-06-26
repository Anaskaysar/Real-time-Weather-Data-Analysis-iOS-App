import * as React from 'react';
import {LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';


const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs([
    'Non serializable values found in navigation'
])
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;