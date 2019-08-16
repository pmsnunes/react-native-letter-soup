import React from 'react';

import { Provider } from 'react-redux';
import store from './src/redux/store'
import SoupGame from './src/components/Soup';


const App = () => {
  return (
    <Provider store={store}>
      <SoupGame></SoupGame>  
    </Provider>
      
  );
};

export default App;
