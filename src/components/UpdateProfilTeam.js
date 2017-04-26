import _ from 'lodash';
import React, { Component } from 'react';
import { Alert, Modal, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { View, Header, Title, Text, Thumbnail, Button, Icon } from 'native-base';
import { teamUpdate, updateTeamProfil, updateImageTeam, uploadImageTeam } from '../actions';
import { CardSection, InputText, ButtonValid } from './common';
import { URL } from '../actions/api/config';

const logoEquipe = require('./assets/logoEquipe.jpg');

class UpdateProfilTeam extends Component {

  componentWillMount() {
        console.log('updateProfile');
    _.each(this.props.team, (value, prop) => {
      this.props.teamUpdate(prop, value);
    });
}

onButtonUpdate() {
  const { name, adresse, description, testName, testAdresse, testDescription } = this.props;

  const team = { name, adresse, description };
  if ((testName === true) && (testAdresse === true) && (testDescription === true)) {
      this.props.updateTeamProfil(this.props.team._id, team);
    } else {
      Alert.alert('Information', 'Verifier vos champs', [{ text: 'OK', onPress: () => console.log('OK Pressed!') }]);
    }
  }
onClickImage() {
  ImagePicker.showImagePicker(null, (response) => {
     if (response.didCancel) {
      console.log('User cancelled image picker');
     } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
     } else {
      this.props.updateImageTeam(response.uri, response, true);
     }
   });
}
onClickButtonUpload() {
    this.props.uploadImageTeam(this.props.team._id, this.props.data);
}
renderButton() {
  if (this.props.display === true) {
    return (<Button iconLeft style={styles.buttonStyle} onPress={this.onClickButtonUpload.bind(this)}>
                <Icon name='ios-camera-outline' style={styles.colorGray} />
                <Text style={styles.colorGray}>
                 Changer photo
                </Text>
           </Button>);
  }
}
renderLoading() {
  if (this.props.refresh === true) {
    return (<Modal animationType={'fade'} transparent visible={this.props.refresh} onRequestClose={() => {}}>
              <View style={styles.containerLoadingStyle}>
                <View style={styles.containerLoadingModal}>
                  <ActivityIndicator size="large" />
                  <Text>  Chargement ...</Text>
                </View>
              </View>
            </Modal>
            );
  }
}
renderPhotoEquipe() {
    if (this.props.logo !== undefined) {
      if (this.props.data !== null) {
        return <Thumbnail source={{ uri: this.props.logo }} style={styles.styleTeamImage} />;
      }
        const logoUri = `${URL}/equipe/teamUploads/${this.props.logo}`;
        return <Thumbnail source={{ uri: logoUri }} style={styles.styleTeamImage} />;
    }
    return <Thumbnail source={logoEquipe} style={styles.styleTeamImage} />;
}

  render() {
    const { errorTextStyle, titleStyle } = styles;
      const { name, adresse, description } = this.props;
    return (
        <View style={{ flex: 1, backgroundColor: '#01579B' }}>
          <Header style={{ alignItems: 'center' }}>
            <Title >
              Modifier Profile
            </Title>
          </Header>
            {this.renderLoading()}

            <TouchableNativeFeedback onPress={this.onClickImage.bind(this)} >
                {this.renderPhotoEquipe()}
             </TouchableNativeFeedback>
             {this.renderButton()}

              <CardSection style={{ backgroundColor: '#FFFFFF', height: 50, borderRadius: 5 }}>
                <Text style={titleStyle}>
                  Informations de l'équipe
                </Text>
              </CardSection>

          <CardSection style={{ height: 60 }} >
           <InputText
            placeholder="Modifier le nom de l'équipe"
            icon={'ios-football-outline'}
            value={name}
            onChangeText={value => this.props.teamUpdate('name', value, 'testName')}
            testInput={this.props.testName}
           />
          </CardSection>

          <CardSection>
            <Text style={errorTextStyle}>
              {this.props.testName === true ? '' : "Champ nom d'équipe est vide"}
            </Text>
          </CardSection>

          <CardSection style={{ height: 60 }}>
           <InputText
              placeholder="Modifier l'adresse de l'équipe"
              icon={'ios-pin-outline'}
              value={adresse}
              onChangeText={value => this.props.teamUpdate('adresse', value, 'testAdresse')}
              testInput={this.props.testAdresse}
           />
          </CardSection>

           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testAdresse === true ? '' : 'Champ adresse est vide'}
             </Text>
           </CardSection>

           <CardSection style={{ height: 60 }}>
             <InputText
                placeholder="Ajouter une description"
                icon={'ios-create-outline'}
                value={description}
                onChangeText={value => this.props.teamUpdate('description', value, 'testDescription')}
                testInput={this.props.testDescription}
             />
           </CardSection>

           <CardSection>
             <Text style={errorTextStyle}>
               {this.props.testDescription === true ? '' : 'Champ Description est vide'}
             </Text>
           </CardSection>

           <CardSection style={{ marginTop: 20 }}>
             <ButtonValid onPress={this.onButtonUpdate.bind(this)}>
               Enregistrer
             </ButtonValid>
           </CardSection>
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
  styleTeamImage: {
     zIndex: 2,
     width: 90,
     height: 90,
     marginTop: 12,
     borderRadius: 50,
     borderWidth: 2,
     borderColor: '#FFFFFF',
     justifyContent: 'center',
     alignSelf: 'center',
     marginBottom: -10
  },
  containerLoadingStyle: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center'
  },
  containerLoadingModal: {
     backgroundColor: '#FFFFFF',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 30,
     marginLeft: 30,
     marginRight: 30
  },
  titleStyle: {
    fontSize: 14,
    paddingLeft: 15,
    color: '#424242'
  },
  styleViewCardSection: {
    zIndex: 1,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonStyle: {
     backgroundColor: '#FFFFFF',
     alignSelf: 'center',
     height: 30,
     marginTop: 10,
     marginBottom: 10
  },
  colorGray: {
      color: '#616161'
  }
};

const mapStateToProps = ({ updateTeamProfile }) => {
  const { name, adresse, description, testName, testAdresse, testDescription, refresh, display, logo, data } = updateTeamProfile;
  return { name, adresse, description, testName, testAdresse, testDescription, refresh, display, logo, data };
};
export default connect(mapStateToProps, { teamUpdate, updateTeamProfil, updateImageTeam, uploadImageTeam })(UpdateProfilTeam);
