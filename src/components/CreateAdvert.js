import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Header, Right, Body, Title } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { URL } from '../actions/api/config';
import { descriptionAdvertChanged, addAdvertUser } from '../actions';

const logoUser = require('./assets/userdefault.png');

class CreateAdvert extends Component {

  onDescriptionChanged(text) {
    this.props.descriptionAdvertChanged(text);
  }
  onPressAddAdvert() {
      const advert = { advertUser: { description: this.props.description, createdBy: this.props.user._id }, type: 'AdvertUser' };
      this.props.addAdvertUser();
      this.props.socket.emit('add_advert', advert);
  }
  renderLogo() {
      if (this.props.user.photo !== undefined) {
          const uriImg = `${URL}/users/upload/${this.props.user.photo}`;
          return <Image source={{ uri: uriImg }} style={styles.logoStyle} />;
      }
      return <Image source={logoUser} style={styles.logoStyle} />;
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
      const { description } = this.props;
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
                          <Text style={styles.textTitle}>{this.props.user.firstname} {this.props.user.lastname}</Text>
                          <Text style={styles.textDate}>{moment().format('DD-MM-YYYY h:mm')}</Text>
                      </View>
                  </View>
                  <TextInput
                      placeholder="Entrer une description..."
                      onChangeText={this.onDescriptionChanged.bind(this)}
                      value={description}
                      multiline
                      style={styles.styleTextInput}
                      underlineColorAndroid={'transparent'}
                  />
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
    styleTextInput: {
        height: 120,
        justifyContent: 'center',
        fontSize: 20
    },
    logoStyle: {
       width: 40,
       height: 40
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

const mapStateToProps = ({ createAdvertUser, homeDiscussion }) => {
  const { description, loading } = createAdvertUser;
  const { socket, user } = homeDiscussion;
  return { description, loading, socket, user };
};

export default connect(mapStateToProps, { descriptionAdvertChanged, addAdvertUser })(CreateAdvert);
