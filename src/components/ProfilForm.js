import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, Modal, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, changeImage, uploadImage } from '../actions';

class ProfilForm extends Component {

    componentDidMount() {
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
       Actions.updateProfil({ user: this.props.user });
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
       this.props.changeImage(response.uri, response, true);
      }
    });
    }
    handleButtonUpload() {
        try {
            AsyncStorage.getItem('user').then((value) => {
                const user = JSON.parse(value);
                this.props.uploadImage(user.user._id, this.props.photo);
            }).done();
        } catch (e) {
            console.log('caught error', e);
        }
    }

    renderLoading() {
      if (this.props.loading === true) {
        return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                  <View style={styles.containerLoadingStyle}>
                    <View style={styles.containerLoadingModal}>
                      <ActivityIndicator size="large" />
                      <Text>  Chargement ...</Text>
                    </View>
                  </View>
                </Modal>
                );
      }
    }

  renderProfile() {
    const { colorGray } = styles;
    const { firstname, photo, lastname, email, adresse, phone, city, joueur } = this.props.user;
    const { attaque, defence, milieu, gardien, total, nbrPersonne } = this.props.skills;

    if (this.props.refresh === false) {
      return (
            <View>
                <UserCharacteristic imageUser={photo} display={this.props.show}
                  onClickImage={this.handleImage.bind(this)} onClickButtonUpload={this.handleButtonUpload.bind(this)}
                  total={total} userName={`${firstname} ${lastname}`} age={joueur.age} poids={joueur.poid} taille={joueur.taille}
                />

                    {this.renderLoading()}
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
      );
    }
    return <ActivityIndicator size="large" />;
  }

  render() {
    return (
        <ScrollView>
          {this.renderProfile()}
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
 },
 containerLoadingStyle: {
     position: 'relative',
     flex: 1,
     justifyContent: 'center'
 },
 containerLoadingModal: {
     backgroundColor: '#FFFFFF',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 30,
     marginLeft: 30,
     marginRight: 30
 }
};

const mapStateToProps = ({ userProfile }) => {
  const { user, skills, photo, show, loading, refresh } = userProfile;

  return { user, skills, photo, show, loading, refresh };
};

export default connect(mapStateToProps, { getUserById, getSkills, changeImage, uploadImage })(ProfilForm);
