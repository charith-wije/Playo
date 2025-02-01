import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../AuthContext';
import {getRegistrationProgress} from '../registrationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const PreFinalScreen = () => {
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  useEffect(() => {
    getAllScreenData();
  }, []);

  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      let userData = {};

      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];

      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen dsts cleared!');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios
        .post(
          `http://${
            Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
          }:8000/register`,
          userData,
        )
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          console.log('token', token);
          setToken(token);
        });

      clearAllScreenData();
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log('token', token);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={{backgroundColor: '#03C03C', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});
