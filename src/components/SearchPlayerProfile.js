import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, AsyncStorage, ScrollView } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getSkills, getRelationship, deleteFriend, cancelInvitationFriend, addInvitationFriend, confirmInvitations } from '../actions';
import { URL } from '../actions/api/config';

class SearchPlayerProfile extends Component {
  componentWillMount() {
    const { player } = this.props;
    try {
         AsyncStorage.getItem('user').then((value) => {
             const user = JSON.parse(value);
             if (user.user._id === player._id) {
               Actions.profil();
           } else {
               this.props.getSkills(player._id);
               this.props.getRelationship(user.user._id, player._id);
           }
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
               this.props.addInvitationFriend(user.user._id, this.props.player._id, { title: `${user.user.firstname} ${user.user.lastname}` });
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

  renderButtonFriends() {
      const { relationship, player } = this.props;
      if (relationship.success === false) {
          return (<Button iconLeft style={styles.buttonStyle} onPress={this.onAddFriends.bind(this)}>
                      <Icon name='ios-person-add-outline' style={styles.colorGray} />
                      <Text style={styles.colorGray}>Ajouter</Text>
                  </Button>);
      } else {
          if (relationship.data.accepted === true) {
              return (<Button iconLeft style={styles.buttonStyle} onPress={this.onRemoveFriends.bind(this)}>
                          <Icon name='ios-person-add-outline' style={styles.colorGray} />
                          <Text style={styles.colorGray}>{"Retirer de la liste d'amis"}</Text>
                      </Button>);
          }else {
              if (relationship.data.from === player._id) {
                  return (<Button iconLeft style={styles.buttonStyle} onPress={this.onConfirmFriends.bind(this)}>
                              <Icon name='ios-person-add-outline' style={styles.colorGray} />
                              <Text style={styles.colorGray}>{"Confirmer l'invitation"}</Text>
                          </Button>);
              } else {
                  return (<Button iconLeft style={styles.buttonStyle} onPress={this.onCancelInvitationFriends.bind(this)}>
                              <Icon name='ios-person-add-outline' style={styles.colorGray} />
                              <Text style={styles.colorGray}>{"Annuler l'invitation"}</Text>
                          </Button>);
              }
          }
      }
  }

  render() {
    const { player } = this.props;
    const { attaque, defence, milieu, gardien, total, nbrPersonne } = this.props.skills;
    const uriImg = `${URL}/users/upload/${player.photo}`;
    return (
      <ScrollView>
        <View>
          <UserCharacteristic imageUser={uriImg} total={total} userName={`${player.firstname} ${player.lastname}`}
            age={player.joueur.age} poids={player.joueur.poid} taille={player.joueur.taille} onClickImage={() => {}} />
          <View style={styles.containerButtonStyle}>
              <Button iconLeft style={styles.buttonStyle} onPress={this.onButtonPressNoter.bind(this)}>
                  <Icon name='ios-create-outline' style={styles.colorGray} />
                  <Text style={styles.colorGray}>Noter</Text>
              </Button>
              {this.renderButtonFriends()}
          </View>
          <UserSkills AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrNote={nbrPersonne} disabled />
          <UserInfo city={player.city} adresse={player.adresse} position={player.joueur.poste} email={player.email} phone={player.phone} equipe={'--'} />
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
    borderColor: '#FFF',
    backgroundColor: 'transparent'
 },
 colorGray: {
     color: '#616161'
 }
};
const mapStateToProps = ({ userProfile }) => {
  const { skills, relationship } = userProfile;
  return { skills, relationship };
};
export default connect(mapStateToProps, { getSkills, getRelationship, deleteFriend, cancelInvitationFriend, addInvitationFriend, confirmInvitations })(SearchPlayerProfile);
