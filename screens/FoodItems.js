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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    const fetchDishesByCategory = async () => {
      try {
        const restaurantSnapshot = await firestore().collection('restaurants').get();
        const restaurants = restaurantSnapshot.docs;
        let categoryDishes = [];

        for (const rest of restaurants) {
          const restaurantName = rest.data().name;

          const menuSnapshot = await firestore()
            .collection('restaurants')
            .doc(rest.id)
            .collection('menu')
            .where('category', '==', category)
            .get();

          menuSnapshot.forEach(doc => {
            const data = doc.data();
            categoryDishes.push({
              id: doc.id,
              ...data,
              restaurantName,
            });
          });
        }

        setDishes(categoryDishes);
      } catch (e) {
        console.error('Error fetching dishes:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchDishesByCategory();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7F2' }}>
      {/* Header with Cart Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity
            style={styles.cartIconButton}
            
            onPress={() => navigation.navigate('Cart')}
          >
            <Image source={imageMap.cartIcon} style={styles.cartIcon} />
          
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView style={styles.contentContainer}>
          <GoToCart />
          {dishes.length === 0 ? (
            <Text style={styles.emptyText}>No items found for this category.</Text>
          ) : (
            dishes.map(dish => (
              <View key={dish.id} style={styles.card}>
                <Image source={imageMap[dish.image]} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{dish.name}</Text>
                  <Text style={styles.restaurant}>{dish.restaurantName}</Text>
                  <Text style={styles.price}>₹{dish.price}</Text>
                  <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => handleAddToCart(dish)}
                  >
                    <Text style={styles.cartText}>Add to Cart</Text>
                  </TouchableOpacity>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F00',
  },
  cartIconButton: {
    padding: 6,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF6F00',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  restaurant: {
    fontSize: 13,
    color: '#777',
  },
  price: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
  },
  cartBtn: {
    backgroundColor: '#FF6F00',
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartIconButton: {
  position: 'absolute',
  right: 20,
  top: 55,
  zIndex: 10,
},
cartIcon: {
  width: 26,
  height: 26,
  tintColor: '#fff',
},
card: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 12,
  marginBottom: 16,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  alignItems: 'flex-start',
},

image: {
  width: 90,
  height: 90,
  borderRadius: 10,
},

info: {
  flex: 1,
  marginLeft: 14,
  justifyContent: 'space-between',
},

infoHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

name: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  flex: 1,
  paddingRight: 10,
},

cartBtn: {
  backgroundColor: '#FF6F00',
  paddingHorizontal: 12,
  paddingVertical: 5,
  borderRadius: 6,
},

cartText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 13,
},

restaurant: {
  fontSize: 13,
  color: '#777',
  marginTop: 4,
},

price: {
  fontSize: 15,
  color: '#222',
  marginTop: 2,
},

});

export default FoodItems;
