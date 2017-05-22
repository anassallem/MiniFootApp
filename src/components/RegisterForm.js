import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text } from 'native-base';
import {
       emailChanged,
       passwordChanged,
       passwordConfirmChanged,
       nameChanged,
       lastNameChanged,
       adressChanged,
       createUser,
       loadedUser,
       setMessageRegisterError
 } from '../actions';
import { SButton, Spinner, InputTextAuth } from './common';

const background = require('./assets/inscrit.jpg');

class RegisterForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onPasswordConfirmChange(text) {
    this.props.passwordConfirmChanged(text, this.props.password);
  }
  onNameChange(text) {
    this.props.nameChanged(text);
  }
  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }
  onAdresseChange(text) {
    this.props.adressChanged(text);
  }
  onTextPress() {
    Actions.login();
  }

  onButtonPress() {
  const { firstname, lastname, adresse,
          email, password, testEmail, testPassword,
          validPassword, testFirstName, testLastName, testAdresse
        } = this.props;

  const user = { firstname, lastname, adresse, email, password };
  if ((testEmail === true) &&
      (testPassword === true) &&
      (validPassword === true) &&
      (testFirstName === true) &&
      (testLastName === true) &&
      (testAdresse === true)) {
    this.props.createUser(user);
  } else {
    this.props.setMessageRegisterError('Veuillez vérifier vos champs');
  }
 }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <SButton icon='md-log-in' onPress={this.onButtonPress.bind(this)}>
        Inscription
      </SButton>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={background} square style={styles.backgroundImage} >
         <ScrollView>
          <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20 }}>
            <Text style={styles.textStyle}> Créer un compte </Text>
              <InputTextAuth
                placeholder="Saisir votre nom"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.firstname}
                testInput={this.props.testFirstName}
                icon={'ios-person-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testFirstName === false ? 'Champ Nom est vide' : ''}
              </Text>
              <InputTextAuth
                placeholder="Saisir votre prénom"
                onChangeText={this.onLastNameChange.bind(this)}
                value={this.props.lastname}
                testInput={this.props.testLastName}
                icon={'ios-contact-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testLastName === false ? 'Champ prénom est vide' : ''}
              </Text>
              <InputTextAuth
                placeholder="Saisir votre adresse"
                onChangeText={this.onAdresseChange.bind(this)}
                value={this.props.adresse}
                testInput={this.props.testAdresse}
                icon={'ios-navigate-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testAdresse === false ? ' Champ adresse est vide ' : ''}
              </Text>
              <InputTextAuth
                placeholder="Saisir votre E-mail"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                testInput={this.props.testEmail}
                icon={'ios-mail-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testEmail === false ? ' Saisir votre email correctement ' : ''}
              </Text>
              <InputTextAuth
                secureTextEntry
                placeholder="Saisir un mot de passe"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                testInput={this.props.testPassword}
                icon={'ios-lock-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testPassword === false ?
                    'Un mot de passe doit se composer au moins huit caractères et' +
                    'contenir des lettres (en majuscule et minuscule )' : '' }
              </Text>
              <InputTextAuth
                secureTextEntry
                placeholder="Retaper le mot de passe"
                onChangeText={this.onPasswordConfirmChange.bind(this)}
                value={this.props.passwordConfirm}
                testInput={this.props.validPassword}
                icon={'md-finger-print'}
              />
              <Text style={styles.errorTextStyle}>
                  {this.props.validPassword === false ? 'Mot de passe non confirmé ' : ''}
              </Text>

              {this.renderButton()}
              <Text style={styles.errorMessageStyle} onPress={this.onTextPress.bind(this)}>
                  {this.props.error}
              </Text>
              <Text
                  style={styles.registerTextStyle}
                  onPress={this.onTextPress.bind(this)}
              >
                  J'ai déjà un compte
              </Text>
          </View>
         </ScrollView>
       </Image>
      </View>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    backgroundColor: 'transparent',
  },
  errorTextStyle: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 5,
    marginBottom: 10
  },
  registerTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 30
  },
  textStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 25
  },
  errorMessageStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#000000',
    marginBottom: 10
  }
};
const mapStateToProps = ({ user }) => {
  const { firstname,
          lastname,
          adresse,
          email,
          password,
          passwordConfirm,
          testEmail,
          testPassword,
          error,
          loading,
          validPassword,
          testFirstName,
          testLastName,
          testAdresse
   } = user;

  return { firstname,
           lastname,
           adresse,
           email,
           password,
           passwordConfirm,
           testEmail,
           testPassword,
           error,
           loading,
           validPassword,
           testFirstName,
           testLastName,
           testAdresse };
};
export default connect(mapStateToProps,
  { emailChanged,
    passwordChanged,
    passwordConfirmChanged,
    nameChanged,
    lastNameChanged,
    adressChanged,
    createUser,
    loadedUser,
    setMessageRegisterError
})(RegisterForm);
