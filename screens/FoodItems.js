import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import imageMap from '../assets/imageMap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { useNavigation } from '@react-navigation/native';
import GoToCart from '../components/GoToCart';

const FoodItems = ({ route }) => {
  const { category } = route.params;
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const restaurantSnapshot = await firestore().collection('restaurants').get();
        let items = [];

        for (const rest of restaurantSnapshot.docs) {
          const menuSnapshot = await firestore()
            .collection('restaurants')
            .doc(rest.id)
            .collection('menu')
            .where('category', '==', category)
            .get();

          menuSnapshot.forEach(doc => {
            items.push({
              id: doc.id,
              ...doc.data(),
              restaurantName: rest.data().name,
            });
          });
        }

        setDishes(items);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [category]);

  const handleAddToCart = (item) => {
    const qty = quantities[item.id] || 1;
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(item));
    }
  };

  const increaseQty = (id) =>
    setQuantities((q) => ({ ...q, [id]: (q[id] || 1) + 1 }));

  const decreaseQty = (id) =>
    setQuantities((q) => ({ ...q, [id]: q[id] > 1 ? q[id] - 1 : 1 }));

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7F2' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../assets/back.jpg')}
            style={styles.backImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
         <GoToCart />

        <Text style={styles.headerTitle}>{category}</Text>

        <View style={styles.cartWrapper}>
         
        </View>
      </View>

      {/* Loading or List */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView style={{ padding: 16 }}>
          {dishes.length === 0 ? (
            <Text style={styles.emptyText}>No items found in this category.</Text>
          ) : (
            dishes.map((dish) => (
              <View key={dish.id} style={styles.card}>
                <Image source={imageMap[dish.image]} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{dish.name}</Text>
                  <Text style={styles.restaurant}>{dish.restaurantName}</Text>
                  <Text style={styles.price}>₹{dish.price}</Text>
                  <View style={styles.actionRow}>
                    <View style={styles.qtyControl}>
                      <TouchableOpacity
                        onPress={() => decreaseQty(dish.id)}
                        style={styles.qtyBtn}
                      >
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyCount}>{quantities[dish.id] || 1}</Text>
                      <TouchableOpacity
                        onPress={() => increaseQty(dish.id)}
                        style={styles.qtyBtn}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => handleAddToCart(dish)}
                    >
                      <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF7F2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  cartWrapper: {
    paddingLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  restaurant: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 12,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  addBtn: {
    backgroundColor: '#FF6F00',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default FoodItems;
