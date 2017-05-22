import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, loadUser, tokenChanged, setMessageError } from '../actions';
import { InputTextAuth, SButton, Spinner } from './common';

const background = require('./assets/login.png');

class LoginForm extends Component {

  componentDidMount() {
    let that = this;
    PushNotification.configure({
      onRegister: function (token) {
          that.props.tokenChanged(token.token);
      },
      onNotification: function (notification) {
          PushNotification.localNotification({
            message: notification.message,
            title: notification.title
          });
      },
      senderID: '1032879928127',
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, token, testEmail, testPassword } = this.props;
    const user = { email, password, token };
    if ((testEmail === true) || (testPassword === true)) {
        this.props.loginUser(user);
    } else {
        this.props.setMessageError('Veuillez vérifier vos champs');
    }
  }

  onTextPress() {
    Actions.register();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <SButton onPress={this.onButtonPress.bind(this)}>
        Login
      </SButton>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={background} square style={styles.backgroundImage} >
          <View style={{ flex: 1 }} />
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            <InputTextAuth
              placeholder="Adresse e-mail"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              testInput={this.props.testEmail}
              icon={'ios-mail-outline'}
            />
            <InputTextAuth
              secureTextEntry
              placeholder="Mot de passe"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              testInput={this.props.testPassword}
              icon={'ios-lock-outline'}
            />
            {this.renderButton()}
            <Text style={styles.errorTextStyle} onPress={this.onTextPress.bind(this)}>
                {this.props.error}
            </Text>
            <Text style={styles.registerTextStyle} onPress={this.onTextPress.bind(this)}>
                S'INSCRIRE
            </Text>
        </View>
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
  registerTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 40
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#000000',
    marginBottom: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, testEmail, testPassword, token } = auth;
  return { email, password, error, loading, testEmail, testPassword, token };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, loadUser, tokenChanged, setMessageError
})(LoginForm);
