import React, { Component } from 'react';
import { View, Picker, Text, Form } from 'native-base';
import { InputText } from './InputText';
import { CardSection } from './CardSection';

class UpdateUserCharacteristic extends Component {
  updatePoste(value) {
    this.props.updateUserPost(value);
  }

  render() {
      const { errorTextStyle } = styles;
      const { age, taille, poid, poste } = this.props;
    return (
      <View>
        <Form style={{ padding: 5 }}>
           <CardSection>
             <InputText
               placeholder="Age"
               value={age + ''}
               onChangeText={value => this.props.joueurUpdate('age', value, 'testAge')}
               testInput={this.props.testAge}
               icon={'ios-call-outline'}
             />
           </CardSection>
           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testAge === false ? 'Champ age invalide' : ''}
             </Text>
           </CardSection>
           <CardSection>
             <InputText
               placeholder="Taille"
               value={taille +''}
               onChangeText={value => this.props.joueurUpdate('taille', value, 'testTaille')}
               icon={'ios-call-outline'}
               testInput={this.props.testTaille}
             />
           </CardSection>
           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testTaille === false ? 'Champ taille invalide' : ''}
             </Text>
           </CardSection>
           <CardSection>
             <InputText
               placeholder="Poids"
               value={poid +''}
               onChangeText={value => this.props.joueurUpdate('poid', value, 'testPoid')}
               icon={'ios-call-outline'}
               testInput={this.props.testPoid}
             />
           </CardSection>
           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testPoid === false ? 'Champ poids invalide' : ''}
             </Text>
           </CardSection>
           <CardSection style={{ flexDirection: 'column' }}>
               <Picker
                 style={{ flex: 1 }}
                 selectedValue={poste}
                 onValueChange={this.updatePoste.bind(this)}
               >
                 <Picker.Item label="Choisir votre position sur le terrain" />
                 <Picker.Item label="Attaque" value="Attaque" />
                 <Picker.Item label="Milieu" value="Milieu" />
                 <Picker.Item label="Défence" value="Defence" />
                 <Picker.Item label="Gardien" value="Gardien" />

               </Picker>
             </CardSection>
        </Form>
   </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 14,
    color: '#FF0000',
    marginLeft: 50
  },
};

export { UpdateUserCharacteristic };
