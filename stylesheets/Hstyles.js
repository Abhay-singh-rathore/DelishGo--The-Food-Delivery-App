import { StyleSheet } from 'react-native';


export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBanner: {
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  quote: {
    fontSize: 16,
    color: '#ffe0b2',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollArea: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
    color: '#8B2500',
  },
  itemRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff5ef',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  cardLabel: {
    marginTop: 8,
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  restaurantCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#333',
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#777',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#aaa',
  },
  navIconActive: {
    tintColor: '#8B2500',
  },
  navLabel: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#8B2500',
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  profileText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF6F00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
categoryTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginLeft: 10,
  marginBottom: 8,
  marginTop: 15,
  color: '#FF6F00',
},

 orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    marginHorizontal: 10,
  },
  orderHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF6F00',
    marginBottom: 4,
  },
  orderSub: {
    fontSize: 14,
    marginTop: 6,
    color: '#333',
  },
  orderItem: {
    marginLeft: 10,
    color: '#555',
  },
  orderAddress: {
    marginTop: 4,
    fontSize: 14,
    color: '#444',
  },
   profileContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  profileLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FF6F00',
    marginTop: 10,
  },
  profileValue: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
    profileContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  profileLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FF6F00',
    marginTop: 10,
  },
  profileValue: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
  },



});


