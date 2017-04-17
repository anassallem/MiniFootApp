import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { InputTextAuth, Spinner } from './common';
import { equipeNameChanged, equipeVilleChanged, equipeDescriptionChanged,
         changeImageEquipe, createEquipe, setMessageRegisterError, getUserById
       } from '../actions';

const logoEquipe = require('./assets/logoEquipe.jpg');

class CreateEquipeStepOne extends Component {
  componentDidMount() {

}

  onEquipeNameChanged(text) {
    this.props.equipeNameChanged(text);
  }
  onEquipevilleChanged(text) {
    this.props.equipeVilleChanged(text);
  }
  onEquipeDescriptionChanged(text) {
    this.props.equipeDescriptionChanged(text);
  }

  onButtonPressCreate() {
    const { name, ville, description, testName, testVille, testDescription,
          } = this.props;
    if ((testName === true) &&
        (testVille === true) &&
        (testDescription === true)) {
          try {
              AsyncStorage.getItem('user').then((value) => {
                  const user = JSON.parse(value);
                  const equipe = { name, ville, description, createdBy: user.user._id };
                  this.props.createEquipe(equipe, this.props.data);
              }).done();
          } catch (e) {
              console.log('caught error', e);
    }
    } else {
      this.props.setMessageRegisterError('Verifiez vos champs');
    }
  }

  onClickImage() {
    ImagePicker.showImagePicker(null, (response) => {
       if (response.didCancel) {
        console.log('User cancelled image picker');
       } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
       } else {
        this.props.changeImageEquipe(response.uri, response);
       }
     });
  }
  renderLogo() {
    if (this.props.logo === '') {
      return <Image source={logoEquipe} style={styles.styleEquipeImage} />;
    }
    return <Image source={{ uri: this.props.logo }} style={styles.styleEquipeImage} />;
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableNativeFeedback onPress={this.onButtonPressCreate.bind(this)}>
       <View style={styles.buttonStyle}>
         <Text style={styles.textButtonStyle}>
           Créer équipe
         </Text>
       </View>
   </TouchableNativeFeedback>
    );
  }

  render() {
      return (
          <View style={styles.mainContainer}>
            <View style={styles.bodyContainer}>
                  <TouchableNativeFeedback onPress={this.onClickImage.bind(this)}>
                       {this.renderLogo()}
                   </TouchableNativeFeedback>
                  <InputTextAuth
                    placeholder="Entrer le nom d équipe"
                    onChangeText={this.onEquipeNameChanged.bind(this)}
                    value={this.props.name}
                    testInput={this.props.testName}
                    icon={'ios-football-outline'}
                  />
                  <InputTextAuth
                    placeholder="Entrer la ville d'équipe"
                    onChangeText={this.onEquipevilleChanged.bind(this)}
                    value={this.props.ville}
                    testInput={this.props.testVille}
                    icon={'ios-ionic-outline'}
                  />
                  <InputTextAuth
                    placeholder="Entrer une description"
                    onChangeText={this.onEquipeDescriptionChanged.bind(this)}
                    value={this.props.description}
                    testInput={this.props.testDescription}
                    icon={'ios-albums-outline'}
                  />
                  {this.renderButton()}
                  <Text style={styles.errorMessageStyle} >
                      {this.props.error}
                  </Text>
            </View>
         </View>
      );
  }
}
//backgroundColor: 'rgba(0,0,0,0.2)',
const styles = {
    mainContainer: {
        justifyContent: 'center',
        backgroundColor: '#01579B',
        flex: 1
    },
    bodyContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        padding: 20,
        marginLeft: 20,
        marginRight: 20
    },
    buttonStyle: {
       marginTop: 20,
       justifyContent: 'center',
       backgroundColor: '#00ACC1',
       padding: 8,
       paddingLeft: 50,
       paddingRight: 50,
       marginBottom: 10
     },
     textButtonStyle: {
       color: '#FFFFFF',
       alignSelf: 'center'
     },
     styleEquipeImage: {
       width: 100,
       height: 100,
       marginTop: 20,
       marginBottom: 20,
       borderRadius: 50,
       borderWidth: 2,
       borderColor: '#BDBDBD',
       alignSelf: 'center'
      },
};

const mapStateToProps = ({ equipe }) => {
  const { steps, name, ville, description, logo, testName, testVille, testDescription, loading, error, data } = equipe;
  return { steps, name, ville, description, logo, testName, testVille, testDescription, loading, error, data };
};

export default connect(mapStateToProps,
  { equipeNameChanged, equipeVilleChanged, equipeDescriptionChanged,
    changeImageEquipe, createEquipe, setMessageRegisterError, getUserById
})(CreateEquipeStepOne);
