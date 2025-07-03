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

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Food');
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
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

    fetchData();
  }, []);

  return (
    <View style={Hstyles.container}>
      <View style={Hstyles.topBanner}>
        <Text style={Hstyles.appName}>DelishGo</Text>
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
                    <FoodCard key={item.id} label={item.name} image={imageMap[item.image]} />
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
                  />
                ))}
              </View>
            )}

            {activeTab === 'Orders' && (
              <View>
                <Text style={Hstyles.sectionTitle}>Your Orders</Text>
                <Text style={Hstyles.empty}>You have no orders yet.</Text>
              </View>
            )}

            {activeTab === 'Profile' && (
              <View>
                <Text style={Hstyles.sectionTitle}>Your Profile</Text>
                <Text style={Hstyles.profileText}>
                  Email: {auth().currentUser?.email || 'Not logged in'}
                </Text>
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

      {/* Bottom Navigation */}
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

const FoodCard = ({ label, image }) => (
  <View style={Hstyles.card}>
    <Image source={image} style={Hstyles.cardImage} />
    <Text style={Hstyles.cardLabel}>{label}</Text>
  </View>
);

const RestaurantCard = ({ name, type, time, image }) => (
  <View style={Hstyles.restaurantCard}>
    <Image source={image} style={Hstyles.restaurantImage} />
    <Text style={Hstyles.restaurantName}>{name}</Text>
    <Text style={Hstyles.restaurantInfo}>{type} • {time}</Text>
  </View>
);

const NavButton = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={Hstyles.navItem} onPress={onPress}>
    <Image source={icon} style={[Hstyles.navIcon, active && Hstyles.navIconActive]} />
    <Text style={[Hstyles.navLabel, active && Hstyles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);



export default Home;
