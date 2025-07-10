import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import imageMap from '../assets/imageMap';
import Hstyles from '../stylesheets/Hstyles';
import GoToCart from '../components/GoToCart';


const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Food');
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigateTo = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodSnapshot = await firestore().collection('foodItems').get();
        const restaurantSnapshot = await firestore().collection('restaurants').get();

        const foodData = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const restaurantData = restaurantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setFoodItems(foodData);
        setRestaurants(restaurantData);
      } catch (err) {
        console.log('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists) {
            setUserProfile(doc.data());
          }
        }
      } catch (err) {
        console.log('Error fetching profile:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const snapshot = await firestore()
            .collection('orders')
            .doc(user.uid)
            .collection('userOrders')
            .orderBy('timestamp', 'desc')
            .get();

          const orderData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOrders(orderData);
        }
      } catch (err) {
        console.log('Error fetching orders:', err);
      }
    };

    fetchData();
    fetchUserProfile();
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists) {
            setUserProfile(doc.data());
          }
        }
      } catch (err) {
        console.log('Error fetching profile:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const snapshot = await firestore()
            .collection('orders')
            .doc(user.uid)
            .collection('userOrders')
            .orderBy('timestamp', 'desc')
            .get();

          const orderData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOrders(orderData);
        }
      } catch (err) {
        console.log('Error fetching orders:', err);
      }
    };

    if (activeTab === 'Profile') {
      fetchUserProfile();
    } else if (activeTab === 'Orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <View style={Hstyles.container}>
      <View style={Hstyles.topBanner}>
        <Text style={Hstyles.appName}>DelishGo</Text>

        {(activeTab === 'Food' || activeTab === 'Restaurants') && (
         <GoToCart />
        )}

        <Text style={Hstyles.quote}>"Delivering delights to your doorstep"</Text>
      </View>

      <View style={Hstyles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView contentContainerStyle={Hstyles.scrollArea}>
            {activeTab === 'Food' && (
              <View>
                <Text style={Hstyles.sectionTitle}>Food Items</Text>
                <View style={Hstyles.itemRowWrap}>
                  {foodItems.map(item => (
                    <FoodCard
                      key={item.id}
                      label={item.name}
                      image={imageMap[item.image]}
                      onPress={() => navigation.navigate('FoodItems', {
                        category: item.name,
                      })}
                    />
                  ))}
                </View>

                <Text style={Hstyles.sectionTitle}>Nearby Restaurants</Text>
                {restaurants.map(rest => (
                  <RestaurantCard
                    key={rest.id}
                    name={rest.name}
                    type={rest.type}
                    time={rest.time}
                    image={imageMap[rest.image]}
                    onPress={() => navigation.navigate('RestaurantDetails', {
                      restaurantId: rest.id,
                      restaurantData: rest
                    })}
                  />
                ))}
              </View>
            )}

            {activeTab === 'Restaurants' && (
              <View>
                <Text style={Hstyles.sectionTitle}>All Restaurants</Text>
                {restaurants.map(rest => (
                  <RestaurantCard
                    key={rest.id}
                    name={rest.name}
                    type={rest.type}
                    time={rest.time}
                    image={imageMap[rest.image]}
                    onPress={() => navigation.navigate('RestaurantDetails', {
                      restaurantId: rest.id,
                      restaurantData: rest
                    })}
                  />
                ))}
              </View>
            )}

            {activeTab === 'Orders' && (
              <View>
                <Text style={Hstyles.sectionTitle}>Your Orders</Text>
                {orders.length === 0 ? (
                  <Text style={Hstyles.empty}>You have no orders yet.</Text>
                ) : (
                  orders.map(order => (
                    <View key={order.id} style={Hstyles.orderCard}>
                      <Text style={Hstyles.orderHeading}>Order ID: {order.id}</Text>
                      <Text style={Hstyles.orderSub}>Placed: {formatTimestamp(order.timestamp)}</Text>
                      <Text style={Hstyles.orderSub}>Est. Delivery: 30-40 mins</Text>

                      <Text style={Hstyles.orderSub}>Items:</Text>
                      {order.items.map((item, index) => (
                        <Text key={index} style={Hstyles.orderItem}>
                          - {item.name} x {item.quantity}
                        </Text>
                      ))}

                      <Text style={Hstyles.orderSub}>Total: ₹{order.total}</Text>

                      <Text style={Hstyles.orderSub}>Delivery Address:</Text>
                      <Text style={Hstyles.orderAddress}>
                        {order.address?.lane1}, {order.address?.lane2}{'\n'}
                        {order.address?.city}, {order.address?.district}, {order.address?.state} - {order.address?.pincode}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            )}

            {activeTab === 'Profile' && (
              <View>
                <Text style={Hstyles.sectionTitle}>Your Profile</Text>
                <View style={{ padding: 10 }}>
                  <Text style={Hstyles.profileText}>Name: {userProfile?.name || 'N/A'}</Text>
                  <Text style={Hstyles.profileText}>Phone: {userProfile?.phone || 'N/A'}</Text>
                  <Text style={Hstyles.profileText}>Email: {auth().currentUser?.email || 'Not logged in'}</Text>
                  <Text style={Hstyles.profileText}>Address:</Text>
                  {userProfile?.address ? (
                    <Text style={Hstyles.profileText}>
                      {userProfile.address.lane1}, {userProfile.address.lane2}{'\n'}
                      {userProfile.address.city}, {userProfile.address.district}{'\n'}
                      {userProfile.address.state} - {userProfile.address.pincode}
                    </Text>
                  ) : (
                    <Text style={Hstyles.profileText}>No address found</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={Hstyles.logoutButton}
                  onPress={async () => {
                    await auth().signOut();
                    navigation.replace('Login');
                  }}
                >
                  <Text style={Hstyles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </View>

      <View style={Hstyles.bottomNav}>
        <NavButton
          icon={imageMap.foodIcon}
          label="Food"
          active={activeTab === 'Food'}
          onPress={() => navigateTo('Food')}
        />
        <NavButton
          icon={imageMap.restaurantIcon}
          label="Restaurants"
          active={activeTab === 'Restaurants'}
          onPress={() => navigateTo('Restaurants')}
        />
        <NavButton
          icon={imageMap.orderIcon}
          label="Orders"
          active={activeTab === 'Orders'}
          onPress={() => navigateTo('Orders')}
        />
        <NavButton
          icon={imageMap.profileIcon}
          label="Profile"
          active={activeTab === 'Profile'}
          onPress={() => navigateTo('Profile')}
        />
      </View>
    </View>
  );
};

const FoodCard = ({ label, image, onPress }) => (
  <TouchableOpacity style={Hstyles.card} onPress={onPress}>
    <Image source={image} style={Hstyles.cardImage} />
    <Text style={Hstyles.cardLabel}>{label}</Text>
  </TouchableOpacity>
);

const RestaurantCard = ({ name, type, time, image, onPress }) => (
  <TouchableOpacity style={Hstyles.restaurantCard} onPress={onPress}>
    <Image source={image} style={Hstyles.restaurantImage} />
    <Text style={Hstyles.restaurantName}>{name}</Text>
    <Text style={Hstyles.restaurantInfo}>{type} • {time}</Text>
  </TouchableOpacity>
);

const NavButton = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={Hstyles.navItem} onPress={onPress}>
    <Image source={icon} style={[Hstyles.navIcon, active && Hstyles.navIconActive]} />
    <Text style={[Hstyles.navLabel, active && Hstyles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);


export default Home;
