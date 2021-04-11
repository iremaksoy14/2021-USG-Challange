import React, { Component } from 'react';
import {Text, View, FlatList, Image,ScrollView,SafeAreaView,StatusBar,StyleSheet,TouchableOpacity } from 'react-native';

import Category from './components/Category'
import Region from './components/Region' 
import Yemekler from './components/Yemekler'
import SinglePage from './components/SinglePage'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function MyStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={Region}/>
     <Stack.Screen name="HomePage1" component={Category}/>
     <Stack.Screen name="CategoryName" component={Yemekler}/>
      <Stack.Screen name="ProductDetail" component={SinglePage}/>
    </Stack.Navigator>
  );
}





export default class App extends Component {
    constructor(props) {
      super(props);
          
    }

   
     render() {
      return (
         <NavigationContainer>
          <MyStack/>
        </NavigationContainer>
      );
    }  
  }
  const styles = StyleSheet.create({
 


  })