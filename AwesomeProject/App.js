/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './src/pages/Login.js';
import Home from './src/pages/Home.js';
import Post from './src/pages/Post.js';
import { ApolloProvider } from "react-apollo";
import client from './client'


import { createStackNavigator } from 'react-navigation'

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Post: {
    screen: Post
  }
},
{
  initialRouteName: 'Login'
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <RootStack/>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});