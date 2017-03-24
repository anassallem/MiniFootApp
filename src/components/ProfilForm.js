import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableNativeFeedback, Modal } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, changeImage, openModal } from '../actions';
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
      this.state = { photo: null };
    }

    componentWillMount() {
      this.props.getUserById();
      console.log(this.props.user);
      this.props.getSkills();
    }

    onButtonPressUpdate() {
        this.props.openModal()
    }
    onButtonPressFrinds() {
    }

    onTextChangePhoto() {
        ImagePicker.showImagePicker(null, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
         console.log('User cancelled image picker');
        }
        else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
        }
        else {
         let source = { uri: response.uri };
         console.log(response.uri);
         this.setState({
           photo: source,
           modalVisible: false
         });
        }
      });
    }

  render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
      const { firstname, photo, lastname, email, adresse, phone, city, joueur } = this.props.user;
      const { attaque, defence, milieu, gardien, total } = this.props.skills;
      const urlimg = `${URL}/users/upload/${photo}`;
    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={this.state.photo} total={total} userName={`${firstname} ${lastname}`} age={joueur.age} poids={joueur.poid} taille={joueur.taille} />
                    <Modal
                      animationType={'slide'}
                      transparent
                      visible={this.props.modalchange}
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
  const { user, skills, modalchange } = userProfile;

  return { user, skills, modalchange };
};

export default connect(mapStateToProps, { getUserById, getSkills, openModal })(ProfilForm);
