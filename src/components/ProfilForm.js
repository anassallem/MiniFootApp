import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableNativeFeedback, Modal } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills } from '../actions';

const imageUser = require('./assets/userdefault.png');

  let age = '---';
  let taille = '---';
  let poste = 'Ajouter votre position sur le terrain';
  let poid = '---';

class ProfilForm extends Component {
    constructor(props) {
      super(props);
      this.state = { modalVisible: false };
    }
    componentWillMount() {
      this.props.getUserById();
      this.props.getSkills();
    }
    componentWillReceiveProps(nextProps) {
        age === undefined ? age : nextProps.user.joueur.age;
        taille === undefined ? taille : nextProps.user.joueur.taille;
        poste === undefined ? poste : nextProps.user.joueur.poste;
        poid === undefined ? poid : nextProps.user.joueur.poid;
    }
    onButtonPressUpdate() {
        this.setState({ modalVisible: true });
    }
    onButtonPressFrinds() {

    }
  render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
      let { phone, city } = this.props.user;
      phone !== undefined ? phone : phone = 'Ajouter votre numéro de téléphone';
      city !== undefined ? city : city = 'Ajouter votre ville';
      let { attaque, defence, milieu, gardien, total } = this.props.skills;

    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={imageUser} total={total} userName={this.props.user.firstname + ' ' + this.props.user.lastname} age={age} poids={poid} taille={taille} />
                    <Modal
                      animationType={'slide'}
                      transparent
                      visible={this.state.modalVisible}
                      onRequestClose={() => {}}
                    >
                          <View style={containerStyle}>
                            <View style={closeButton}>
                              <TouchableNativeFeedback onPress={() => { this.setState({ modalVisible: false }); }}>
                                  <Icon name="ios-close-circle-outline" />
                              </TouchableNativeFeedback>
                            </View>
                            <View style={containerModal}>
                              <Text style={styleTextModal}> Modifier votre profile </Text>
                              <Text style={styleTextModal}> Changer votre photo de profile</Text>
                              <Text style={styleTextModal}> Changer votre mot de passe </Text>
                            </View>
                          </View>
                    </Modal>
                <View style={styles.containerButtonStyle}>
                    <Button iconLeft style={styles.buttonStyle} onPress={this.onButtonPressUpdate.bind(this)}>
                        <Icon name='ios-contact-outline' style={colorGray} />
                        <Text style={colorGray}>
                          Modifier
                        </Text>
                    </Button>
                    <Button iconLeft style={styles.buttonStyle} onPress={this.onButtonPressFrinds.bind(this)}>
                        <Icon name='ios-people-outline' style={colorGray} />
                        <Text style={colorGray}>
                          Mes amis
                        </Text>
                    </Button>
                </View>
                <UserSkills AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrAC={20} nbrDF={15} nbrMC={30} nbrGB={8} disabled />
                <UserInfo city={city} adresse={this.props.user.adresse} position={poste} email={this.props.user.email} phone={phone} equipe={'--'} />
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
 containerStyle: {
     backgroundColor: 'rgba(0, 0, 0, 0.75)',
     position: 'relative',
     flex: 1,
     justifyContent: 'center',
 },
 containerModal: {
     backgroundColor: '#FFFFFF',
     marginLeft: 30,
     marginRight: 30,
     paddingLeft: 30,
     paddingRight: 30,
     borderBottomLeftRadius: 15,
     borderBottomRightRadius: 15
 },
 closeButton: {
     justifyContent: 'flex-end',
     alignItems: 'flex-end',
     marginRight: 30,
     marginLeft: 30,
     backgroundColor: '#FFFFFF',
     paddingRight: 8,
     paddingTop: 8,
     borderTopLeftRadius: 15,
     borderTopRightRadius: 15
 },
 styleTextModal: {
     color: '#616161',
     marginBottom: 30,
 },
 colorGray: {
     color: '#616161'
 }
};

const mapStateToProps = ({ userProfile }) => {
  const { user, skills } = userProfile;

  return { user, skills };
};

export default connect(mapStateToProps, { getUserById, getSkills })(ProfilForm);
