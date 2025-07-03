import { StyleSheet } from 'react-native';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#FFF',
},
top: {
  flex: 0.3,
  justifyContent: 'center',
  alignItems: 'center',
},
logo: {
  width: 150,
  height: 150,
  resizeMode: 'contain',
},
bottom: {
  flex: 0.7,
  backgroundColor: '#FFF',
  padding: 20,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  elevation: 8,
},
heading: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 25,
  textAlign: 'center',
},
input: {
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#FF6F00',
  marginBottom: 15,
  paddingHorizontal: 15,
  fontSize: 16,
},
button: {
  backgroundColor: '#FF6F00',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 15,
},
buttonText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},
btnsigup: {
  alignItems: 'center',
  marginTop: 10,
},

});
