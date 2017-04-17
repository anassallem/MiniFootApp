import React, { Component } from 'react';
import { View, Image, Dimensions, Text, AsyncStorage, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeRoomToVue } from '../../actions';
import { URL } from '../../actions/api/config';

class ItemDiscussion extends Component {

    onPressButton() {
        const { users } = this.props.room;
        try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              const me = { idUser: user.user._id, firstname: user.user.firstname, lastname: user.user.lastname, photo: user.user.photo };
              if ((this.props.idUser === this.props.room.user._id)) {
                  Actions.chat({ user: me, mySocket: this.props.mySocket, room: this.props.room, title: `${users[0].firstname} ${users[0].lastname}` });
              } else if ((this.props.idUser !== this.props.room.user._id) && this.props.room.vue === 1) {
                  Actions.chat({ user: me, mySocket: this.props.mySocket, room: this.props.room, title: `${users[0].firstname} ${users[0].lastname}` });
              } else {
                  this.props.changeRoomToVue(me, this.props.mySocket, this.props.room, `${users[0].firstname} ${users[0].lastname}`);
              }
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }
    renderImageIcon() {
        const { user, vue } = this.props.room;
        if (user !== undefined) {
            const uriImg = `${URL}/users/upload/${user.avatar}`;
            if (vue === 1 && (user._id !== this.props.idUser)) {
                return <Image style={styles.styleImageIcon} source={{ uri: uriImg }} />;
            }
        }
    }
    renderItem() {
        const { firstname, lastname, photo } = this.props.room.users[0];
        const { message, createdAt, vue, user } = this.props.room;
        if (firstname !== undefined || lastname !== undefined || user !== undefined) {
            const uriImg = `${URL}/users/upload/${photo}`;
            return (
                <TouchableNativeFeedback onPress={this.onPressButton.bind(this)} style={styles.mainContainer}>
                  <View style={(vue === 1 || (user._id === this.props.idUser)) ? styles.bodyContainer : styles.bodyContainerNotVue}>
                      <Image style={styles.styleImage} source={{ uri: uriImg }} />
                      <View style={styles.textContainer}>
                          <View style={styles.textTop}>
                              <View style={styles.styleTextPerson}>
                                  <Text style={styles.titleStyle}>{`${firstname} ${lastname}`}</Text>
                              </View>
                              <Text style={(vue === 1 || (user._id === this.props.idUser)) ? styles.textDateStyle : styles.textDateStyleNotVue}>
                                  {moment(createdAt).fromNow()}
                              </Text>
                          </View>
                          <View style={styles.containerMessage}>
                              <Text numberOfLines={1} style={(vue === 1 || (user._id === this.props.idUser)) ? styles.styleMessage : styles.styleMessageNotVue}>
                                  {message}
                              </Text>
                              {this.renderImageIcon()}
                          </View>
                      </View>
                  </View>
                </TouchableNativeFeedback>
            );
        }
    }
    render() {
        return (
          <View>
              {this.renderItem()}
          </View>
        );
    }
}
const { width } = Dimensions.get('window');
const styles = {
  mainContainer: {
    width,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3'
  },
  bodyContainerNotVue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#EEEEEE'
  },
  styleImage: {
    height: 54,
    width: 54,
    borderRadius: 27,
    margin: 10
  },
  textContainer: {
    flex: 1
  },
  styleTextPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  containerMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginRight: 30
  },
  styleMessage: {
    fontSize: 13,
    color: '#333',
    fontWeight: '400'
  },
  styleMessageNotVue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '700'
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: 12
  },
  textTop: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textDateStyle: {
    fontWeight: '500',
    fontSize: 11,
    marginRight: 10,
    color: '#666'
  },
  textDateStyleNotVue: {
    fontWeight: '700',
    fontSize: 11,
    marginRight: 10,
    color: '#333'
  },
  styleImageIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE'
  }
};
const mapStateToProps = ({ discussionPlayer }) => {
  const { mySocket, idUser } = discussionPlayer;
  return { mySocket, idUser };
};
export default connect(mapStateToProps, { changeRoomToVue })(ItemDiscussion);
