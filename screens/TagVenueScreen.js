import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeContext} from '../HomeContext';

const TagVenueScreen = () => {
  const [venues, setVenues] = useState([]);
  const [taggedVenue, setTaggedVenue] = useState(null);
  const {setArea} = useContext(HomeContext);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('useeffect called!');
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `http://${
            Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'
          }:8000/venues`,
        );
        setVenues(response.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchVenues();
  }, []);

  useEffect(() => {
    if (taggedVenue) {
      console.log(taggedVenue);
      setArea(taggedVenue);
      navigation.goBack({taggedVenue});
    }
  }, [taggedVenue, navigation]);

  const handleSelectVenue = venue => {
    navigation.navigate('Create', {taggedVenue: venue});
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 35 : 0,
      }}>
      <View
        style={{padding: 10, backgroundColor: '#294461', paddingBottom: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
            Tag Venue
          </Text>
        </View>
      </View>

      <FlatList
        data={venues}
        renderItem={({item}) => (
          <Pressable
            onPress={() => setTaggedVenue(item?.name)}
            style={{
              padding: 10,
              marginVertical: 10,
              borderColor: '#e0e0e0',
              borderWidth: 1,
              marginHorizontal: 10,
            }}>
            <View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: 'cover',
                    borderRadius: 7,
                  }}
                  source={{uri: item?.image}}
                />

                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{fontSize: 15, fontWeight: '500', width: '100%'}}>
                    {item?.name}
                  </Text>

                  <Text style={{marginTop: 5, color: 'gray'}}>
                    {item?.address}
                  </Text>

                  <Text style={{marginTop: 7, fontWeight: '500'}}>
                    4.4 (134 ratings)
                  </Text>
                </View>

                <Ionicons
                  name="shield-checkmark-sharp"
                  size={24}
                  color="green"
                />
              </View>

              <View style={{marginTop: 5}}>
                <Text style={{textAlign: 'center', color: 'gray'}}>
                  BOOKABLE
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default TagVenueScreen;

const styles = StyleSheet.create({});
