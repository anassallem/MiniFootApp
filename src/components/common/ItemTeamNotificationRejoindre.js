import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Button, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';
import { refuseRejoindreTeam, acceptRejoindreTeam } from '../../actions';

const imagePlayer = require('../assets/logoEquipe.jpg');

class ItemTeamNotificationRejoindre extends Component {
  onClickName() {
      const { from } = this.props.notificationRejoindre;
      Actions.searchPlayerProfile({ player: from, title: `${from.firstname} ${from.lastname}` });
  }

  onClickAccept() {
      const { from, to, _id } = this.props.notificationRejoindre;
      this.props.acceptRejoindreTeam(_id, { idEquipe: to, idUser: from._id });
  }

  onClickReject() {
      this.props.refuseRejoindreTeam(this.props.notificationRejoindre._id);
  }
  renderImagePlayer() {
      const { from } = this.props.notificationRejoindre;
      if (from.photo !== undefined) {
          const uriImg = `${URL}/users/upload/${from.photo}`;
          return <Thumbnail source={{ uri: uriImg }} />;
      }
      return <Thumbnail source={imagePlayer} />;
  }

  renderBodyNotification() {
      const { from } = this.props.notificationRejoindre;
      if (this.props.notificationRejoindre.accepted) {
          return <Text style={styles.styleText}>{`Vous avez accepté l'invitation de ${from.firstname} ${from.lastname} pour rejoindre l'équipe`}</Text>;
      }
      return (
          <View>
              <Text style={styles.styleText}>Vous avez une invitation de rejoindre votre équipe</Text>
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
      const { notificationRejoindre } = this.props;
      return (
        <ListItem avatar>
            <Left>
                {this.renderImagePlayer()}
            </Left>
            <Body>
                <TouchableNativeFeedback onPress={this.onClickName.bind(this)}>
                    <View>
                        <Text style={styles.styleTextPlayer}>{`${notificationRejoindre.from.firstname} ${notificationRejoindre.from.lastname}`}</Text>
                        <Text style={styles.styleTextDate}>{moment(notificationRejoindre.createdAt).format('DD-MM-YYYY h:mm')}</Text>
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

const mapStateToProps = ({ notificationRejoindreTeam }) => {
  const { notificationsRejoindre } = notificationRejoindreTeam;
  return { notificationsRejoindre };
};

export default connect(mapStateToProps, { refuseRejoindreTeam, acceptRejoindreTeam })(ItemTeamNotificationRejoindre);
