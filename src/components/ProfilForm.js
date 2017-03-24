import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { ScrollView, View, TouchableNativeFeedback, Modal } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, openModal } from '../actions';

const imageUser = require('./assets/userdefault.png');

var options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
  let age = '---';
  let taille = '---';
  let poste = 'Ajouter votre position sur le terrain';
  let poid = '---';

class ProfilForm extends Component {
    constructor(props) {
      super(props);
  //    this.state = { modalVisible: false };
      this.state = { photo: null };
    }

    componentWillMount() {
      this.props.getUserById();
      console.log(this.props.user);
      this.props.getSkills();

    }

    componentWillReceiveProps(nextProps) {
        age === undefined ? age : nextProps.user.joueur.age;
        taille === undefined ? taille : nextProps.user.joueur.taille;
        poste === undefined ? poste : nextProps.user.joueur.poste;
        poid === undefined ? poid : nextProps.user.joueur.poid;
    }
    onButtonPressUpdate() {
        this.props.openModal()
    }
    onButtonPressFrinds() {
    }

    onTextChangePhoto() {
      // Open Image Library:
    // ImagePicker.launchImageLibrary(noData:null, (this.setImage));
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
       // You can also display the image using data:
       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
       this.setState({
         photo: source,
         modalVisible: false
       });
      }
      });
  }

  render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
      let { phone, city } = this.props.user;
      phone !== undefined ? phone : phone = 'Ajouter votre numéro de téléphone';
      city !== undefined ? city : city = 'Ajouter votre ville';
      const { attaque, defence, milieu, gardien, total } = this.props.skills;

    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={this.state.photo} total={total} userName={this.props.user.firstname + ' ' + this.props.user.lastname} age={age} poids={poid} taille={taille} />
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
  const { user, skills, modalchange } = userProfile;

  return { user, skills, modalchange };
};

export default connect(mapStateToProps, { getUserById, getSkills, openModal })(ProfilForm);
