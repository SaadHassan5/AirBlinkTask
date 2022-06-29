import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash } from '../screens/Splash/splash';
import Login from '../screens/Login/Login';
import { Signup } from '../screens/Signup/Signup';
import Home from '../screens/Home/Home';
import AddPost from '../screens/AddPost/AddPost';
import ShowPost from '../screens/ShowPost/ShowPost';


const MyStack = createStackNavigator();
class Stack extends Component {
  render() {
    return (
        <MyStack.Navigator initialRouteName={'Splash'} screenOptions={{headerShown:false}}>
          <MyStack.Screen name="Splash" component={Splash} />
          <MyStack.Screen name="Login" component={Login} />
          <MyStack.Screen name="Signup" component={Signup} />
          <MyStack.Screen name="Home" component={Home} />
          <MyStack.Screen name="AddPost" component={AddPost} />
          <MyStack.Screen name="ShowPost" component={ShowPost} />
        </MyStack.Navigator>
    )
  }
}



export default Stack;