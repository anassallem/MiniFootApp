import React, { Component } from 'react';
import { Dimensions, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Thumbnail, Text, Content,
     ListItem, Left, Right, Icon, Body } from 'native-base';
import { URL } from '../actions/api/config';

let user = null;
const background = require('./assets/drawer.jpg');

class SideBar extends Component {

  componentDidMount() {
      try {
          AsyncStorage.getItem('user').then((value) => {
              user = JSON.parse(value);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
  }

  onButtonPress() {
    this.removeCache('user');
    Actions.login();
  }

  async removeCache(key) {
      try { await AsyncStorage.removeItem(key); }
      catch (e) { console.log('caught error', e); }
  }
  renderUser() {
      const { backgroundImage, textUserStyle } = styles;
      if (user !== null) {
          const uriImg = `${URL}/users/upload/${user.user.photo}`;
          return (
              <Thumbnail style={backgroundImage} square source={background}>
                   <Thumbnail source={{ uri: uriImg }}
                    style={{ width: 70, height: 70 }}
                   />
                <Text style={textUserStyle}>{ user.user.firstname + ' ' + user.user.lastname}</Text>
                   <Text style={textUserStyle}>{user.user.email}</Text>
              </Thumbnail>
          );
      }
  }
  render() {
    const { containerNavigation, colorIcon, textStyle } = styles;

    return (
      <Container>
        <Container style={{ flex: 1 }}>
            {this.renderUser()}
        </Container>
        <Container style={containerNavigation}>
            <Content style={{ padding: 0 }}>
                <ListItem itemHeader first>
                       <Text>Informations</Text>
                </ListItem>
                <TouchableNativeFeedback onPress={() => this.props.onClickProfil()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-contact-outline" style={colorIcon} />
                        </Left>
                        <Body>
                          <Text style={textStyle}>Profile</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickFriends()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-people-outline" style={colorIcon} />
                        </Left>
                        <Body>
                            <Text style={textStyle}>Mes amis</Text>
                        </Body>
                        <Right />
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickEquipe()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-shirt-outline" style={colorIcon} />
                        </Left>
                        <Body>
                          <Text style={textStyle}>Retrouver des Equipes</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <ListItem icon>
                    <Left>
                        <Icon name="ios-football-outline" style={colorIcon} />
                    </Left>
                    <Body>
                      <Text style={textStyle}>Mes match</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Icon name="ios-git-branch-outline" style={colorIcon} />
                    </Left>
                    <Body>
                        <Text style={textStyle}>Liste des stades</Text>
                    </Body>
                </ListItem>
                <TouchableNativeFeedback onPress={this.onButtonPress.bind(this)}>
                    <ListItem icon>
                        <Left>
                            <Icon name="md-log-out" style={colorIcon} />
                        </Left>
                        <Body>
                          <Text style={textStyle}>Deconnexion</Text>
                        </Body>
                    </ListItem>
               </TouchableNativeFeedback>
            </Content>
        </Container>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = {
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width,
    justifyContent: 'flex-end',
    padding: 20
  },
  containerNavigation: {
    flex: 2,
    backgroundColor: '#F5F5F5'
  },
  colorIcon: {
    color: '#BDBDBD'
  },
  textStyle: {
    color: '#212121'
  },
  textUserStyle: {
    color: '#FFF'
  }
};
export default SideBar;
