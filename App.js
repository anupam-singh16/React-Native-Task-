import React, { useEffect, useState } from 'react';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './src/store/userSlice';
import { View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);


  return (
    <Provider store={store}>
      {isConnected ? <Routes /> : <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No Internet Connection</Text>
            <TouchableOpacity
              
              style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>}
    </Provider>
  );
};

const styles = StyleSheet.create({
 
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

export default App;
