import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Toast } from 'native-base';
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
      <SButton onPress={this.onButtonPress.bind(this)}>
        Inscription
      </SButton>
    );
  }

  render() {
    return (
      <Container>
            <Container style={{ flex: 1 }}>
              <Content padder >
                <Form>
                  <InputText
                    label="Name"
                    placeholder="Name"
                    onChangeText={this.onNameChange.bind(this)}
                    value={this.props.firstname}
                    testInput={this.props.testFirstName}
                  />
                <Text>
                  {this.props.testFirstName === false ? ' champ name est vide ' : ''}
                </Text>

                  <InputText
                    label="LastName"
                    placeholder="LastName"
                    onChangeText={this.onLastNameChange.bind(this)}
                    value={this.props.lastname}
                    testInput={this.props.testLastName}
                  />

                  <Text>
                    {this.props.testLastName === false ? ' champ last name est vide ' : ''}
                  </Text>

                  <InputText
                    label="Adresse"
                    placeholder="Adresse"
                    onChangeText={this.onAdresseChange.bind(this)}
                    value={this.props.adresse}
                    testInput={this.props.testAdresse}
                  />

                  <Text>
                    {this.props.testAdresse === false ? ' champ adresse est vide ' : ''}
                  </Text>

                  <InputText
                    label="Email"
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    testInput={this.props.testEmail}
                  />
                  <Text>
                    {this.props.testEmail === false ? ' saisir votre email correctement ' : ''}
                  </Text>

                  <InputText
                    secureTextEntry
                    label="Password"
                    placeholder="password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    testInput={this.props.testPassword}
                  />
                  <Text>
                    {this.props.testPassword === false ?
                        'Un mot de passe doit se composer au moins huit caractères et' +
                        'contenir des lettres (en majuscule et minuscule )' : '' }
                  </Text>
                  <InputText
                    secureTextEntry
                    label="ConfirmPassword"
                    placeholder="Confirmation password"
                    onChangeText={this.onPasswordConfirmChange.bind(this)}
                    value={this.props.passwordConfirm}
                    testInput={this.props.validPassword}
                  />
                  <Text>
                      {this.props.validPassword === false ? 'Password non confirmé ' : ''}
                  </Text>
                </Form>
                    {this.renderButton()}

              </Content>
                <Text
                  style={styles.registerTextStyle}
                  onPress={this.onTextPress.bind(this)}
                >
                  I have an account
                </Text>
            </Container>
          </Container>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 162,
    alignSelf: 'right',
    color: 'red'
  },
  registerTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'blue'
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
