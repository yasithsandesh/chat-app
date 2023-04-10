import React, { useState } from 'react';
import {LogIn} from './LogIn';
import {SignUp} from './SignUp';
import {Home} from './Home';
import {Chat} from './Chat';
import {Settings} from './Setting';
import {NewChat} from './NewChat';
import {Profile} from './Profile';
import {ResetPassword} from './resetPassword';
import {RemoveBtn} from './removeButton';
import { ResetPasswordSuccess } from './resetPasswordSuccess';
import { Main } from './main';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Alert, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

function App() {
  const dark = useColorScheme() == 'dark';
  const ui = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name='main' component={Main}/>
        <Stack.Screen name="Log In" component={LogIn}  options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Home" component={Home} 
        options={{
          headerShown:false
        }}/>
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title:'',
            headerStyle: {
              backgroundColor: dark?Colors.darker:Colors.white,
            },
           
            headerTintColor:dark?Colors.white:Colors.darker,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} 
          options={{ 
            headerStyle: {
              backgroundColor: dark?Colors.darker:Colors.white,
            },
           
            headerTintColor:dark?Colors.white:Colors.darker,
            }}
        />
        <Stack.Screen name="New Chat" component={NewChat} 
        options={{ 
          headerStyle: {
            backgroundColor: dark?Colors.darker:Colors.white,
          },
         
          headerTintColor:dark?Colors.white:Colors.darker,
          }}
        />
        <Stack.Screen name="Profile" component={Profile}
         options={{ 
          headerStyle: {
            backgroundColor: dark?Colors.darker:Colors.white,
          },
         
          headerTintColor:dark?Colors.white:Colors.darker,
          }}
        />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name='Success' component={ResetPasswordSuccess}
        options={{
          headerShown:false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;

  
}

export default App;
