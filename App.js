import React from 'react';
import Home from './Home';
import SendMoney from './SendMoney';
import NfcView from './nfc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Set Amount" component={SendMoney} />
          <Stack.Screen name="NFC" component={NfcView} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;