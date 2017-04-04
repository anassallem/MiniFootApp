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
        <Form style={{ paddingLeft: 15, paddingRight: 15 }}>
           <CardSection>
             <InputText
               placeholder="Age"
               value={age + ''}
               keyboardType={'numeric'}
               onChangeText={value => this.props.joueurUpdate('age', value, 'testAge')}
               testInput={this.props.testAge}
               icon={'ios-man-outline'}
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
               keyboardType={'numeric'}
               onChangeText={value => this.props.joueurUpdate('taille', value, 'testTaille')}
               icon={'ios-arrow-round-up-outline'}
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
               keyboardType={'numeric'}
               onChangeText={value => this.props.joueurUpdate('poid', value, 'testPoid')}
               icon={'ios-speedometer-outline'}
               testInput={this.props.testPoid}
             />
           </CardSection>
           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testPoid === false ? 'Champ poids invalide' : ''}
             </Text>
           </CardSection>
           <CardSection>
               <Picker
                 style={{ flex: 1, color: '#FFFFFF' }}
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
    color: '#000000',
    marginLeft: 32
  },
};

export { UpdateUserCharacteristic };
