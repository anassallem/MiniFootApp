import React, { Component } from 'react';
import { GiftedChat, Bubble, Send, Composer, LoadEarlier } from 'react-native-gifted-chat';
import { View } from 'react-native';
import { URL } from '../actions/api/config';
import { loadMessagesRoom } from '../actions/api/RoomsApi';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [],
                   loadEarlier: true,
                   isLoadingEarlier: false,
                   page: 0,
                };
    this.onSend = this.onSend.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isMounted = false;
  }

  componentWillMount() {
    this._isMounted = true;
    loadMessagesRoom(this.props.room._id, this.state.page).then((res) => {
        if (res.length > 0) {
            res.forEach((message) => {
                message.user.avatar = `${URL}/users/upload/${message.user.avatar}`;
            });
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.prepend(previousState.messages, res),
                    page: previousState.page + 1
                };
            });
        } else {
            this.setState({ loadEarlier: false });
        }
    }, (err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.props.mySocket.on(this.props.room._id, (data) => {
    if (data.user._id !== this.props.user.idUser) {
        data.user.avatar = `${URL}/users/upload/${data.user.avatar}`;
        setTimeout(() => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, data)
                };
            });
        }, 500);
    }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSend(messages = []) {
      messages.forEach((message) => {
          message.idRoom = this.props.room._id;
          this.props.mySocket.emit(this.props.room._id, message);
      });
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }

  onLoadEarlier() {
    this.setState({ isLoadingEarlier: true });
    setTimeout(() => {
         if (this._isMounted === true) {
            loadMessagesRoom(this.props.room._id, this.state.page).then((res) => {
                if (res.length > 0) {
                    res.forEach((message) => {
                         message.user.avatar = `${URL}/users/upload/${message.user.avatar}`;
                    });
                    this.setState((previousState) => {
                        return {
                          messages: GiftedChat.prepend(previousState.messages, res),
                          isLoadingEarlier: false,
                          loadEarlier: true,
                          page: previousState.page + 1
                        };
                      });
                } else {
                    this.setState({ isLoadingEarlier: false, loadEarlier: false });
                }
            }, (err) => {
              console.log(err);
            });
        }
    }, 1000);
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }
  renderSend(props) {
    return <Send {...props} label={'Envoyer'} />;
  }
  renderComposer(props) {
    return <Composer {...props} placeholder={'Tapez votre message'} />;
  }
  renderLoadEarlier(props) {
    return <LoadEarlier {...props} label='charger vos messages' />;
  }
  render() {
    const { idUser, firstname, lastname, photo } = this.props.user;
    return (
        <View style={{ flex: 1, marginTop: 56 }}>
                <GiftedChat
                  messages={this.state.messages}
                  onSend={this.onSend}
                  isLoadingEarlier={this.state.isLoadingEarlier}
                  onLoadEarlier={this.onLoadEarlier}
                  loadEarlier={this.state.loadEarlier}
                  renderBubble={this.renderBubble}
                  renderSend={this.renderSend}
                  renderComposer={this.renderComposer}
                  renderLoadEarlier={this.renderLoadEarlier}
                  user={{
                    _id: idUser,
                    name: `${firstname} ${lastname}`,
                    avatar: photo,
                  }}
                />
        </View>

    );
  }
}

export default Chat;
