import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ScrollView, RefreshControl, View, Modal, AsyncStorage, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import { Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';
import { getUserById, getSkills, changeImage, uploadImage } from '../actions';

class ProfilForm extends Component {

    componentDidMount() {
      this.onRefresh();
    }

    onRefresh() {
      try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              this.props.getUserById(user.user._id);
              this.props.getSkills(user.user._id);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
    }

    onButtonPressUpdate() {
       Actions.updateProfil({ user: this.props.user });
    }

    onButtonPressFriends() {
      Actions.listFriends();
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
                    <TouchableNativeFeedback onPress={this.onButtonPressUpdate.bind(this)}>
                      <View style={styles.buttonStyle}>
                        <Icon name='ios-contact-outline' style={colorGray} />
                        <Text style={colorGray}>
                          Modifier
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onButtonPressFriends.bind(this)}>
                      <View style={styles.buttonStyle}>
                        <Icon name='ios-people-outline' style={colorGray} />
                        <Text style={colorGray}>
                          Mes amis
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                </View>
                <UserSkills AC={attaque} DF={defence} MC={milieu} GB={gardien} nbrNote={nbrPersonne}disabled />
                <UserInfo city={city} adresse={adresse} position={joueur.poste} email={email} phone={phone} equipe={'--'} />
          </View>
      );
    }
  }

  render() {
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
            {this.renderProfile()}
          </ScrollView>
    );
  }
}
const styles = {
 containerButtonStyle: {
     flexDirection: 'row',
     justifyContent: 'center',
     marginBottom: 10
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
     color: '#616161',
     marginLeft: 10
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
