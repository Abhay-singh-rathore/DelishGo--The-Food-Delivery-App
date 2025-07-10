
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/CartSlice';
import imageMap from '../assets/imageMap';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation(); // ✅ Proper hook usage

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={imageMap[item.image] || require('../assets/default-food.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
        <Text style={styles.price}>₹{item.price * item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />

          <Text style={styles.total}>Total: ₹{total}</Text>

          {/* ✅ Navigates to Address screen */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('AddressScreen')}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={styles.clearText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF7F2', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#FF6F00' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { marginLeft: 12, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  qty: { fontSize: 14, color: '#666' },
  price: { fontSize: 14, fontWeight: '500', color: '#222' },
  remove: { marginTop: 4, color: 'red' },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#333' },
  checkoutBtn: {
    marginTop: 15,
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 6,
  },
  checkoutText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 6,
  },
  clearText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default Cart;
