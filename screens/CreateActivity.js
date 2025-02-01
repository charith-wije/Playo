import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SlideAnimation, BottomModal, ModalContent} from 'react-native-modals';
import moment from 'moment';
import {AuthContext} from '../AuthContext';
import {HomeContext} from '../HomeContext';
import axios from 'axios';

const CreateActivity = () => {
  const [sport, setSport] = useState('');
  // const [area, setArea] = useState('');
  const [date, setDate] = useState('');
  // const [timeInterval, setTimeInterval] = useState('');
  const [noOfPlayers, setnoOfPlayers] = useState(0);
  const [selected, setSelected] = useState(['Public']);
  const [taggedVenue, setTaggedVenue] = useState(null);

  const {userId} = useContext(AuthContext);
  const {area, setArea, timeInterval, setTimeInterval} =
    useContext(HomeContext);

  const navigation = useNavigation();
  const routs = useRoute();

  useEffect(() => {
    if (routs?.params?.taggedVenue) {
      setTaggedVenue(routs?.params?.taggedVenue);
      setArea(routs?.params?.taggedVenue);
      console.log('Create', routs?.params?.taggedVenue);
    }
  }, [routs?.params?.taggedVenue]);

  useEffect(() => {
    if (routs?.params?.timeInterval) {
      setTimeInterval(routs?.params?.timeInterval);
      console.log(routs?.params?.timeInterval);
    }
  }, [routs?.params?.timeInterval]);

  const [modalVisible, setModalVisible] = useState(false);

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      let displayDate;
      if (i === 0) {
        displayDate = 'Today';
      } else if (i === 1) {
        displayDate = 'Tomorrow';
      } else if (i === 2) {
        displayDate = 'Day After';
      } else {
        displayDate = date.format('Do MMMM');
      }

      dates.push({
        id: i.toString(),
        displayDate,
        dayOfWeek: date.format('ddd'),
        actualDate: date.format('Do MMMM'),
      });
    }
    return dates;
  };

  const createGame = async () => {
    try {
      const admin = userId;
      const time = timeInterval;
      console.log('Values', sport, taggedVenue, date, time, admin, noOfPlayers);
      const gameData = {
        sport,
        area,
        date,
        time,
        admin,
        totalPlayers: noOfPlayers,
      };

      const response = await axios.post(
        `http://${
          Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        }:8000/creategame`,
        gameData,
      );
      if (response.status === 200) {
        Alert.alert('Success!', 'Game created succesfully', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
        setSport('');
        setArea('');
        setDate('');
        setTimeInterval('');
        setnoOfPlayers('');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const dates = generateDates();

  const selectDate = date => {
    setDate(date);
    setModalVisible(false);
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? 35 : 0,
        }}>
        <ScrollView>
          <View style={{marginHorizontal: 10}}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </View>

          <View style={{padding: 10}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Create Activity
            </Text>

            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 15,
              }}>
              <MaterialCommunityIcons name="whistle" size={24} color="gray" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Sport</Text>
                <TextInput
                  value={sport}
                  onChangeText={setSport}
                  style={{marginTop: 7, fontSize: 15}}
                  placeholderTextColor="gray"
                  placeholder="Eg Badminton / Footbal / Cricket"
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <View style={{borderColor: '#e0e0e0', borderWidth: 1, height: 1}} />

            <Pressable
              onPress={() => {
                navigation.navigate('TagVenue');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 15,
              }}>
              <Entypo name="location" size={24} color="gray" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Area</Text>
                <TextInput
                  value={area}
                  onChangeText={setArea}
                  style={{marginTop: 7, fontSize: 15, color: 'black'}}
                  placeholderTextColor="gray"
                  placeholder="Locality or venue name"
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <View style={{borderColor: '#e0e0e0', borderWidth: 1, height: 1}} />

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 15,
              }}>
              <Feather name="calendar" size={24} color="gray" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Date</Text>
                <TextInput
                  editable={false}
                  style={{marginTop: 7, fontSize: 15, color: 'black'}}
                  placeholderTextColor={date ? 'black' : 'gray'}
                  placeholder={date ? date : 'pick a day'}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <View style={{borderColor: '#e0e0e0', borderWidth: 1, height: 1}} />

            <Pressable
              onPress={() => navigation.navigate('Time')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 15,
                marginVertical: 15,
              }}>
              <AntDesign name="clockcircleo" size={24} color="gray" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Time</Text>
                <TextInput
                  style={{marginTop: 7, fontSize: 15}}
                  placeholderTextColor={timeInterval ? 'black' : 'gray'}
                  placeholder={timeInterval ? timeInterval : 'pick Exact Time'}
                />
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </Pressable>

            <View style={{borderColor: '#e0e0e0', borderWidth: 1, height: 1}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                marginTop: 7,
                marginVertical: 10,
              }}>
              <Feather name="activity" size={24} color="gray" />

              <View style={{marginTop: 10}}>
                <Text
                  style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>
                  Activity Access
                </Text>
                <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable
                    onPress={() => setSelected('Public')}
                    style={
                      selected.includes('Public')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }>
                    <Ionicons
                      name="earth"
                      size={24}
                      color={selected.includes('Public') ? 'white' : 'black'}
                    />
                    <Text
                      style={
                        selected.includes('Public')
                          ? {color: 'white', fontWeight: 'bold', fontSize: 15}
                          : {color: 'black', fontWeight: 'bold', fontSize: 15}
                      }>
                      Public
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setSelected('Invite Only')}
                    style={
                      selected.includes('Invite Only')
                        ? {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: '#07bc0c',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                        : {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                            backgroundColor: 'white',
                            width: 140,
                            justifyContent: 'center',
                            borderRadius: 3,
                            padding: 10,
                          }
                    }>
                    <AntDesign
                      name="lock1"
                      size={24}
                      color={
                        selected.includes('Invite Only') ? 'white' : 'black'
                      }
                    />
                    <Text
                      style={
                        selected.includes('Invite Only')
                          ? {color: 'white', fontWeight: 'bold', fontSize: 15}
                          : {color: 'black', fontWeight: 'bold', fontSize: 15}
                      }>
                      Invite Only
                    </Text>
                  </Pressable>
                </Pressable>
              </View>
            </View>
            <View
              style={{
                borderColor: '#e0e0e0',
                borderWidth: 1,
                height: 1,
                marginTop: 7,
              }}
            />

            <Text style={{marginTop: 20, fontSize: 16}}>Total Players</Text>

            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}>
              <View style={{marginVertical: 5}}>
                <View>
                  <TextInput
                    value={noOfPlayers}
                    onChangeText={setnoOfPlayers}
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderColor: '#D0D0D0',
                      borderWidth: 1,
                      borderRadius: 4,
                    }}
                    keyboardType="numeric"
                    placeholder="Total Players (including you)"
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                borderColor: '#e0e0e0',
                borderWidth: 1,
                height: 1,
                marginTop: 7,
              }}
            />

            <Text style={{fontSize: 16, marginTop: 20}}>Add Instructions</Text>
            <View
              style={{
                padding: 10,
                backgroundColor: '#F0F0F0',
                marginTop: 10,
                borderRadius: 6,
              }}>
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Ionicons name="bag-check" size={24} color="red" />
                <Text style={{flex: 1, fontSize: 15, fontWeight: '500'}}>
                  Bring your own equipment
                </Text>
                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <MaterialCommunityIcons
                  name="directions-fork"
                  size={24}
                  color="#FEBE10"
                />
                <Text style={{flex: 1, fontSize: 15, fontWeight: '500'}}>
                  Cost Shared
                </Text>
                <FontAwesome name="check-square" size={24} color="green" />
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <FontAwesome5 name="syringe" size={24} color="green" />
                <Text style={{flex: 1, fontSize: 15, fontWeight: '500'}}>
                  Covid Vaccinated players preferred
                </Text>
                <FontAwesome name="check-square" size={24} color="green" />
              </View>
              <TextInput
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  marginVertical: 8,
                  borderRadius: 6,
                }}
                placeholder="Add Additional Instructions"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 15,
                marginVertical: 10,
              }}>
              <AntDesign name="setting" size={24} color="black" />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  Advanced Settings
                </Text>
              </View>
              <AntDesign name="arrowright" size={24} color="gray" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={createGame}
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 4,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
          }}>
          Create Activity
        </Text>
      </Pressable>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent
          style={{width: '100%', height: 400, backgroundColor: 'white'}}>
          <View>
            <Text>Choose Date/Time to host</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                flexWrap: 'wrap',
                marginVertical: 20,
              }}>
              {dates?.map((item, index) => (
                <Pressable
                  onPress={() => selectDate(item?.actualDate)}
                  key={index}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{item?.displayDate}</Text>
                  <Text style={{color: 'gray', marginTop: 7}}>
                    {item?.dayOfWeek}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({});
