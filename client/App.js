import React, {Component} from "react";
import Chat from './Chat';

//const React = require('react');
// const Chat = require('./Chat');
import {View} from "react-native"
// const {View} = require('react-native');

class App extends React.Component {
  render() {
    return (
      <View>
          <Chat/>
      </View>
    );
  }
}

export default App;
