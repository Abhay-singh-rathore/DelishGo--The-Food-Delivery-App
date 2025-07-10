import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import imageMap from '../assets/imageMap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { useNavigation } from '@react-navigation/native';

const RestaurantDetails = ({ route }) => {
  const { restaurantData } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const snapshot = await firestore()
          .collection('restaurants')
          .doc(restaurantData.id)
          .collection('menu')
          .get();

        const menu = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(menu);
      } catch (e) {
        console.log('Error loading menu:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantData]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Top Bar with Cart Icon */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>{restaurantData.name}</Text>
        <TouchableOpacity
            style={styles.cartIconButton}
            
            onPress={() => navigation.navigate('Cart')}
          >
            <Image source={imageMap.cartIcon} style={styles.cartIcon} />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={imageMap[restaurantData.image]} style={styles.image} />
        <Text style={styles.info}>
          Type: {restaurantData.type} | Time: {restaurantData.time}
        </Text>

        <Text style={styles.sectionTitle}>Menu</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#FF6F00" />
        ) : (
          menuItems.map(dish => (
            <TouchableOpacity
              key={dish.id}
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('FoodDetails', {
                  foodData: { ...dish, image: dish.image },
                })
              }
            >
              <Image source={imageMap[dish.image]} style={styles.menuImage} />
              <View style={styles.menuText}>
                <Text style={styles.menuName}>{dish.name}</Text>
                <Text style={styles.menuDescription}>{dish.description}</Text>
                <Text style={styles.menuPrice}>₹{dish.price}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(dish)}>
                  <Text style={styles.addToCart}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff5ef',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  menuImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  menuText: {
    flex: 1,
    justifyContent: 'center',
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
    marginVertical: 2,
  },
  menuPrice: {
    fontSize: 14,
    color: '#555',
  },
  addToCart: {
    backgroundColor: '#FF6F00',
    padding: 6,
    marginTop: 4,
    borderRadius: 6,
    color: '#fff',
    textAlign: 'center',
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


});

export default RestaurantDetails;
