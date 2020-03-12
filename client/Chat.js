import React, { Component } from "react";
import io from "socket.io-client";
import { View, FlatList, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";

//const io=require('socket.io-client/dist/socket.io');
//const socket = io.connect("http://localhost:3000", {reconnect: true});
console.log("1!!!!!!!!!!!!!!!!!!");

export default class Chat extends React.Component {
  
  constructor() {
    super();
    this.state = {
       username: "", 
       msg: "",
       messages: [] ,
       endpoint: "http://localhost:3000"
      };

  }


  componentDidMount() {
     
     const {endpoint} = this.state;
     const socket=io.connect(endpoint);
     console.log("inside function");
     socket.on("new-user", name =>{
       console.log("user connected")
     })

     socket.on("receive message", ({username, msg}) => {
           this.setState({ messages: [...this.state.messages, {username, msg}]   
      });
   });
 }
  

  
  // onUpdatemsg  = e => {
  //   this.setState({ msg: e.target.value });
  // };

  onSubmitmsg = () => {
    console.log("here");
    socket.emit("send message",()=>
    {
        username = this.state.username;
        msg = this.state.msg;
    });
    this.setState({ msg: "" });
  };

  renderItem({item, index}){
    return (
      <View style={styles.row}>
         <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
         </View>
      </View>
    );
  }

  render() {

    // const messages=this.state.messages.map(msg => (
    // <Text style={{borderWidth: 2, top: 500}}>{msg.username}: {msg.msg}</Text>
    //     ));

    return (
      
      <View style={styles.container}>

        <FlatList 
         inverted
         data={this.state.messages}
         renderItem={this.renderItem} />
        <KeyboardAvoidingView behavior='padding'>

          <View style={styles.footer}>

           <TextInput
              value={this.state.msg}
              onChangeText={text => this.setState({msg: text})}
              //onChangeText={e => this.setState({msg: e.target.value})}
              style={styles.input}
              underlineColorAndroid= "transparent"
              placeholder= {"Type a message"}
           />
           <TouchableOpacity onPress={this.onSubmitmsg.bind(this)}>
              <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
          
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  rowText: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});
