import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, AsyncStorage, ScrollView } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getSkills } from '../actions';
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

  onButtonPressFrinds() {
  }

  render() {
    const { player } = this.props;
    const { attaque, defence, milieu, gardien, total, nbrPersonne } = this.props.skills;
    const uriImg = `${URL}/users/upload/${player.photo}`;
    return (
      <ScrollView>
        <View>
          <UserCharacteristic imageUser={uriImg} total={total} userName={`${player.firstname} ${player.lastname}`} age={player.joueur.age} poids={player.joueur.poid} taille={player.joueur.taille} />
          <View style={styles.containerButtonStyle}>
              <Button iconLeft style={styles.buttonStyle} onPress={this.onButtonPressNoter.bind(this)}>
                  <Icon name='ios-create-outline' style={styles.colorGray} />
                  <Text style={styles.colorGray}>Noter</Text>
              </Button>
              <Button iconLeft style={styles.buttonStyle} onPress={this.onButtonPressFrinds.bind(this)}>
                  <Icon name='ios-person-add-outline' style={styles.colorGray} />
                  <Text style={styles.colorGray}>Ajouter</Text>
              </Button>
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
  const { skills } = userProfile;
  return { skills };
};
export default connect(mapStateToProps, { getSkills })(SearchPlayerProfile);
