import React, { Component } from 'react';
import { View, TouchableNativeFeedback, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Button, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';
import { deleteNotification, acceptNotification } from '../../actions';

const logoEquipe = require('../assets/logoEquipe.jpg');

class ItemPlayerNotification extends Component {
  onClickName() {
      const { from } = this.props.notification.rejoin;
      try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              if (user.user.equipe === from._id) {
                  Actions.profileEquipe({ idEquipe: from._id });
              } else if (user.user.equipe === undefined) {
                  Actions.searchTeamProfile({ idEquipe: from._id, title: `${from.name}` });
              } else {
                  Actions.searchTeamProfile({ idEquipe: from._id, title: `${from.name}`, test: true });
              }
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
      //Actions.searchPlayerProfile({ player: from, title: `${from.firstname} ${from.lastname}` });
  }
  onClickAccept() {
      const { _id, rejoin } = this.props.notification;
      try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              if (user.user.equipe === undefined || user.user.equipe === null) {
                   this.props.acceptNotification(_id, { idUser: rejoin.to, idEquipe: rejoin.from._id });
              } else {
                  Alert.alert('Attention', "Vous devez quitter votre équipe avant l'accepter");
              }
        }).done();
      } catch (e) {
          console.log('caught error', e);
      }
  }
  onClickReject() {
      this.props.deleteNotification(this.props.notification._id);
  }
  renderImage() {
      const { from } = this.props.notification.rejoin;
      if (from.logo !== undefined) {
          const uriImg = `${URL}/equipe/teamUploads/${from.logo}`;
          return <Thumbnail source={{ uri: uriImg }} />;
      }
      return <Thumbnail source={logoEquipe} />;
  }
  renderBodyNotification() {
      if (this.props.notification.rejoin.accepted) {
          return <Text style={styles.styleText}>{"Vous acceptez l'invitation de rejoindre l'équipe"}</Text>;
      }
      return (
          <View>
              <Text style={styles.styleText}>Vous a envoyé une invitation de rejoindre son équipe</Text>
              <View style={styles.containerButtons}>
                  <Button bordered success style={styles.styleButton} onPress={this.onClickAccept.bind(this)}>
                      <Text>Accepter</Text>
                  </Button>
                  <Button bordered danger style={styles.styleButton} onPress={this.onClickReject.bind(this)}>
                      <Text>Refuser</Text>
                  </Button>
              </View>
          </View>
      );
  }
  render() {
      const { notification } = this.props;
      return (
        <ListItem avatar>
            <Left>
                {this.renderImage()}
            </Left>
            <Body>
                <TouchableNativeFeedback onPress={this.onClickName.bind(this)}>
                    <View>
                        <Text style={styles.styleTextPlayer}>{notification.rejoin.from.name}</Text>
                        <Text style={styles.styleTextDate}>{moment(notification.createdAt).format('DD-MM-YYYY h:mm')}</Text>
                    </View>
                </TouchableNativeFeedback>
                {this.renderBodyNotification()}
            </Body>
        </ListItem>
    );
  }
}
const styles = {
  containerButtons: {
    flexDirection: 'row'
  },
  styleButton: {
    marginRight: 10,
    height: 30
  },
  styleText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5
  },
  styleTextPlayer: {
    color: '#2962FF'
  },
  styleTextDate: {
      fontSize: 12
  }
};

const mapStateToProps = ({ notification }) => {
  const { notifications } = notification;
  return { notifications };
};

export default connect(mapStateToProps, { deleteNotification, acceptNotification })(ItemPlayerNotification);
