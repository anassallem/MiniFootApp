import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Form } from 'native-base';
import { InputText } from './InputText';
import { Spinner } from './Spinner';
import { ButtonValid } from './ButtonValid';
import { CardSection } from './CardSection';

class UpdateUserPasswordd extends Component {

onPasswordChange(password) {
  this.props.onPasswordChange(password);
}
onPasswordConfirmChange(passwordConfirm) {
  this.props.onPasswordConfirmChange(passwordConfirm);
}
 onButtonUpdatePassword() {
   this.props.onButtonUpdatePassword();
 }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <ButtonValid style={{ marginTop: 20 }} onPress={this.onButtonUpdatePassword.bind(this)}>
      Modifier mot de passe
      </ButtonValid>
    );
  }

  render() {
      const { errorTextStyle } = styles;
    return (
      <View>
           <Form style={{ padding: 5 }}>
             <CardSection>
                <InputText
                  secureTextEntry
                  placeholder="Nouveau mot de passe"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                  testInput={this.props.testPassword}
                  icon={'md-finger-print'}
                />
             </CardSection>
            <CardSection>
                <Text style={errorTextStyle}>
                  {this.props.testPassword === false ?
                      'Un mot de passe doit se composer au moins huit caractères et' +
                      'contenir des lettres (en majuscule et minuscule )' : '' }
                </Text>
             </CardSection>

             <CardSection>
                <InputText
                  secureTextEntry
                  placeholder=" Retaper le nouveau mot de passe"
                  onChangeText={this.onPasswordConfirmChange.bind(this)}
                  value={this.props.passwordConfirm}
                  testInput={this.props.validPassword}
                  icon={'md-finger-print'}
                />
            </CardSection>
            <CardSection>
                <Text style={errorTextStyle}>
                    {this.props.validPassword === false ? 'Mot de passe non confirmé ' : ''}
                </Text>
           </CardSection>

           <CardSection>
            {this.renderButton()}
            </CardSection>
          </Form>
        </View>

    );
  }
}

const styles = {
  containerInfo: {
    margin: 10
  },
  errorTextStyle: {
    fontSize: 14,
    color: '#FF0000',
    marginLeft: 50
  },
};
export { UpdateUserPasswordd };
