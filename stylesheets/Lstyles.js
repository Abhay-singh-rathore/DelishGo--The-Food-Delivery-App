import { StyleSheet } from 'react-native';





export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  top: { flex: 0.45, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 180, height: 180, resizeMode: 'contain' },
  bottom: {
    flex: 0.55,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
  },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
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
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  btnsigup: {
    alignItems: 'center',
    marginBottom: 10,
  },
  orText: {
    textAlign:'center',
    marginVertical: 10,
    color: '#999',
    fontSize: 14,
  },
});
