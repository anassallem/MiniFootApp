import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableNativeFeedback, Modal } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, changeImage } from '../actions';
import { URL } from '../actions/api/config';

const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ProfilForm extends Component {
    constructor(props) {
      super(props);
      this.state = { modalVisible: false };
    }
    componentWillMount() {
      this.props.getUserById();
      this.props.getSkills();
    }

    onButtonPressUpdate() {
        this.setState({ modalVisible: true });
    }
    onButtonPressFrinds() {
    }

    onTextChangePhoto() {

    }
    setImage(response) {
       console.log('Response = ', response);

       if (response.didCancel) {
         console.log('User cancelled photo picker');
       }
       else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       }
       else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       }
       else {
         const source = { uri: response.uri, isStatic: true };
         //console.log(source);
         this.props.changeImage(source);
       }
    }

   render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
      const { firstname, photo, lastname, email, adresse, phone, city, joueur } = this.props.user;
      const { attaque, defence, milieu, gardien, total } = this.props.skills;
      console.log(photo);
      const urlimg = `${URL}/users/upload/${photo}`;
    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={urlimg} total={total} userName={`${firstname} ${lastname}`} age={joueur.age} poids={joueur.poid} taille={joueur.taille} />
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
                              <Text style={styleTextModal} onPress={this.onTextChangePhoto.bind(this)}> Changer votre photo de profile </Text>
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
                <UserInfo city={city} adresse={adresse} position={joueur.poste} email={email} phone={phone} equipe={'--'} />
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
  const { user, skills, photo } = userProfile;

  return { user, skills, photo };
};

export default connect(mapStateToProps, { getUserById, getSkills, changeImage })(ProfilForm);
