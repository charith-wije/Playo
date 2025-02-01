import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SlideAnimation, BottomModal, ModalContent} from 'react-native-modals';
import axios from 'axios';
import {AuthContext} from '../AuthContext';

const GameSetUpScreen = () => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const {userId} = useContext(AuthContext);
  const navigation = useNavigation();

  const userRequested = route?.params?.item?.requests?.some(
    request => request.userId === userId,
  );

  const sendJoinRequest = async gameId => {
    console.log(gameId);
    try {
      const response = await axios.post(
        `http://${
          Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
        }:8000/games/${gameId}/request`,
        {userId, comment},
      );
      if (response.status === 200) {
        Alert.alert('Request Sent', 'please wait for the host to accept', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setModalVisible(false)},
        ]);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              padding: 10,
              backgroundColor: '#294461',
              paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Ionicons name="arrow-back" size={24} color="white" />
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Entypo name="share" size={24} color="white" />
                <Entypo name="dots-three-vertical" size={24} color="white" />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                gap: 14,
              }}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                {route?.params?.item?.sport}
              </Text>
              <View
                style={{
                  padding: 7,
                  backgroundColor: 'white',
                  borderRadius: 7,
                  alignSelf: 'flex-start',
                }}>
                <Text>Regular</Text>
              </View>

              <View
                style={{
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                }}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                  Match Full
                </Text>
                <FontAwesome name="toggle-off" size={24} color="white" />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 15, color: 'white', fontWeight: '500'}}>
                {route?.params?.item?.time} • {route?.params?.item?.date}{' '}
              </Text>
            </View>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                width: '90%',
                backgroundColor: '#28c752',
                marginTop: 10,
                justifyContent: 'center',
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 7,
              }}>
              <Entypo name="location" size={24} color="white" />
              <Text style={{color: 'white'}}>{route?.params?.item?.area}</Text>
            </Pressable>
          </View>

          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row',
              gap: 10,
            }}>
            <MaterialCommunityIcons
              name="directions-fork"
              size={24}
              color="#adcf17"
            />
            <View style={{}}>
              <Text style={{fontSize: 15}}>Add Expense</Text>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: '80%', color: 'gray'}}>
                  Start Adding your expenses to split cost among players
                </Text>

                <Entypo name="chevron-small-right" size={24} color="gray" />
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 15}}>
            <Image
              style={{
                width: '100%',
                height: 200,
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{
                uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 17,
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text>Players {route?.params?.item?.players?.length}</Text>
              <Ionicons name="earth" size={24} color="gray" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                ❤️ You are not covered 😊
              </Text>
              <Text style={{fontWeight: '500'}}>Learn More</Text>
            </View>

            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <View>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30}}
                  source={{uri: route?.params?.item?.adminUrl}}
                />
              </View>
              <View style={{}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Text>{route?.params?.item?.adminName}</Text>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor: '#E0E0E0',
                      borderRadius: 6,
                    }}>
                    <Text style={{fontSize: 13}}>HOST</Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: 'orange',
                    borderWidth: 1,
                    alignSelf: 'flex-start',
                  }}>
                  <Text>INTERMEDIATE</Text>
                </View>
              </View>
            </View>
            {route?.params?.item?.isUserAdmin ? (
              <View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: '#E0E0E0',
                  }}
                />

                <Pressable
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                  }}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: '#e0e0e0',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30, resizeMode: 'contain'}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/343/343303.png',
                      }}
                    />
                  </View>

                  <Text style={{fontSize: 15, fontWeight: '500', flex: 1}}>
                    Add Co-host
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                  />
                </Pressable>

                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: '#E0E0E0',
                    marginVertical: 12,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable>
                    <Pressable
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#e0e0e0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30, resizeMode: 'contain'}}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/1474/1474545.png',
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: '500',
                        marginTop: 8,
                        textAlign: 'center',
                      }}>
                      Add
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Manage', {
                          userId,
                          gameId: route?.params?.item?._id,
                        })
                      }
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#e0e0e0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 30, height: 30, resizeMode: 'contain'}}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/128/7928/7928637.png',
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: '500',
                        marginTop: 8,
                        textAlign: 'center',
                      }}>
                      Manage (2)
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Pressable
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#e0e0e0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color="black"
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: '500',
                        marginTop: 8,
                        textAlign: 'center',
                      }}>
                      All Players
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: '#E0E0E0',
                    marginVertical: 12,
                  }}
                />

                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: '#e0e0e0',
                      borderRadius: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30, resizeMode: 'contain'}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1511/1511847.png',
                      }}
                    />
                  </View>
                  <View>
                    <Text>Not on Playo? Invite</Text>
                    <Text style={{marginTop: 6, color: 'gray', width: '80%'}}>
                      Earn 100 Karma points by referring your friend
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#E0E0E0',
                  borderBottomWidth: 1,
                  marginBottom: 20,
                  borderTopColor: '#E0E0E0',
                  borderTopWidth: 1,
                }}>
                <Pressable
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12,
                  }}>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                  />
                </Pressable>
                <Text
                  style={{marginBottom: 12, fontWeight: '600', marginTop: 10}}>
                  All Players
                </Text>
              </Pressable>
            )}
          </View>
          <View
            style={{
              marginHorizontal: 15,
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 6,
            }}>
            <View>
              <Text style={{fontSize: 18, fontWeight: '600'}}>Queries (0)</Text>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
                  There are no queries yet! Queries sent by players will be
                  shown here
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {route?.params?.item?.isUserAdmin === true ? (
          <Pressable
            style={{
              backgroundColor: '#07BC0C',
              marginBottom: 10,
              marginTop: 'auto',
              padding: 15,
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
              GAME CHAT
            </Text>
          </Pressable>
        ) : userRequested ? (
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              backgroundColor: '#07BC0C',
              marginTop: 'auto',
              marginBottom: 10,
              padding: 15,
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
              CANCEL REQUEST
            </Text>
          </Pressable>
        ) : (
          <View
            style={{
              marginTop: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: '#E8E8E8',
            }}>
            <Pressable
              style={{
                backgroundColor: 'white',
                marginTop: 'auto',
                marginBottom: 30,
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 4,
                flex: 1,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                SEND QUERY
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                backgroundColor: '#07bc0c',
                marginTop: 'auto',
                marginBottom: 30,
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 4,
                flex: 1,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                JOIN GAME
              </Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>

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
          style={{
            width: '100%',
            height: 400,
            backgroundColor: 'white',
          }}>
          <View>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'gray'}}>
              Join Game
            </Text>
            <Text style={{marginTop: 20, color: 'gray'}}>
              {route?.params?.item?.adminName} has been putting efforts to
              organize this game. Please send the request if your quite sure to
              join
            </Text>
            <View
              style={{
                borderColor: '#E0E0E0',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 200,
                marginTop: 20,
              }}>
              <TextInput
                style={{fontSize: comment ? 16 : 16, fontFamily: 'Helvertical'}}
                value={comment}
                onChangeText={setComment}
                placeholder="Send a Message to host along with your request"
              />
            </View>
            <Pressable
              onPress={() => sendJoinRequest(route?.params?.item?._id)}
              style={{
                marginTop: 'auto',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'green',
                borderRadius: 5,
                justifyContent: 'center',
                padding: 10,
                marginTop: 12,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                Send Request
              </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default GameSetUpScreen;

const styles = StyleSheet.create({});
