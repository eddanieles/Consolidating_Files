import React, { Component } from 'react';
import Chat from '../components/Chat';
import base from '../config/base';

class ChatContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: [],
      loading: true
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }
  componentDidMount () {
    this.rebaseRef = base.syncState('messages', {
      context: this,
      state: 'messages',
      asArray: true,
      then(){
        this.setState({loading: false})
      }
    })
  }
  componentWillUnmount () {
    base.removeBinding(this.rebaseRef)
  }
  handleAddItem (newItem) {
    this.setState({
      messages: this.state.messages.concat([newItem])
    })
  }
  handleRemoveItem (index) {
    let newList = this.state.messages;
    newList.splice(index, 1);
    this.setState({
      messages: newList
    })
  }
  render () {
    return (
      <Chat
        handleAddItem={this.handleAddItem}
        handleRemoveItem={this.handleRemoveItem}
        messages={this.state.messages}
        loading={this.state.loading} />
    )
  }
}
export default ChatContainer;
