import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, AsyncStorage, ScrollView, RefreshControl, TouchableNativeFeedback } from 'react-native';
import { Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getSkills, getRelationship, deleteFriend, cancelInvitationFriend, addInvitationFriend, confirmInvitations, closeModal } from '../actions';
import { URL } from '../actions/api/config';

class SearchPlayerProfile extends Component {
  componentDidMount() {
    //close modal for click interssted page ListAdverts
    this.props.closeModal();
    this.onRefresh();
    this.props.navigationStateHandler.registerFocusHook(this);
  }
  componentWillUnmount() {
    this.props.navigationStateHandler.unregisterFocusHook(this);
  }

  onRefresh() {
    const { player } = this.props;
    try {
         AsyncStorage.getItem('user').then((value) => {
             const user = JSON.parse(value);
             this.props.getSkills(player._id);
             this.props.getRelationship(user.user._id, player._id);
         }).done();
       } catch (e) {
           console.log('caught error', e);
       }
  }

  onButtonPressNoter() {
      const { player } = this.props;
      const { nbrPersonne } = this.props.skills;
      Actions.playerNoteForm({ nbrPersonne, player, title: `${player.firstname} ${player.lastname}` });
  }

  onAddFriends() {
      try {
           AsyncStorage.getItem('user').then((value) => {
               const user = JSON.parse(value);
               this.props.addInvitationFriend(user.user._id, this.props.player._id, `${user.user.firstname} ${user.user.lastname}`, user.user.photo);
               this.props.socket.emit('invitation_friend', this.props.player._id);
           }).done();
         } catch (e) {
             console.log('caught error', e);
         }
  }

  onConfirmFriends() {
      const { data } = this.props.relationship;
      this.props.confirmInvitations(data._id, { idUser: data.to, friend: data.from });
  }

  onCancelInvitationFriends() {
      const { relationship } = this.props;
      this.props.cancelInvitationFriend(relationship.data._id);
  }

  onRemoveFriends() {
      const { relationship } = this.props;
      this.props.deleteFriend(relationship.data._id, { idUser: relationship.data.to, idFriend: relationship.data.from });
  }

  handleNavigationSceneFocus() {
    this.onRefresh();
  }

  renderButtonFriends() {
      const { relationship, player } = this.props;
      if (relationship.success === false) {
          return (<TouchableNativeFeedback onPress={this.onAddFriends.bind(this)}>
                      <View style={styles.buttonStyle}>
                        <Icon name='ios-person-add-outline' style={styles.colorGray} />
                        <Text style={styles.colorGray}>Ajouter</Text>
                      </View>
                  </TouchableNativeFeedback>);
      } else {
          if (relationship.data.accepted === true) {
              return (<TouchableNativeFeedback onPress={this.onRemoveFriends.bind(this)}>
                          <View style={styles.buttonStyle}>
                            <Icon name='ios-person-add-outline' style={styles.colorGray} />
                            <Text style={styles.colorGray}>{"Retirer de la liste d'amis"}</Text>
                          </View>
                      </TouchableNativeFeedback>);
          }else {
              if (relationship.data.from === player._id) {
                  return (<TouchableNativeFeedback onPress={this.onConfirmFriends.bind(this)}>
                              <View style={styles.buttonStyle}>
                                <Icon name='ios-person-add-outline' style={styles.colorGray} />
                                <Text style={styles.colorGray}>{"Confirmer l'invitation"}</Text>
                              </View>
                          </TouchableNativeFeedback>);
              } else {
                  return (<TouchableNativeFeedback onPress={this.onCancelInvitationFriends.bind(this)}>
                              <View style={styles.buttonStyle}>
                                <Icon name='ios-person-add-outline' style={styles.colorGray} />
                                <Text style={styles.colorGray}>{"Annuler l'invitation"}</Text>
                              </View>
                          </TouchableNativeFeedback>);
              }
          }
      }
  }


  render() {
    const { player } = this.props;
    const { attaque, defence, milieu, gardien, total, nbrPersonne } = this.props.skills;
    const uriImg = `${URL}/users/upload/${player.photo}`;
    return (
      <ScrollView
        refreshControl={
        <RefreshControl
          tintColor='blue'
          colors={['#64B5F6', '#2196F3', '#1976D2']}
          refreshing={this.props.refresh}
          onRefresh={this.onRefresh.bind(this)}
        />}
      >
        <View>
          <UserCharacteristic imageUser={uriImg} total={total} userName={`${player.firstname} ${player.lastname}`}
            age={player.joueur.age} poids={player.joueur.poid} taille={player.joueur.taille} onClickImage={() => {}} />
          <View style={styles.containerButtonStyle}>
              <TouchableNativeFeedback onPress={this.onButtonPressNoter.bind(this)}>
                <View style={styles.buttonStyle}>
                  <Icon name='ios-create-outline' style={styles.colorGray} />
                  <Text style={styles.colorGray}>Noter</Text>
                </View>
              </TouchableNativeFeedback>
              {this.renderButtonFriends()}
          </View>
          <UserSkills AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrNote={nbrPersonne} disabled />
          <UserInfo city={player.city} adresse={player.adresse} position={player.joueur.poste} email={player.email} phone={player.phone} equipe={(player.equipe === null || player.equipe === undefined) ? '--' : player.equipe.name} />
        </View>
      </ScrollView>
    );
  }
}
const styles = {
 containerButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
 },
 buttonStyle: {
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
 },
 colorGray: {
     color: '#616161',
     marginLeft: 10
 }
};
const mapStateToProps = ({ userProfile, homeDiscussion }) => {
  const { skills, relationship, refresh } = userProfile;
  const { socket } = homeDiscussion;
  return { skills, relationship, refresh, socket };
};
export default connect(mapStateToProps, { getSkills, getRelationship, deleteFriend, cancelInvitationFriend, addInvitationFriend, confirmInvitations, closeModal })(SearchPlayerProfile);
