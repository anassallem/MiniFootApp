import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Toast, Thumbnail } from 'native-base';
import { emailChanged, passwordChanged, loginUser, loadUser } from '../actions';
import { InputText, SButton, Spinner } from './common';

class LoginForm extends Component {
  componentWillMount() {
    this.props.loadUser();
    //test
    //test3
    //test 2
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error !== '') {
        Toast.show({ text: nextProps.error, position: 'bottom', buttonText: 'Ok', duration: 6000 });
      }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, testEmail, testPassword } = this.props;
    const user = { email, password };
    if (!(testEmail === true) || !(testPassword === true)) {
        Toast.show({ text: 'verifiez email et password', position: 'bottom', buttonText: 'Ok' });
    } else {
      this.props.loginUser(user);
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
      <SButton icon='md-log-in' onPress={this.onButtonPress.bind(this)}>
        Login
      </SButton>
    );
  }

  render() {
    return (
      <Container>
       <Thumbnail source={require('./assets/backgroundimage.png')} square style={styles.backgroundImage}>
        <Container style={{ flex: 1 }} />
          <Container style={{ flex: 2 }}>
              <Content style={{ margin: 30 }} >
                <Form>
                  <InputText
                    label="Email"
                    placeholder="Enter E-mail"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    testInput={this.props.testEmail}
                    icon={'ios-mail-outline'}
                  />
                  <InputText
                    secureTextEntry
                    label="Password"
                    placeholder="Enter Password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    testInput={this.props.testPassword}
                    icon={'md-finger-print'}
                  />
                </Form>
                  {this.renderButton()}
                <Text style={styles.registerTextStyle} onPress={this.onTextPress.bind(this)}>
                  DON'T HAVE AN ACCOUNT? SIGN UP
                </Text>
              </Content>
          </Container>
      </Thumbnail>
      </Container>
    );
  }
}
const { height, width } = Dimensions.get('window');
const styles = {
  registerTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: '#757575'
  },
  backgroundImage: {
    flex: 1,
    width,
    height,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, testEmail, testPassword } = auth;
  return { email, password, error, loading, testEmail, testPassword };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, loadUser
})(LoginForm);
