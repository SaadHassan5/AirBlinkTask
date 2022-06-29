import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, } from 'react-native';
import Stack from './app/navigators/main-navigator';
import { Provider } from 'react-redux';
import { store } from './app/root/store';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    </Provider>
  );
};

export default App;
