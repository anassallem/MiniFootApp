import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { Button, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';
import { refuseRejoindreTeam, acceptRejoindreTeam, acceptedMatch, rejectMatch } from '../../actions';

const logoEquipe = require('../assets/logoEquipe.jpg');

class ItemTeamNotificationRejoindre extends Component {
  onClickName() {
      const { type, joinTeam, joinMatch } = this.props.notificationRejoindre;
      if (type === 'Match') {
          Actions.searchTeamProfile({ idEquipe: joinMatch.from._id, title: `${joinMatch.from.name}`, test: true });
      } else {
          Actions.searchPlayerProfile({ player: joinTeam.from, title: `${joinTeam.from.firstname} ${joinTeam.from.lastname}` });
      }
  }

  onClickAccept() {
      const { type, joinTeam, joinMatch, _id, to } = this.props.notificationRejoindre;
      if (type === 'Match') {
          this.props.acceptedMatch(joinMatch.match, _id);
      } else {
          this.props.acceptRejoindreTeam(_id, { idEquipe: to, idUser: joinTeam.from._id });
      }
  }

  onClickReject() {
      const { type, joinMatch, _id } = this.props.notificationRejoindre;
      if (type === 'Match') {
          this.props.rejectMatch(joinMatch.match, _id);
      } else {
          this.props.refuseRejoindreTeam(_id);
      }
  }
  renderImage() {
      const { type, joinTeam, joinMatch } = this.props.notificationRejoindre;
      console.log(this.props.notificationRejoindre);
      if (type === 'Match') {
          if (joinMatch.from.logo !== undefined) {
              const uriImg = `${URL}/equipe/teamUploads/${joinMatch.from.logo}`;
              return <Thumbnail source={{ uri: uriImg }} />;
          }
          return <Thumbnail source={logoEquipe} />;
      }
      const uriImg = `${URL}/users/upload/${joinTeam.from.photo}`;
      return <Thumbnail source={{ uri: uriImg }} />;
  }
  renderTitleNotification() {
    const { type, joinTeam, joinMatch, createdAt } = this.props.notificationRejoindre;
      if (type === 'Match') {
          return (
              <View>
                  <Text style={styles.styleTextPlayer}>{joinMatch.from.name}</Text>
                  <Text style={styles.styleTextDate}>{moment(createdAt).format('DD-MM-YYYY h:mm')}</Text>
              </View>
          );
      }
      return (
          <View>
              <Text style={styles.styleTextPlayer}>{`${joinTeam.from.firstname} ${joinTeam.from.lastname}`}</Text>
              <Text style={styles.styleTextDate}>{moment(createdAt).format('DD-MM-YYYY h:mm')}</Text>
          </View>
      );
  }
  renderBodyNotification() {
      const { type, joinTeam, joinMatch } = this.props.notificationRejoindre;
      if (type === 'Rejoindre') {
          if (joinTeam.accepted) {
              return <Text style={styles.styleText}>{`Vous avez accepté l'invitation de ${joinTeam.from.firstname} ${joinTeam.from.lastname} pour rejoindre l'équipe`}</Text>;
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
      } else {
          if (joinMatch.accepted) {
              return <Text style={styles.styleText}>{`Vous avez accepté l'invitation de ${joinMatch.from.name} pour jouer un match.`}</Text>;
              }
              return (
                  <View>
                      <Text style={styles.styleText}>Vous avez une invitation de jouer un match</Text>
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
  }

  render() {
      return (
        <ListItem avatar>
            <Left>
                {this.renderImage()}
            </Left>
            <Body>
                <TouchableNativeFeedback onPress={this.onClickName.bind(this)}>
                    {this.renderTitleNotification()}
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

export default connect(mapStateToProps, { refuseRejoindreTeam, acceptRejoindreTeam, acceptedMatch, rejectMatch })(ItemTeamNotificationRejoindre);
