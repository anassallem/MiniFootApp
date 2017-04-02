import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, TouchableWithoutFeedback, View, LayoutAnimation, Alert, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Text, Header, Right, Body, Title } from 'native-base';
import { userUpdate, phoneChanged, updateUserProfil, onchangeCardInfo, onchangeCardCarac, onchangeCardPassword,
        passwordUpdateChanged, updateUserPassword, confirmNewPassword, updateUserPost, joueurUpdate
       } from '../actions';
import { CardSection, UpdateUserInfo, UpdateUserPasswordd, UpdateUserCharacteristic } from './common';


class UpdateProfilUser extends Component {

  componentWillMount() {
    _.each(this.props.user, (value, prop) => {
      if (prop !== 'password') {
        this.props.userUpdate({ prop, value });
      }
    });
    _.each(this.props.user.joueur, (value, prop) => {
      this.props.joueurUpdate({ prop, value });
    });
}
  componentWillUpdate() {
  LayoutAnimation.spring();
}

onButtonUpdate() {
  const { firstname, lastname, adresse, email, city, phone, testFirstName, testLastName,
          testEmail, testAdresse, testCity, testPhone, age, testAge, taille, testTaille, poid, testPoid, poste } = this.props;
  const id = this.props.user._id;

  const user = { id, firstname, lastname, adresse, email, city, phone, joueur: { age, taille, poid, poste } };
  if ((testEmail === true) && (testCity === true) &&
      (testPhone === true) && (testFirstName === true) &&
      (testLastName === true) && (testAdresse === true) &&
      (testAge === true) && (testTaille === true) && (testPoid === true)) {
      this.props.updateUserProfil(this.props.user._id, user);
    } else {
      Alert.alert('Information', 'Verifier vos champs', [{ text: 'OK', onPress: () => console.log('OK Pressed!') }]);
    }
  }

  handlePasswordChange(text) {
    this.props.passwordUpdateChanged(text);
  }

  handlePasswordConfirmChange(text) {
    this.props.confirmNewPassword(text, this.props.password);
  }

  handleButtonUpdatePassword() {
      const { password, testPassword, validPassword } = this.props;
      const id = this.props.user._id;
      if ((testPassword === true) && (validPassword === true)) {
        this.props.updateUserPassword(id, password);
    } else {
      return (
        <View>
          <Text> Err</Text>
        </View>
      );
    }
  }


handleUpdate(prop, value, idChamps) {
  this.props.userUpdate({ prop, value, idChamps });
}

handleUpdateJoueur(prop, value, idChamps) {
  this.props.joueurUpdate({ prop, value, idChamps });
}

handelPoste(value) {
  this.props.updateUserPost(value);
}

  changeCardInfo() {
    const { changeCardInfo } = this.props;
    if (changeCardInfo) {
      return (
        <UpdateUserInfo
          userUpdateUser={this.handleUpdate.bind(this)}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          email={this.props.email}
          adresse={this.props.adresse}
          city={this.props.city}
          phone={this.props.phone}
          testFirstName={this.props.testFirstName}
          testLastName={this.props.testLastName}
          testEmail={this.props.testEmail}
          testAdresse={this.props.testAdresse}
          testCity={this.props.testCity}
          testPhone={this.props.testPhone}
        />
      );
    }
  }
  changeCardCarac() {
    const { changeCardCarac } = this.props;
    const { age, taille, poid, poste, testAge, testTaille, testPoid } = this.props;
    if (changeCardCarac) {
      return (
          <UpdateUserCharacteristic age={age} taille={taille} poid={poid} poste={poste} joueurUpdate={this.handleUpdateJoueur.bind(this)}
            testAge={testAge} testTaille={testTaille} testPoid={testPoid}
            updateUserPost={this.handelPoste.bind(this)}
          />
      );
    }
  }

  changeCardPassword() {
    const { changeCardPassword } = this.props;
    if (changeCardPassword) {
      return (
        <UpdateUserPasswordd
          password={this.props.password}
          testPassword={this.props.testPassword}
          passwordConfirm={this.props.passwordConfirm}
          validPassword={this.props.validPassword}
          onButtonUpdatePassword={this.handleButtonUpdatePassword.bind(this)}
          onPasswordChange={this.handlePasswordChange.bind(this)}
          onPasswordConfirmChange={this.handlePasswordConfirmChange.bind(this)}
          loading={this.props.loading}
        />
      );
    }
  }
  renderLoading() {
    if (this.props.refresh === true) {
      return (<Modal animationType={'fade'} transparent visible={this.props.refresh} onRequestClose={() => {}}>
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
  render() {
    const { styleViewCardSection, titleStyle, textHeaderStyle } = styles;
    return (
        <View>
          <Header>
            <Body>
                <Title>Modifier Profile</Title>
            </Body>
            <Right>
                <TouchableWithoutFeedback onPress={this.onButtonUpdate.bind(this)}>
                <Text style={textHeaderStyle}>Enregistrer</Text>
                </TouchableWithoutFeedback>
            </Right>
          </Header>
            {this.renderLoading()}
          <ScrollView style={{ marginBottom: 70 }}>
              <TouchableWithoutFeedback onPress={() => this.props.onchangeCardInfo()} >
                <View style={styleViewCardSection} >
                  <CardSection style={{ backgroundColor: '#eeeeee', height: 60 }}>
                    <Text style={titleStyle}>
                       Infromations générales
                    </Text>
                  </CardSection>
                    {this.changeCardInfo()}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.props.onchangeCardCarac()} >
                <View style={styleViewCardSection}>
                  <CardSection style={{ backgroundColor: '#eeeeee', height: 60 }}>
                    <Text style={titleStyle}>
                      caractéristique de joueur
                    </Text>
                  </CardSection>
                    {this.changeCardCarac()}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.props.onchangeCardPassword()} >
                <View style={styleViewCardSection}>
                  <CardSection style={{ backgroundColor: '#eeeeee', height: 60 }}>
                    <Text style={titleStyle}>
                      Changer de mot de passe
                    </Text>
                  </CardSection>
                    {this.changeCardPassword()}
                </View>
              </TouchableWithoutFeedback>
          </ScrollView>
        </View>
    );
  }
}

const styles = {
  containerInfo: {
    margin: 10
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 15
  },
  styleViewCardSection: {
    marginTop: 10,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'column',
  },
  errorTextStyle: {
    fontSize: 14,
    color: '#FF0000',
    marginLeft: 50
  },
 textHeaderStyle: {
   color: '#FFFFFF'
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
const mapStateToProps = ({ updateUser }) => {
  const { firstname, lastname, adresse, email, city, phone,
        changeCardInfo, changeCardCarac, changeCardPassword,
        validPassword, password, testPassword, passwordConfirm, loading,
        testFirstName, testLastName, testEmail, testAdresse, testCity, testPhone,
        age, taille, testAge, testTaille, testPoid, poid, poste, refresh
      } = updateUser;

  return { firstname,
           lastname,
           adresse,
           email,
           city,
           phone,
           changeCardInfo,
           changeCardCarac,
           changeCardPassword,
           password,
           testPassword,
           passwordConfirm,
           validPassword,
           loading,
           testFirstName,
           testLastName,
           testEmail,
           testAdresse,
           testCity,
           testPhone,
           age,
           taille,
           poid,
           poste, testAge, testTaille, testPoid, refresh
          };
};

export default connect(mapStateToProps,
     { userUpdate,
      phoneChanged,
      updateUserProfil,
      onchangeCardInfo,
      onchangeCardCarac,
      onchangeCardPassword,
      passwordUpdateChanged,
      confirmNewPassword,
      updateUserPassword,
      updateUserPost,
      joueurUpdate

     })(UpdateProfilUser);
