import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { Thumbnail, Icon } from 'native-base';
import { connect } from 'react-redux';
import { getIdRoom } from '../../actions';
import { URL } from '../../actions/api/config';

class ItemPlayerConnect extends Component {
    onPressButton() {
      try {
        AsyncStorage.getItem('user').then((value) => {
            const user = JSON.parse(value);
            const me = { idUser: user.user._id, firstname: user.user.firstname, lastname: user.user.lastname, photo: user.user.photo };
            this.props.getIdRoom(me, this.props.player, this.props.socket);
        }).done();
      } catch (e) {
        console.log('caught error', e);
      }
    }

    render() {
        const { firstname, lastname, email, photo } = this.props.player;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
          <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Thumbnail style={styles.styleImage} source={{ uri: uriImg }} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.titleStyle}>{`${firstname} ${lastname}`}</Text>
                        <Text style={styles.textStyle}>{email}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <Icon name={'ios-radio-button-on-outline'} style={styles.styleIcon} />
                </View>
            </View>
          </TouchableNativeFeedback>
        );
    }
}

const styles = {
  mainContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  styleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10
  },
  bodyContainer: {
    flexDirection: 'column',
    padding: 8
  },
  titleStyle: {
    color: '#000000',
    marginLeft: 10
  },
  textStyle: {
    color: '#607D8B',
    marginLeft: 10,
    fontSize: 12
  },
  styleIcon: {
    color: 'green',
    justifyContent: 'flex-end',
    marginRight: 10,
    fontSize: 16,
  },
  textConnectStyle: {
    color: 'green',

  }
};
const mapStateToProps = ({ homeDiscussion }) => {
  const { socket } = homeDiscussion;
  return { socket };
};
export default connect(mapStateToProps, { getIdRoom })(ItemPlayerConnect);
