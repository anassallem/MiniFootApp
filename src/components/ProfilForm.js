import React, { Component } from 'react';
import { ScrollView, View, TouchableNativeFeedback, Modal } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { UserCharacteristic, UserSkills, UserInfo } from './common';

const imageUser = require('./assets/userdefault.png');

class ProfilForm extends Component {
    constructor(props) {
      super(props);
      this.state = { modalVisible: false };
    }
    onButtonPressUpdate() {
        this.setState({ modalVisible: true });
    }
    onButtonPressFrinds() {

    }
  render() {
      const { containerStyle, containerModal, closeButton, colorGray, styleTextModal } = styles;
    return (
        <ScrollView>
            <View>
                <UserCharacteristic imageUser={imageUser} userName={'user name'} age={25} poids={80} taille={160} />
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
                <UserSkills AC={3} DF={1.5} MC={4} GB={1} nbrAC={20} nbrDF={15} nbrMC={30} nbrGB={8} disabled />
                <UserInfo city={'sousse'} position={'attaquant'} email={'exemple@gmail.com'} phone={22000000} equipe={'-'} />
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

export default ProfilForm;
