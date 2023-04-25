import React, { useEffect, useState } from 'react';
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
  FlatList,
  TextInput,
  Keyboard
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function SendMoney({navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };
  const [value, setValue] = useState("325.94");

  useEffect(() => {
   
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      let length  = value.length;
      let v = value;
      let dotIndex = v.lastIndexOf('.');
      if(dotIndex == -1){
        v = v + ".";
        dotIndex = v.length - 1;
        length++;
      }
      while(dotIndex != length - 3 ){
        v = v + "0";
        dotIndex--;
      }
      setValue(v);
    });

    return () => {
      hideSubscription.remove();
    };
  }, [value]);
  const countDots = (str: string) => {
      let counter = 0;
      for(let i = 0; i < str.length; i++){
          if(str.charAt(i) == '.') counter++;
      }
      return counter;
  };
  const isNumeric = (value: string) => {
    return /^\d+(\.\d+)*$/.test(value);
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="powderblue"
      />
            <View style={{flex: 1, backgroundColor: 'powderblue', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 0}}>
              <Text style={{fontSize: 25, fontWeight: "600"}}>Set Amount</Text>  
            </View>
            <View style={{flex: 1, backgroundColor: 'skyblue', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >
              <View style={[styles.button, {height: 60, width: 300, }]}>
                <TextInput style={{fontSize: 40, color: 'white'}} value={value} onChangeText={(v: string) => {
                  if(v.charAt(v.length-1) == '.') {
                    v = v.replace('.', '');
                  }
                    if(!isNumeric(v)) {
                      return;
                    }
                    if(countDots(v) > 1) {
                      return;
                    }
                    if( v.lastIndexOf('.') != -1 && v.lastIndexOf('.') < v.length -3) return;
                    
                    setValue(v);
                }} keyboardType='numeric'/>
              </View>
            </View>
            <View style={{flex: 6, display: "flex", justifyContent: 'center', alignItems: 'center' }} >
              <View style={styles.button}>
                <Button title='Transfer' color="white" onPress={() => navigation.navigate('NFC') }/>
              </View>
            </View>
    </SafeAreaView>
  );
}

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



export default SendMoney;
