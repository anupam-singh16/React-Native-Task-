import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Image} from 'react-native-elements';

import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUsers,
  selectAllUsers,
  selectUserStatus,
  selectError,
} from './store/userSlice';

const UserList = ({navigation}) => {
  const [user, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const retryFunction = async () => {
    setRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(fetchUsers(page));
    setRefreshing(false);
  };
 


  const dispatch = useDispatch();

  const userSlice = useSelector(state => state?.users);
  const {status, users, error} = userSlice;

  useEffect(() => {
    setUsers(page === 1 ? user : [...user, ...users]);
  }, [users]);

  console.log(error, status, page, user?.length, 'users');

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRefresh = useCallback(() => {
    setUsers(users);
    setRefreshing(true);
    setPage(1);
    dispatch(fetchUsers(1))?.then(() => setRefreshing(false));
  }, []);

  const naviagteToDetailsPage = data => {
    navigation.navigate('UserDetails', {userData: data});
  };



  

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        naviagteToDetailsPage(item || item?.login?.uuid);
      }}>
      <Image source={{uri: item.picture?.large}} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          Name : {item.name?.first} {item.name?.last}
        </Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          Email : {item?.email}
        </Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          Mobile : {item?.cell}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (status === 'loading') {
      return null;
    } else if (error) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {status === 'failed' ? (
    

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={retryFunction} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={user}
          renderItem={renderItem}
          keyExtractor={item => item.login.uuid}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#9B59B6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    margin: 10,
    width: 100,
    height: 100,
    objectFit: 'contain',
  },

  cardBody: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  buttonColor: {
    width: '40%',
    height: 40,
    backgroundColor: '#9B59B6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    flex: 1,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserList;
