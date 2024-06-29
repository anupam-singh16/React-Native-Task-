import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useRoute} from '@react-navigation/native';

const ProductDetailsPage = () => {
  const routes = useRoute();
  const {userData} = routes?.params;
  // console.log(userData, 'param id ');

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: userData?.picture?.large}} style={styles.image} />
      <Text style={styles.title}>{userData?.name?.first}</Text>
      <Text style={styles.description}>{userData?.email}</Text>
      <Text style={styles.description}>{userData?.location?.street?.name}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
    objectFit: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsPage;
