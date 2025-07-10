import React, { useEffect, useState, useCallback } from 'react';
import {
  View, PermissionsAndroid, Platform, Alert, StyleSheet, TouchableOpacity, Text
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';

const CurrentLocationMap = () => {
  const [location, setLocation] = useState(null);
  const [regionChangeProgress, setRegionChangeProgress] = useState(false);
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const BaseURL = {
    GOOGLE_API_KEY: 'AIzaSyA_5txHCcuN6qLu9e_4EKroCIQVKvNfyeM', // Replace with your actual Google API key
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // 🔧 This function MUST be inside the component and above useEffect
  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    console.log("Location Permission:----", hasPermission);
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required to get your current location.');
      return;
    }

    console.log("Getting current location...");

    Geolocation.getCurrentPosition(
      pos => {
        console.log("Current Position:1111", pos);
        const { latitude, longitude } = pos.coords;
        console.log("Current Position:", latitude, longitude);
        const currentLocation = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        };
        setLocation(currentLocation);
        console.log("Current Location Set:", currentLocation)
      },
      error => {
        console.warn(error.message);
        Alert.alert('Location Error', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000
      }
    );
  };


  useEffect(() => {
    getLocation();
  }, []);

  const fetchAddress = useCallback(

    async data => {
      if (data !== null && data !== undefined) {
        await AsyncStorage.setItem('cordinates', JSON.stringify(data));

        Geocoder.init(BaseURL.GOOGLE_API_KEY); // Use a valid API key
        console.log('Fetching address for coordinates:', data);
        console.log('Latitude:', data.latitude, 'Longitude:', data.longitude);


        Geocoder.from(data.latitude, data.longitude)
          .then(json => {
            if (
              json.results &&
              json.results[0] &&
              json.results[0].address_components
            ) {
              let formattedAddress = {
                addressLine1: json.results[0].formatted_address,
                longitude: data.longitude,
                latitude: data.latitude,
              };

              let components = json.results[0].address_components;
              if (components && components.length > 3) {
                formattedAddress.postal_code =
                  components[components.length - 1].long_name;
                formattedAddress.country =
                  components[components.length - 2].long_name;
                formattedAddress.state =
                  components[components.length - 3].long_name;
                formattedAddress.city =
                  components[components.length - 4].long_name;
              }

              // setLocation(formattedAddress);
              setRegionChangeProgress(false);
              console.log('Formatted Address:', formattedAddress);

              // navigation.navigate('AddressScreen', {
              //   addressForMy: formattedAddress,
              // });
            } else {
              console.warn('No address components found.');
              setRegionChangeProgress(false);
            }
          })
          .catch(error => console.warn('Some error occurred = ', error));
      } else {
        console.warn('fetchAddress called with null or undefined data.');
      }
    },
    [region],
  );

  const onRegionChange = useCallback(regionGotByMapview => {
    console.log('region changing');
    console.log('coords', regionGotByMapview);
    setRegionChangeProgress(true);
    setRegion(regionGotByMapview);
    // fetchAddress(regionGotByMapview);
  }, []);


  const onLocationSelect = useCallback(async () => {
    if (!location) {
      simpleToast('Please select an address');
      return;
    }
    console.log('readable AddAddress ', location);

    let data = location.addressLine1.split(',');
    let street = '';
    for (let i = 0; i < data.length - 3; i++) {
      street += data[i] + ',';
    }
    location.street = street;

    if (location) {
      console.log('reaching to AddAddress ', location);

      navigation.navigate('MyAddress', {
        address: location,
      });
    } else {
      console.warn('Formatted address not yet available');
    }
  });
  const handleUseLocation = () => {
    if (!location) return;
    navigation.navigate('AddressScreen', { selectedLocation: location });
  };

  return (
    <View style={styles.container}>
      {location && (
        <>
          <MapView
            provider="google"
            style={styles.map}
            region={location}
            zoomEnabled={true}
            zoomControlEnabled={true}
            showsUserLocation={true}

            onRegionChangeComplete={data => onRegionChange(data)}
          >
            <Marker
              coordinate={{
                
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={JSON.stringify(location)}
              draggable

            />
          </MapView>

          <TouchableOpacity style={styles.button} onPress={handleUseLocation}>
            <Text style={styles.buttonText}>Use This Location</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CurrentLocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#FF6F00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
