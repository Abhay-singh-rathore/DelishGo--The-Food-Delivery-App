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
import GoToCart from '../components/GoToCart';

const RestaurantDetails = ({ route }) => {
  const { restaurantData } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    dispatch(addToCart({ ...item, quantity }));
  };

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => {
      const newQty = Math.max((prev[itemId] || 1) + change, 1);
      return { ...prev, [itemId]: newQty };
    });
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

        // Initialize quantities
        const qtyInit = {};
        menu.forEach(dish => (qtyInit[dish.id] = 1));
        setQuantities(qtyInit);
      } catch (e) {
        console.log('Error loading menu:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantData]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF7F2' }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back.jpg')} style={styles.backImage} />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>{restaurantData.name}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Image source={imageMap.cartIcon} style={styles.cartImage} />
        </TouchableOpacity>
      </View>

      <GoToCart />

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

                {/* Quantity Control */}
                <View style={styles.quantityRow}>
                  <TouchableOpacity onPress={() => handleQuantityChange(dish.id, -1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNumber}>{quantities[dish.id] || 1}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(dish.id, 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>

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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 6,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  cartButton: {
    padding: 6,
  },
  cartImage: {
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
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  qtyBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
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
});

export default RestaurantDetails;
