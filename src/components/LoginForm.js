import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableNativeFeedback, Dimensions } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, loadUser, tokenChanged, setMessageError } from '../actions';
import { InputTextAuth, Spinner } from './common';
import { URL } from '../actions/api/config';

const background = require('./assets/grass.jpg');
const logo = require('./assets/logo.png');

class LoginForm extends Component {

  componentDidMount() {
    let that = this;
    PushNotification.configure({
      onRegister: function (token) {
          that.props.tokenChanged(token.token);
      },
      onNotification: function (notification) {
          console.log(notification);
          if (notification.tag === 'TEAM') {
              PushNotification.localNotification({
                  message: notification.message,
                  title: notification.title,
                  smallIcon: `${URL}/equipe/teamUploads/${notification.logo}`
              });
          } else {
              PushNotification.localNotification({
                  message: notification.message,
                  title: notification.title
              });
          }
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
        <TouchableNativeFeedback onPress={this.onButtonPress.bind(this)}>
                <View style={styles.styleButton}>
                    <Text style={styles.textWhite}>CONNEXION</Text>
                </View>
        </TouchableNativeFeedback>
    );
  }

  render() {
    return (
        <ScrollView>
            <Image source={background} style={styles.backgroundImage} >
                <Image source={logo} style={{ width: 300, height: 300, alignSelf: 'center' }} />
                <View style={{ marginLeft: 20, marginRight: 20, alignItems: 'center', justifyContent: 'center' }}>
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
                    <Text style={styles.errorTextStyle} onPress={this.onTextPress.bind(this)}>
                        {this.props.error}
                    </Text>
                    {this.renderButton()}
                    <Text style={styles.registerTextStyle} onPress={this.onTextPress.bind(this)}>
                        Vous n'avez pas un compte ? inscrivez-vous
                    </Text>
                </View>
            </Image>
        </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = {
    backgroundImage: {
        width: null,
    },
    registerTextStyle: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    errorTextStyle: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 10
    },
    styleButton: {
        width: width - 40,
        alignItems: 'center',
        backgroundColor: '#C8E6C9',
        justifyContent: 'center',
        borderWidth: 2,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#1B5E20',
        borderRadius: 8,
        marginBottom: 10,
    },
    textWhite: {
        fontSize: 16,
        color: '#2E7D32',
    }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, testEmail, testPassword, token } = auth;
  return { email, password, error, loading, testEmail, testPassword, token };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, loadUser, tokenChanged, setMessageError
})(LoginForm);
