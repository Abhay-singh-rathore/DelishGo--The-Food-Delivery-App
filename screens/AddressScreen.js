import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/CartSlice';
import CurrentLocationMap from './CurrentLocationMap';

const AddressScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const user = auth().currentUser;

  const [useLastAddress, setUseLastAddress] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const [lane1, setLane1] = useState('');
  const [lane2, setLane2] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');

  const selectedLocation = route?.params?.selectedLocation || null;
  // now selectedLocation = { latitude, longitude, ... }

  // Log to confirm
  useEffect(() => {
    if (selectedLocation) {
      console.log('📍 Selected location:', selectedLocation);
    }
  }, [selectedLocation]);


  useEffect(() => {
    if (user && useLastAddress) {
      setLoadingAddress(true);
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          const data = doc.data();
          if (data?.address) {
            const a = data.address;
            setFirstName(data.name || '');
            setMobile(data.phone || '');
            setLane1(a.lane1 || '');
            setLane2(a.lane2 || '');
            setCity(a.city || '');
            setDistrict(a.district || '');
            setStateName(a.state || '');
            setPincode(a.pincode || '');
          }
        })
        .catch(e => console.error('Failed to fetch address:', e))
        .finally(() => setLoadingAddress(false));
    }
  }, [useLastAddress]);

  const handlePlaceOrder = async () => {
    if (
      !firstName.trim() || !mobile.trim() || !lane1.trim() ||
      !city.trim() || !district.trim() || !stateName.trim() || !pincode.trim()
    ) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      Alert.alert('Invalid Mobile', 'Enter valid 10-digit mobile number.');
      return;
    }

    if (pincode.length !== 6 || isNaN(pincode)) {
      Alert.alert('Invalid Pincode', 'Enter valid 6-digit pincode.');
      return;
    }

    const orderData = {
      userId: user.uid,
      name: firstName,
      phone: mobile,
      address: {
        lane1,
        lane2,
        city,
        district,
        state: stateName,
        pincode,
      },
      items: cartItems,
      total,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore()
        .collection('orders')
        .doc(user.uid)
        .collection('userOrders')
        .add(orderData);

      // Save address for future
      await firestore().collection('users').doc(user.uid).set({
        name: firstName,
        phone: mobile,
        address: {
          lane1, lane2, city, district, state: stateName, pincode,
        },
      });

      dispatch(clearCart());
      Alert.alert('Success', 'Order Placed Successfully ✅');
      navigation.popToTop();
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Something went wrong while placing your order.');
    }

    
  };




  useEffect(() => {
  if (selectedLocation) {
    console.log('📍 Autofilling from selected location:', selectedLocation);

    setLane1(selectedLocation.line1 || '');
    setLane2(selectedLocation.line2 || '');
    setCity(selectedLocation.city || '');
    setDistrict(selectedLocation.district || '');
    setStateName(selectedLocation.state || '');
    setPincode(selectedLocation.pincode || '');
  }
}, [selectedLocation]);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ height: 300 }}>
        <CurrentLocationMap />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Use Last Saved Address</Text>
        <Switch
          value={useLastAddress}
          onValueChange={setUseLastAddress}
        />
      </View>

      {loadingAddress ? (
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>Loading address...</Text>
      ) : (
        <>
          <Text style={styles.title}>Enter Delivery Address</Text>

          <Text style={styles.label}>First Name *</Text>
          <TextInput
            placeholder="e.g. Abhay"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            placeholder="9876543210"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
          />

          <Text style={styles.label}>Address Line 1 *</Text>
          <TextInput
            placeholder="Flat No / Street"
            value={lane1}
            onChangeText={setLane1}
            style={styles.input}
          />

          <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            placeholder="Landmark / Area"
            value={lane2}
            onChangeText={setLane2}
            style={styles.input}
          />

          <Text style={styles.label}>City *</Text>
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />

          <Text style={styles.label}>District *</Text>
          <TextInput
            placeholder="District"
            value={district}
            onChangeText={setDistrict}
            style={styles.input}
          />

          <Text style={styles.label}>State *</Text>
          <TextInput
            placeholder="State"
            value={stateName}
            onChangeText={setStateName}
            style={styles.input}
          />

          <Text style={styles.label}>Pincode *</Text>
          <TextInput
            placeholder="452001"
            value={pincode}
            onChangeText={setPincode}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF7F2',
    flexGrow: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderColor: '#FF6F00',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddressScreen;
