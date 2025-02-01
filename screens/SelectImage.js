import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const SelectImage = () => {
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];
  useEffect(() => {
    getRegistrationProgress('Image').then(progressData => {
      if (progressData) {
        setImage(progressData.image || '');
      }
    });
  }, []);

  const saveImage = () => {
    if (image.trim() !== '') {
      saveRegistrationProgress('Image', {image});
    }
    navigation.navigate('PreFinal');
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 10}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Complete Your Profile
          </Text>
          <Text style={{marginTop: 10, color: 'gray'}}>
            What would you like your mates to call you? ❤️
          </Text>
        </View>

        <View style={{marginVertical: 25}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: 'green',
                borderWidth: 2,
                resizeMode: 'cover',
              }}
              source={{uri: image ? image : images[0]?.image}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 25,
              justifyContent: 'center',
            }}>
            {images?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setImage(item?.image)}
                style={{margin: 10, gap: 10}}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderColor:
                      image === item?.image ? 'green' : 'transparent',
                    borderWidth: 2,
                    resizeMode: 'contain',
                  }}
                  source={{uri: item?.image}}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={{textAlign: 'center', color: 'gray', marginVertical: 20}}>
            OR
          </Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <View>
              <Text>Enter Image Link</Text>
              <TextInput
                value={image}
                onChangeText={setImage}
                style={{
                  padding: 10,
                  borderColor: '#d0d0d0',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Pressable
        onPress={saveImage}
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
          Next
        </Text>
      </Pressable>
    </>
  );
};

export default SelectImage;

const styles = StyleSheet.create({});
