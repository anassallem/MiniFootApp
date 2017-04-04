import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Toast, Text } from 'native-base';
import {
       emailChanged,
       passwordChanged,
       passwordConfirmChanged,
       nameChanged,
       lastNameChanged,
       adressChanged,
       createUser,
       loadedUser
 } from '../actions';
import { SButton, Spinner, InputTextAuth } from './common';

class RegisterForm extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== '') {
        Toast.show({
              text: nextProps.error,
              position: 'bottom',
              buttonText: 'Ok',
              duration: 6000
            });
      }
  }

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
    Toast.show({
          text: 'verifiez vos champs',
          position: 'bottom',
          buttonText: 'Ok',
          duration: 6000
        });
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
      <View style={{ flex: 1, backgroundColor: '#0277BD' }}>
          <View style={{ margin: 40 }}>
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
                icon={'md-finger-print'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testPassword === false ?
                    'Un mot de passe doit se composer au moins huit caractères et' +
                    'contenir des lettres (en majuscule et minuscule )' : '' }
              </Text>
              <InputTextAuth
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
            <Text
              style={styles.registerTextStyle}
              onPress={this.onTextPress.bind(this)}
            >
              I have an account
            </Text>
          </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 50
  },
  registerTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#FFFFFF'
  },
  textStyle: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 15
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
    loadedUser
})(RegisterForm);
