import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const ManageRequestsScreen = () => {
  const [option, setOption] = useState('Requests');
  const route = useRoute();
  const userId = route?.params?.userId;
  const gameId = route?.params.gameId;
  const [requests, setRequests] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `http://${
          Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        }:8000/game/${gameId}/players`,
      );
      setPlayers(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const fetchRequests = async () => {
    console.log('gameId', gameId);
    console.log('userId', userId);
    try {
      const response = await axios.get(
        `http://${
          Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        }:8000/games/${gameId}/requests`,
      );
      setRequests(response.data);
      console.log('Requests', response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  console.log('Players', players);

  const acceptRequest = async userId => {
    try {
      const user = {
        gameId,
        userId,
      };

      console.log(user);

      const response = await axios.post(
        `http://${
          Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        }:8000/accept`,
        user,
      );

      console.log(response);

      if (response.status === 200) {
        Alert.alert('Success', 'Request Accepted');

        await fetchRequests();

        await fetchPlayers();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={{padding: 12, backgroundColor: '#223536'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <AntDesign name="plussquareo" size={24} color="white" />
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>
            Manage
          </Text>
          <Text style={{fontSize: 17, color: 'white'}}>Match Full</Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 15,
          }}>
          <Pressable onPress={() => setOption('Requests')}>
            <Text
              style={{
                color: option === 'Requests' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Requests ({requests?.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Invited')}>
            <Text
              style={{
                color: option === 'Invited' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Invited (0)
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Playing')}>
            <Text
              style={{
                color: option === 'Playing' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Playing ({players?.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Retired')}>
            <Text
              style={{
                color: option === 'Retired' ? '#1dd132' : 'white',
                fontWeight: '500',
              }}>
              Retired (0)
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{marginTop: 10, marginHorizontal: 15}}>
        <View>
          {option === 'Requests' && (
            <View>
              {requests?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginVertical: 10,
                    borderRadius: 6,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 13,
                    }}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 25}}
                      source={{uri: item?.image}}
                    />

                    <View style={{flex: 1}}>
                      <Text>
                        {item?.firstName} {item?.lastName}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                          marginTop: 10,
                          borderRadius: 20,
                          borderColor: 'orange',
                          borderWidth: 1,
                          alignSelf: 'flex-start',
                        }}>
                        <Text style={{fontSize: 13}}>INTERMEDIATE</Text>
                      </View>
                    </View>

                    <View>
                      <Image
                        style={{width: 110, height: 60, resizeMode: 'contain'}}
                        source={{
                          uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
                        }}
                      />
                    </View>
                  </View>

                  <Text style={{marginTop: 7}}>{item?.comment}</Text>

                  <View
                    style={{
                      height: 1,
                      borderColor: '#E0E0E0',
                      borderWidth: 0.7,
                      marginVertical: 15,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 5,
                          alignSelf: 'flex-start',
                          backgroundColor: '#E0E0E0',
                        }}>
                        <Text style={{color: 'gray'}}>0 NO SHOWS</Text>
                      </View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        See reputation
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                      }}>
                      <Pressable
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          borderColor: '#E0E0E0',
                          borderWidth: 1,
                          width: 100,
                        }}>
                        <Text style={{textAlign: 'center'}}>RETIER</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => acceptRequest(item?.userId)}
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          backgroundColor: '#26bd37',
                          width: 100,
                        }}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          ACCEPT
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <View style={{marginTop: 10, marginHorizontal: 15}}>
        <View>
          {option === 'Playing' && (
            <View>
              {players?.map((item, index) => (
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View>
                    <Image
                      style={{width: 60, height: 60, borderRadius: 30}}
                      source={{uri: item?.image}}
                    />
                  </View>

                  <View>
                    <Text>
                      {item?.firstName} {item?.lastName}
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        marginTop: 10,
                        borderRadius: 20,
                        borderColor: 'orange',
                        borderWidth: 1,
                        alignSelf: 'flex-start',
                      }}>
                      <Text style={{fontSize: 13}}>INTERMEDIATE</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageRequestsScreen;

const styles = StyleSheet.create({});
