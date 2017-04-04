import React, { Component } from 'react';
import { View, Form, Text } from 'native-base';
import { InputText } from './InputText';
import { CardSection } from './CardSection';

class UpdateUserInfo extends Component {

  render() {
      const { errorTextStyle } = styles;
    return (
      <View>
          <Form style={{ paddingLeft: 15, paddingRight: 15 }}>
            <CardSection>
               <InputText
                  placeholder="Modifier le nom"
                  value={this.props.firstname}
                  onChangeText={value => this.props.userUpdateUser('firstname', value, 'testFirstName')}
                  testInput={this.props.testFirstName}
                  icon={'ios-person-outline'}
               />
            </CardSection>

             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testFirstName === true ? '' : 'Champ nom est vide'}
               </Text>
             </CardSection>

             <CardSection>
               <InputText
                  placeholder="Modifier le prénom"
                  value={this.props.lastname}
                  onChangeText={value => this.props.userUpdateUser('lastname', value, 'testLastName')}
                  testInput={this.props.testLastName}
                  icon={'ios-person-outline'}
               />
             </CardSection>

             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testLastName === true ? '' : 'Champ prénom est vide' }
               </Text>
             </CardSection>

             <CardSection>
               <InputText
                  placeholder="Modifier E-mail"
                  value={this.props.email}
                  onChangeText={value => this.props.userUpdateUser('email', value, 'testEmail')}
                  testInput={this.props.testEmail}
                  icon={'ios-mail-outline'}
               />
             </CardSection>

             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testEmail === true ? '' : 'Saisir votre E-mail correctement'}
               </Text>
             </CardSection>

             <CardSection>
               <InputText
                  placeholder="Modifier votre adresse"
                  value={this.props.adresse}
                  onChangeText={value => this.props.userUpdateUser('adresse', value, 'testAdresse')}
                  testInput={this.props.testAdresse}
                  icon={'ios-home-outline'}
               />
             </CardSection>

             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testAdresse === true ? '' : 'Champ adresse est vide'}
               </Text>
             </CardSection>

             <CardSection>
               <InputText
                  placeholder="Ajouter votre ville"
                  value={this.props.city}
                  onChangeText={value => this.props.userUpdateUser('city', value, 'testCity')}
                  testInput={this.props.testCity}
                  icon={'ios-navigate-outline'}
               />
             </CardSection>

             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testCity === false ? 'Champ ville est vide' : ''}
               </Text>
             </CardSection>

             <CardSection>
               <InputText
                 keyboardType={'numeric'}
                 placeholder="Ajouter un numéro de téléphone"
                 value={this.props.phone + ''}
                 onChangeText={value => this.props.userUpdateUser('phone', value, 'testPhone')}
                 testInput={this.props.testPhone}
                 icon={'ios-call-outline'}
               />
             </CardSection>
             <CardSection>
               <Text style={errorTextStyle}>
                 {this.props.testPhone === false ? ' numéro de téléphone est incorrect ' : ''}
               </Text>
             </CardSection>
          </Form>
        </View>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 14,
    color: '#000000',
    marginLeft: 32
  },
};

export { UpdateUserInfo };
