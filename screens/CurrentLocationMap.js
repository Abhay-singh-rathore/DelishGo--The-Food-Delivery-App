import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const CurrentLocationMap = () => {
  const [location, setLocation] = useState(null);
  const [regionChangeProgress, setRegionChangeProgress] = useState(false);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);
  const navigation = useNavigation();

  const BaseURL = {
    GOOGLE_API_KEY: 'AIzaSyA_5txHCcuN6qLu9e_4EKroCIQVKvNfyeM', // Replace with your API key
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

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required.');
      return;
    }

    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        const currentLocation = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setLocation(currentLocation);
      },
      error => {
        Alert.alert('Location Error', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      }
    );
  };

  const extractComponent = (components, type) => {
    const match = components.find(comp => comp.types.includes(type));
    return match ? match.long_name : '';
  };

  const fetchAddress = useCallback(async data => {
    if (data) {
      Geocoder.init(BaseURL.GOOGLE_API_KEY);
      try {
        const json = await Geocoder.from(data.latitude, data.longitude);

        if (
          json.results &&
          json.results[0] &&
          json.results[0].address_components
        ) {
          const components = json.results[0].address_components;

          const fullAddress = json.results[0].formatted_address;
          const line1 = fullAddress.split(',').slice(0, 2).join(',').trim();
          const line2 = fullAddress.split(',').slice(2,7).join(',').trim();

          const city = extractComponent(components, 'locality');
          const district = extractComponent(components, 'administrative_area_level_2');
          const state = extractComponent(components, 'administrative_area_level_1');
          const pincode = extractComponent(components, 'postal_code');

          const formattedAddress = {
            line1,
            line2,
            city,
            district,
            state,
            pincode,
            latitude: data.latitude,
            longitude: data.longitude,
          };

          console.log(' Formatted Address:', formattedAddress);
          setAddress(formattedAddress);
        } else {
          console.warn('No address components found.');
        }
      } catch (error) {
        console.warn(' Geocoder error:', error);
      }
    }
  }, []);

  const onRegionChange = useCallback(regionData => {
    setRegionChangeProgress(true);
    setRegion(regionData);
    fetchAddress(regionData);
  }, [fetchAddress]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchAddress(location);
    }
  }, [location, fetchAddress]);

  const handleUseLocation = () => {
  if (!address) return;

  // Deconstruct fields from address object
  const selectedLocation = {
    line1: address.line1|| '',
    line2: address.line2, // You can modify or extract landmark if needed
    city: address.city || '',
    district: address.district || '',
    state: address.state || '',
    pincode: address.pincode || '',
  };

  navigation.navigate('AddressScreen', { selectedLocation });
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
            showsMyLocationButton={true}
            showsCompass={true}
            followsUserLocation={true}
            onRegionChangeComplete={onRegionChange}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={address?.line1 || 'Selected Location'}
              draggable={true}
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
