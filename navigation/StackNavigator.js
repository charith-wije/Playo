import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import PlayScreen from '../screens/PlayScreen';
import BookScreen from '../screens/BookScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import VenueInfoScreen from '../screens/VenueInfoScreen';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordScreen from '../screens/PasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import NameScreen from '../screens/NameScreen';
import SelectImage from '../screens/SelectImage';
import PreFinalScreen from '../screens/PreFinalScreen';
import {AuthContext} from '../AuthContext';
import CreateActivity from '../screens/CreateActivity';
import TagVenueScreen from '../screens/TagVenueScreen';
import SelectTimeScreen from '../screens/SelectTimeScreen';
import GameSetUpScreen from '../screens/GameSetUpScreen';
import ManageRequestsScreen from '../screens/ManageRequestsScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const {token} = useContext(AuthContext);

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HOME"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: 'green',
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="home-outline" size={24} color="green" />
              ) : (
                <Ionicons name="home-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="PLAY"
          component={PlayScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <AntDesign name="addusergroup" size={24} color="green" />
              ) : (
                <AntDesign name="addusergroup" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="BOOK"
          component={BookScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <SimpleLineIcons name="book-open" size={24} color="green" />
              ) : (
                <SimpleLineIcons name="book-open" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="PROFILE"
          component={ProfileScreen}
          options={{
            tabBarActiveTintColor: 'green',
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-outline" size={24} color="green" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#989898" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Image"
          component={SelectImage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreFinal"
          component={PreFinalScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Venue"
          component={VenueInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create"
          component={CreateActivity}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TagVenue"
          component={TagVenueScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Time" component={SelectTimeScreen} />
        <Stack.Screen
          name="Game"
          component={GameSetUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Manage"
          component={ManageRequestsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      {/* <AuthStack /> */}
      {token === null || token === '' ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
