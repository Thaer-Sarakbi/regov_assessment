import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/AppStack';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
