import {View, Text, Image, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';

import {useRoute} from '@react-navigation/native';

const ProductDetailsPage = () => {
  const routes = useRoute();

  const {userData} = routes?.params;

  //*************this function  change api date in proper Date formate *************//
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <ScrollView>
      {userData ? (
        <View style={styles.container}>
          <Image
            source={{uri: userData?.picture?.large}}
            style={styles.image}
          />
          <Text style={styles.title}>
            Name : {userData?.name?.title} {userData?.name?.first}
          </Text>
          <Text style={styles.description}> Email : {userData?.email}</Text>
          <Text style={styles.description}> Gender : {userData?.gender}</Text>

          <Text style={styles.description}>
            {' '}
            Dob : {formatDate(userData?.dob?.date)}
          </Text>
          <Text style={styles.description}> Age : {userData?.dob?.age}</Text>

          <Text style={styles.description}>
            Address : {userData?.location?.street?.name}
          </Text>
          <Text style={styles.description}>
            City : {userData?.location?.city}
          </Text>
          <Text style={styles.description}>
            State : {userData?.location?.state}
          </Text>

          <Text style={styles.description}>
            country : {userData?.location?.country}
          </Text>

          <Text style={styles.description}>
            Postcode : {userData?.location?.postcode}
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '80%',
    marginTop:60
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
