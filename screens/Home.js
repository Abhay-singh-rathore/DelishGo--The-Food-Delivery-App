import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
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
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [foodSnapshot, restaurantSnapshot] = await Promise.all([
          firestore().collection('foodItems').get(),
          firestore().collection('restaurants').get(),
        ]);
        const foodData = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const restaurantData = restaurantSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoodItems(foodData);
        setRestaurants(restaurantData);
      } catch (error) {
        console.log('Error loading data:', error);
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;
        if (!user) return;

        if (activeTab === 'Profile') {
          const profile = await firestore().collection('users').doc(user.uid).get();
          if (profile.exists) setUserProfile(profile.data());
        }

        if (activeTab === 'Orders') {
          const orderSnap = await firestore()
            .collection('orders')
            .doc(user.uid)
            .collection('userOrders')
            .orderBy('timestamp', 'desc')
            .get();

          const orderData = orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(orderData);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [activeTab]);

  const formatTimestamp = (timestamp) =>
    timestamp?.toDate ? timestamp.toDate().toLocaleString() : '';

  return (
    <View style={Hstyles.container}>
      {/* Top Banner */}
      <View style={Hstyles.topBanner}>
        <Text style={Hstyles.appName}>DelishGo</Text>
        {(activeTab === 'Food' || activeTab === 'Restaurants') && <GoToCart />}
        <Text style={Hstyles.tagline}>"Delivering delights to your doorstep"</Text>
      </View>

      {/* Content */}
      <View style={Hstyles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6F00" style={{ marginTop: 40 }} />
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <ScrollView contentContainerStyle={Hstyles.scrollArea}>
              {/* Food */}
              {activeTab === 'Food' && (
                <>
                  <Text style={Hstyles.sectionTitle}>🍽️ Popular Dishes</Text>
                  <View style={Hstyles.cardRow}>
                    {foodItems.length ? (
                      foodItems.map((item) => (
                        <FoodCard
                          key={item.id}
                          label={item.name}
                          image={imageMap[item.image]}
                          onPress={() =>
                            navigation.navigate('FoodItems', { category: item.name })
                          }
                        />
                      ))
                    ) : (
                      <Text style={Hstyles.empty}>No dishes available</Text>
                    )}
                  </View>

                  <Text style={Hstyles.sectionTitle}>🏬 Restaurants Around You</Text>
                  {restaurants.length ? (
                    restaurants.map((rest) => (
                      <RestaurantCard
                        key={rest.id}
                        name={rest.name}
                        type={rest.type}
                        time={rest.time}
                        image={imageMap[rest.image]}
                        onPress={() =>
                          navigation.navigate('RestaurantDetails', {
                            restaurantId: rest.id,
                            restaurantData: rest,
                          })
                        }
                      />
                    ))
                  ) : (
                    <Text style={Hstyles.empty}>No restaurants available</Text>
                  )}
                </>
              )}

              {/* Restaurants */}
              {activeTab === 'Restaurants' && (
                <>
                  <Text style={Hstyles.sectionTitle}>🏠 All Restaurants</Text>
                  {restaurants.length ? (
                    restaurants.map((rest) => (
                      <RestaurantCard
                        key={rest.id}
                        name={rest.name}
                        type={rest.type}
                        time={rest.time}
                        image={imageMap[rest.image]}
                        onPress={() =>
                          navigation.navigate('RestaurantDetails', {
                            restaurantId: rest.id,
                            restaurantData: rest,
                          })
                        }
                      />
                    ))
                  ) : (
                    <Text style={Hstyles.empty}>No restaurants available</Text>
                  )}
                </>
              )}

              {/* Orders */}
              {activeTab === 'Orders' && (
                <>
                  <Text style={Hstyles.sectionTitle}>🧾 Order History</Text>
                  {orders.length ? (
                    orders.map((order) => (
                      <View key={order.id} style={Hstyles.orderCard}>
                        <Text style={Hstyles.orderHeading}>Order #{order.id}</Text>
                        <Text style={Hstyles.orderSub}>Date: {formatTimestamp(order.timestamp)}</Text>
                        <Text style={Hstyles.orderSub}>Items:</Text>
                        {order.items.map((item, i) => (
                          <Text key={i} style={Hstyles.orderItem}>
                            • {item.name} x {item.quantity}
                          </Text>
                        ))}
                        <Text style={Hstyles.orderSub}>Total: ₹{order.total}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={Hstyles.empty}>No recent orders.</Text>
                  )}
                </>
              )}

              {/* Profile */}
              {activeTab === 'Profile' && (
                <>
                  <Text style={Hstyles.sectionTitle}>👤 Your Profile</Text>
                  <View style={Hstyles.profileContainer}>
                    <Text style={Hstyles.profileText}>Name: {userProfile?.name || 'N/A'}</Text>
                    <Text style={Hstyles.profileText}>Phone: {userProfile?.phone || 'N/A'}</Text>
                    <Text style={Hstyles.profileText}>Email: {auth().currentUser?.email}</Text>
                    <Text style={Hstyles.profileText}>Address:</Text>
                    {userProfile?.address ? (
                      <Text style={Hstyles.profileText}>
                        {userProfile.address.lane1}, {userProfile.address.lane2}{'\n'}
                        {userProfile.address.city}, {userProfile.address.state} - {userProfile.address.pincode}
                      </Text>
                    ) : (
                      <Text style={Hstyles.profileText}>No address found</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={Hstyles.signOutBtn}
                    onPress={async () => {
                      await auth().signOut();
                      navigation.replace('Login');
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={Hstyles.signOutText}>🚪 Sign Out</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={Hstyles.bottomNav}>
        <NavButton
          icon={imageMap.foodIcon}
          label="Food"
          active={activeTab === 'Food'}
          onPress={() => setActiveTab('Food')}
        />
        <NavButton
          icon={imageMap.restaurantIcon}
          label="Restaurants"
          active={activeTab === 'Restaurants'}
          onPress={() => setActiveTab('Restaurants')}
        />
        <NavButton
          icon={imageMap.orderIcon}
          label="Orders"
          active={activeTab === 'Orders'}
          onPress={() => setActiveTab('Orders')}
        />
        <NavButton
          icon={imageMap.profileIcon}
          label="Profile"
          active={activeTab === 'Profile'}
          onPress={() => setActiveTab('Profile')}
        />
      </View>
    </View>
  );
};

/** Reusable Cards */
const FoodCard = ({ label, image, onPress }) => {
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[Hstyles.foodCard, { transform: [{ scale: scaleAnim }] }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Image source={image} style={Hstyles.cardImage} />
      <Text style={Hstyles.cardLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const RestaurantCard = ({ name, type, time, image, onPress }) => {
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[Hstyles.restaurantCard, { transform: [{ scale: scaleAnim }] }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Image source={image} style={Hstyles.restaurantImage} />
      <Text style={Hstyles.restaurantName}>{name}</Text>
      <Text style={Hstyles.restaurantInfo}>{type} • {time}</Text>
    </TouchableOpacity>
  );
};

const NavButton = ({ icon, label, active, onPress }) => {
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={[Hstyles.navItem, { transform: [{ scale: scaleAnim }] }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Image source={icon} style={[Hstyles.navIcon, active && Hstyles.navIconActive]} />
      <Text style={[Hstyles.navLabel, active && Hstyles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Home;