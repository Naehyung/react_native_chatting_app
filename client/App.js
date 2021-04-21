import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login, Registration, Home, Loading, Room } from './screens'

const Stack = createStackNavigator();
import Tabs from './navigation/Tabs'

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Loading"}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Room" component={Room} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;