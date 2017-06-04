import React, { Component } from 'react';
import { AsyncStorage, Modal, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { UserSkillsFull } from './common';
import { changeRatingAttaque, changeRatingDefence, changeRatingMilieu, changeRatingGardien, addSkills } from '../actions';

class PlayerNoteForm extends Component {

  handelEnvoyerSkills() {
    try {
           AsyncStorage.getItem('user').then((value) => {
               const user = JSON.parse(value);
               const { attaque, defence, milieu, gardien } = this.props;
               const skills = { attaque, defence, milieu, gardien };
               this.props.addSkills(this.props.player._id, skills, user.user._id);
           }).done();
         } catch (e) {
             console.log('caught error', e);
         }
  }

  handelRatingAC(rating) {
    this.props.changeRatingAttaque(rating);
  }

  handelRatingDF(rating) {
    this.props.changeRatingDefence(rating);
  }

  handelRatingMC(rating) {
    this.props.changeRatingMilieu(rating);
  }

  handelRatingGB(rating) {
    this.props.changeRatingGardien(rating);
  }

  renderEnvoyerSkills() {
    if (this.props.loading === true) {
      return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                <View style={styles.containerStyle}>
                  <View style={styles.containerModal}>
                    <ActivityIndicator size="large" />
                    <Text>  Chargement ...</Text>
                  </View>
                </View>
              </Modal>
              );
    }
  }

  render() {
    const { attaque, defence, milieu, gardien, nbrPersonne } = this.props;
    return (
      <Container>
        <Content style={{ marginTop: 50 }}>
          <UserSkillsFull AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrNote={nbrPersonne} disabled={false}
            envoyerSkills={this.handelEnvoyerSkills.bind(this)}
            changeRatingAC={this.handelRatingAC.bind(this)}
            changeRatingDF={this.handelRatingDF.bind(this)}
            changeRatingMC={this.handelRatingMC.bind(this)}
            changeRatingGB={this.handelRatingGB.bind(this)}
          />
          {this.renderEnvoyerSkills()}
        </Content>
      </Container>
    );
  }
}
const styles = {
  containerStyle: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'gray'
  },
  containerModal: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      marginLeft: 30,
      marginRight: 30
  }
};
const mapStateToProps = ({ notePlayer }) => {
  const { attaque, defence, milieu, gardien, loading } = notePlayer;
  return { attaque, defence, milieu, gardien, loading };
};
export default connect(mapStateToProps, { changeRatingAttaque, changeRatingDefence, changeRatingMilieu, changeRatingGardien, addSkills })(PlayerNoteForm);
