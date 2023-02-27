import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="Dashboard" 
            component={Dashboard}  
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App