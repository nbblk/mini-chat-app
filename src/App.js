import React, { Component } from 'react';

import './App.css';

var connection = new WebSocket('ws://localhost:3001');

class App extends Component {
  state = {
    username: '',
    isSubmitted: false,
    message: '',
    messages: []
  }
  
  submitHandler(event) {
    event.preventDefault();
    if (this.state.username) {
      localStorage.setItem('username', this.state.username);
      this.setState({ isSubmitted: true, username: '' });
    }
  }

  inputChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  messageHandler(event) {
    this.setState({ message: event.target.value });
  }

  enterHandler(event) {
    event.preventDefault();
    this.setState({ message: '' });
    connection.send(JSON.stringify({ username: localStorage.getItem('username'), message: this.state.message}));   
  }

  addMessage(message) { 
    this.setState({ messages: [message, ...this.state.messages]});
  }

  componentDidMount() {
   connection.onmessage = (event) => {
      this.addMessage(JSON.parse(event.data));
    }

    connection.onclose = () => {
      console.log('Connection is disconnected');
    }
  }


  render () {
    let element = null;
    if (this.state.isSubmitted) {
      element = (
      <section data-testid="chat" className="chat">
        <form aria-label="form" onSubmit={(event) => this.enterHandler(event)}>
          <div data-testid="chatbox" className="chatbox">
            {this.state.messages.map((message, index) => { return <div data-testid="message" key={index}>
                <b className="username">{message.username}</b>
                <p className="message">{message.message}</p>
                </div>})}
          </div>
          <input type="text" data-testid="chat-text" placeholder="Enter a message" onChange={(event) => this.messageHandler(event)} value={this.state.message || ''}/>
          <button type="submit">Enter</button>
        </form>
      </section>)
    } else {
      element = (
      <section data-testid="landing" className="landing">
        <h1>Welcome to chatty!</h1>
        <form aria-label="form" onSubmit={(event) => this.submitHandler(event)}>
          {!this.state.username ? <small role="alert" style={{'color': 'red'}}>Please enter a username</small> : null }
          <input type="text" data-testid="landing-text" placeholder="Enter a username" onChange={(event) => this.inputChangeHandler(event)}/>
          <button type="submit">Submit</button>
        </form>
      </section>)
    }
    return <div className="App">{element}</div>
  }
}

export default App;
