import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Toast, Text, Thumbnail } from 'native-base';
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
import { InputText, SButton, Spinner } from './common';

class RegisterForm extends Component {
  componentWillMount() {
    this.props.loadedUser();
  }
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
  if ((testEmail === true) ||
      (testPassword === true) ||
      (validPassword === true) ||
      (testFirstName === true) ||
      (testLastName === true) ||
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
      <Container>
        <Thumbnail source={require('./assets/backgroundimage.png')} square style={styles.backgroundImage}>
          <Content>
            <Form style={{ padding: 30 }}>
              <InputText
                label="FirstName"
                placeholder="Enter FirstName"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.firstname}
                testInput={this.props.testFirstName}
                icon={'ios-person-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testFirstName === false ? ' Champ name est vide ' : ''}
              </Text>
              <InputText
                label="LastName"
                placeholder="Enter LastName"
                onChangeText={this.onLastNameChange.bind(this)}
                value={this.props.lastname}
                testInput={this.props.testLastName}
                icon={'ios-contact-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testLastName === false ? ' Champ last name est vide ' : ''}
              </Text>
              <InputText
                label="Adresse"
                placeholder="Enter Adress"
                onChangeText={this.onAdresseChange.bind(this)}
                value={this.props.adresse}
                testInput={this.props.testAdresse}
                icon={'ios-navigate-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testAdresse === false ? ' Champ adresse est vide ' : ''}
              </Text>
              <InputText
                label="Email"
                placeholder="Enter E-mail"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                testInput={this.props.testEmail}
                icon={'ios-mail-outline'}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.testEmail === false ? ' Saisir votre email correctement ' : ''}
              </Text>
              <InputText
                secureTextEntry
                label="Password"
                placeholder="Enter password"
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
              <InputText
                secureTextEntry
                label="ConfirmPassword"
                placeholder="Enter confirmation password"
                onChangeText={this.onPasswordConfirmChange.bind(this)}
                value={this.props.passwordConfirm}
                testInput={this.props.validPassword}
                icon={'md-finger-print'}
              />
              <Text style={styles.errorTextStyle}>
                  {this.props.validPassword === false ? 'Password non confirmé ' : ''}
              </Text>

              {this.renderButton()}
            <Text
              style={styles.registerTextStyle}
              onPress={this.onTextPress.bind(this)}
            >
              I have an account
            </Text>
            </Form>
          </Content>
        </Thumbnail>
      </Container>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = {
  errorTextStyle: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 50
  },
  backgroundImage: {
    flex: 1,
    width,
    height,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#757575'
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
