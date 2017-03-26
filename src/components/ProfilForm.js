import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableNativeFeedback, Modal, AsyncStorage } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, changeImage, openModal, closeModal, uploadImage } from '../actions';

class ProfilForm extends Component {

    componentWillMount() {
      this.props.getUserById();
      try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              this.props.getSkills(user.user._id);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
    }

    onButtonPressUpdate() {
      this.props.openModal();
    }
    onCloseModal() {
      this.props.closeModal();
    }
    onButtonPressFrinds() {
    }
    handleImage() {
      ImagePicker.showImagePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
       console.log('User cancelled image picker');
      }
      else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
      }
      else {
       this.props.changeImage(response.uri, response.path, true);
      }
    });
    }
    handleButtonUpload() {
      this.props.uploadImage(this.props.photo);
    }

  render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
      const { firstname, photo, lastname, email, adresse, phone, city, joueur } = this.props.user;
      const { attaque, defence, milieu, gardien, total, nbrPersonne } = this.props.skills;

    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={photo} display={this.props.show}
                  onClickImage={this.handleImage.bind(this)} onClickButtonUpload={this.handleButtonUpload.bind(this)}
                  total={total} userName={`${firstname} ${lastname}`} age={joueur.age} poids={joueur.poid} taille={joueur.taille}
                />
                    <Modal
                      animationType={'slide'}
                      transparent
                      visible={this.props.modalchange}
                      onRequestClose={() => {}}
                    >
                          <View style={containerStyle}>
                            <View style={closeButton}>
                              <TouchableNativeFeedback onPress={this.onCloseModal.bind(this)}>
                                  <Icon name="ios-close-circle-outline" />
                              </TouchableNativeFeedback>
                            </View>
                            <View style={containerModal}>
                              <Text style={styleTextModal}> Modifier votre profile </Text>
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

                <UserSkills AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrNote={nbrPersonne}disabled />
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
  const { user, skills, modalchange, photo, show } = userProfile;

  return { user, skills, modalchange, photo, show };
};

export default connect(mapStateToProps, { getUserById, getSkills, changeImage, openModal, closeModal, uploadImage })(ProfilForm);
