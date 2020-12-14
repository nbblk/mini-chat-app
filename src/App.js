import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    username: '',
    isSubmitted: false,
    message: ''
  }

  submitHandler(event) {
    event.preventDefault();
    if (this.state.username) {
      localStorage.setItem('username', event.target.value);
      this.setState({ isSubmitted: true });
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
    // request to server
  }

  render () {
    let element = null;
    if (this.state.isSubmitted) {
      element = <section data-testid="chat" className="chat">
      <form aria-label="form" onSubmit={(event) => this.enterHandler(event)}>
        <textarea></textarea>
        <input type="text" data-testid="chat-text" placeholder="Enter a message" onChange={(event) => this.messageHandler()}/>
        <button type="submit">Enter</button>
      </form>
      </section>
    } else {
      element = <section data-testid="landing" className="landing">
      <h1>Welcome to chatty!</h1>
      <form aria-label="form" onSubmit={(event) => this.submitHandler(event)}>
      {!this.state.username ? <small role="alert" style={{'color': 'red'}}>Please enter a username</small> : null }
      <input type="text" data-testid="landing-text" placeholder="Enter a username" onChange={(event) => this.inputChangeHandler(event)}/>
      <button type="submit">Submit</button></form>
      </section>
    }
    return <div className="App">{element}</div>
  }
}

export default App;
