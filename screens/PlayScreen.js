import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlayScreen = () => {
  const [option, setOption] = useState('My Sports');
  const [sport, setSport] = useState('Badminton');

  return (
    <SafeAreaView>
      <View style={{padding: 12, backgroundColor: '#223536'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>
              Charith Wijenayake
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="chatbox-outline" size={24} color="white" />
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Image
              style={{width: 30, height: 30, borderRadius: 15}}
              source={{
                uri: 'https://images-cricketcom.imgix.net/players/65038_headshot_safari.png?auto=format,compress',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 13,
          }}>
          <Pressable onPress={() => setOption('Calendar')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option === 'Calendar' ? '#12e04c' : 'white',
              }}>
              Calendar
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('My Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option === 'My Sports' ? '#12e04c' : 'white',
              }}>
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption('Other Sports')}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 15,
                color: option === 'Other Sports' ? '#12e04c' : 'white',
              }}>
              Other Sports
            </Text>
          </Pressable>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => setSport('Badminton')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport === 'Badminton' ? 0 : 1,
                backgroundColor:
                  sport === 'Badminton' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Badminton
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSport('Cricket')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport === 'Cricket' ? 0 : 1,
                backgroundColor:
                  sport === 'Cricket' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cricket
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSport('Cycling')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport === 'Cycling' ? 0 : 1,
                backgroundColor:
                  sport === 'Cycling' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Cycling
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSport('Running')}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderColor: 'white',
                marginRight: 10,
                borderRadius: 8,
                borderWidth: sport === 'Running' ? 0 : 1,
                backgroundColor:
                  sport === 'Running' ? '#1dbf22' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
                Running
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'white',
        }}>
        <Pressable>
          <Text>Create Game</Text>
        </Pressable>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Filter</Text>
          </Pressable>

          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Sort</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
