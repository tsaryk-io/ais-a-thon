/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Home({navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="powderblue"
      />
        <View style={{flex: 1}}>  
            <View style={{flex: 1, backgroundColor: 'powderblue', paddingLeft: 20, paddingTop:20,}}>
              <Text style={{fontSize: 25, fontWeight: "600"}}>Your Balance:</Text>  
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 30, fontWeight: "600"}}>$500.00</Text>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
              <View style={[styles.button, {}]}>
                <Button title='Send' color="#fff" onPress={() => navigation.navigate('Set Amount') }/>
              </View>
              <View style={[styles.button, {}]}>
                  <Button title='Request' color="#fff" onPress={() => navigation.navigate('Set Amount') }/>
              </View>
            </View>
            <View style={{flex: 3}} >
              <View style={{padding: 20}}>
              <Text style={{fontWeight: "700", fontSize: 20}}> All Activity</Text>
              </View>
              <View style={[styles.item, {borderTopWidth: 0}]} >
                <Text style={[styles.title, {fontWeight: "600"}]}>Date</Text>
                <Text style={[styles.title,  {fontWeight: '600'}]}>Description</Text>
                <Text style={[styles.title, {fontWeight: "600"}]}>Amount</Text>
              </View>
              <FlatList
                data={DATA}
                renderItem={({item}) => <Item date={item.date} description={item.description} amount={item.amount} />}
                keyExtractor={item => item.id}
              />
              </View>
        </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  title: {
    fontSize: 15,
  },
  button: {
   borderColor: 'black',
   borderWidth: 0,
   padding: 5,
   width: '40%', 
   display: 'flex',
   flexDirection: 'row',
   height: 50, 
   justifyContent: 'center',
   borderRadius: 20,
   backgroundColor: '#3e77c9'
  },
});

type ItemProps = {date: string, description: string, amount: number };

const Item = ( {amount, description, date}: ItemProps) => {
  let amountView = "$" + amount;
  if(amount < 0 ){
    amountView = "-$" + amount * -1;
  }
  return (<View style={styles.item} >
    <Text style={styles.title}>{date}</Text>
    <Text style={styles.title}>{description}</Text>
    <Text style={styles.title}>{amountView}</Text>
  </View>);
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    date: "4/22/2023",
    description: "Payment recevied",
    amount: 100
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    date: "4/21/2023",
    description: "Payment Sent",
    amount: -50
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    date: "4/20/2023",
    description: "Payment recevied",
    amount: 250
  },
];

export default Home;



