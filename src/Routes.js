import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserCard from './UserCard';
import UserDetails from './UserDetails';


const Stack = createNativeStackNavigator();
const Routes = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User's">
        <Stack.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#9B59B6',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
        <Stack.Screen
          name="User's"
          component={UserCard}
          options={{
            title: 'User Details',
            headerStyle: {
              backgroundColor: '#9B59B6',
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
