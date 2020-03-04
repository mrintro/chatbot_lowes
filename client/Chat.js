import React, { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");


class Chat extends Component {
  
  constructor() {
    super();
    this.state = { msg: "" };
  }

  onTextChange = e => {
    this.setState({ msg: e.target.value });
  };

  onMessageSubmit = () => {
    socket.emit("chat message", this.state.msg);
    this.setState({ msg: "" });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.onTextChange(e)} value={this.state.msg} />
        <button onClick={this.onMessageSubmit}>Send</button>
      </div>
    );
  }
}

export default Chat;