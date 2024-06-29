import React from 'react';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './src/store/userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,

  },
});

const App = () => {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
