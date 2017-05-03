import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Header, Right, Body, Title } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { URL } from '../actions/api/config';
import { Checkbox } from './common';
import { equipeDescriptionAdvertChanged, reverseChecked, addNewAdvert } from '../actions';

const logoEquipe = require('./assets/logoEquipe.jpg');

class CreateAdvertMatch extends Component {

  onEquipeDescriptionChanged(text) {
    this.props.equipeDescriptionAdvertChanged(text);
  }
  onPressAddAdvert() {
      this.props.addNewAdvert();
      const { description, testLundi, testMardi, testMercredi, testJeudi, testVendredi, testSamedi, testDimanche, team } = this.props;
      let disponibility = [];
      if (testLundi) {
          disponibility.push('Lundi');
      }
      if (testMardi) {
          disponibility.push('Mardi');
      }
      if (testMercredi) {
          disponibility.push('Mercredi');
      }
      if (testJeudi) {
          disponibility.push('Jeudi');
      }
      if (testVendredi) {
          disponibility.push('Vendredi');
      }
      if (testSamedi) {
          disponibility.push('Samedi');
      }
      if (testDimanche) {
          disponibility.push('Dimanche');
      }
      const advert = { description, disponibility, createdBy: team._id };
      this.props.socket.emit('add_advert', advert);
  }
  renderLogo() {
      if (this.props.team.logo !== undefined) {
          const logoUri = `${URL}/equipe/teamUploads/${this.props.team.logo}`;
          return <Image source={{ uri: logoUri }} style={styles.logoStyle} />;
      }
      return <Image source={logoEquipe} style={styles.logoStyle} />;
  }
  renderLoading() {
    if (this.props.loading === true) {
      return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                <View style={styles.containerLoadingStyle}>
                  <View style={styles.containerLoadingModal}>
                    <ActivityIndicator size="large" color={['#FFFFFF']} />
                    <Text style={styles.styleTextLoading}>  Chargement ...</Text>
                  </View>
                </View>
              </Modal>
              );
    }
  }
  render() {
      const { description, testLundi, testMardi, testMercredi, testJeudi, testVendredi, testSamedi, testDimanche } = this.props;
      return (
          <View style={styles.mainContainer}>
              <Header>
                <Body>
                    <Title>Créer une annonce</Title>
                </Body>
                <Right>
                    <TouchableNativeFeedback onPress={this.onPressAddAdvert.bind(this)}>
                        <Text style={styles.textHeaderStyle}>Ajouter</Text>
                    </TouchableNativeFeedback>
                </Right>
              </Header>
              <View style={{ margin: 10 }}>
                  {this.renderLoading()}
                  <View style={styles.bodyContainer}>
                      {this.renderLogo()}
                      <View style={styles.containerText}>
                          <Text style={styles.textTitle}>{this.props.team.name}</Text>
                          <Text style={styles.textDate}>{moment().format('DD-MM-YYYY h:mm')}</Text>
                      </View>
                  </View>
                  <TextInput
                      placeholder="Entrer une description..."
                      onChangeText={this.props.equipeDescriptionAdvertChanged.bind(this)}
                      value={description}
                      multiline
                      style={styles.styleTextInput}
                      underlineColorAndroid={'transparent'}
                  />
                  <View style={styles.containerTitle}>
                      <Text style={styles.textContainerTitle}>disponibilité d'équipe</Text>
                  </View>
                  <View style={styles.containerCheckbox}>
                      <Checkbox isChecked={testLundi} rightText='Lundi' onClick={() => { this.props.reverseChecked('testLundi', testLundi); }} />
                      <Checkbox isChecked={testMardi} rightText='Mardi' onClick={() => { this.props.reverseChecked('testMardi', testMardi); }} />
                      <Checkbox isChecked={testMercredi} rightText='Mercredi' onClick={() => { this.props.reverseChecked('testMercredi', testMercredi); }} />
                      <Checkbox isChecked={testJeudi} rightText='Jeudi' onClick={() => { this.props.reverseChecked('testJeudi', testJeudi); }} />
                      <Checkbox isChecked={testVendredi} rightText='Vendredi' onClick={() => { this.props.reverseChecked('testVendredi', testVendredi); }} />
                      <Checkbox isChecked={testSamedi} rightText='Samedi' onClick={() => { this.props.reverseChecked('testSamedi', testSamedi); }} />
                      <Checkbox isChecked={testDimanche} rightText='Dimanche' onClick={() => { this.props.reverseChecked('testDimanche', testDimanche); }} />
                  </View>
              </View>
         </View>
      );
  }
}

const styles = {
    mainContainer: {
        flex: 1
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    bodyContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3E5FC'
    },
    containerText: {
        flexDirection: 'column',
        marginLeft: 10
    },
    textTitle: {
        color: '#000000'
    },
    textDate: {
        fontSize: 10
    },
    containerTitle: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3E5FC',
        borderTopWidth: 0.5,
        borderTopColor: '#B3E5FC',
        justifyContent: 'center',
        marginBottom: 10
    },
    textContainerTitle: {
        color: '#03A9F4'
    },
    styleTextInput: {
        height: 120,
        justifyContent: 'center',
        fontSize: 20
    },
    logoStyle: {
       width: 40,
       height: 40
    },
    containerCheckbox: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    containerLoadingStyle: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    containerLoadingModal: {
       backgroundColor: '#01579B',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 30,
       marginLeft: 30,
       marginRight: 30
    },
    styleTextLoading: {
       color: '#FFFFFF'
    }
};

const mapStateToProps = ({ createAdvert, homeDiscussion }) => {
  const { description, testLundi, testMardi, testMercredi, testJeudi, testVendredi, testSamedi, testDimanche, loading } = createAdvert;
  const { socket } = homeDiscussion;
  return { description, testLundi, testMardi, testMercredi, testJeudi, testVendredi, testSamedi, testDimanche, loading, socket };
};

export default connect(mapStateToProps, { equipeDescriptionAdvertChanged, reverseChecked, addNewAdvert })(CreateAdvertMatch);
