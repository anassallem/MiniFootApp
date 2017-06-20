import React, { Component } from 'react';
import { TouchableNativeFeedback, AsyncStorage, View, Dimensions } from 'react-native';
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
  renderNumberNotification() {
      if (this.props.notifyFriend > 0) {
          return <Text style={styles.styleNotify}>{this.props.notifyFriend}</Text>;
      }
  }
  renderUser() {
      const { backgroundImage, textUserStyle } = styles;
      if (user !== null) {
          const uriImg = `${URL}/users/upload/${user.user.photo}`;
          return (
              <Thumbnail style={backgroundImage} square source={background}>
                   <Thumbnail source={{ uri: uriImg }}
                    style={{ width: 80, height: 80, alignSelf: 'center' }}
                   />
               <Text style={textUserStyle}>{user.user.firstname} {user.user.lastname}</Text>
                   <View style={styles.containerInfo}>
                       <View style={styles.containerBodyInfo}>
                           <Icon name='ios-shirt-outline' style={styles.styleIcon} />
                           <Text style={styles.textWhite}>{user.user.joueur.poste}</Text>
                       </View>
                       <View style={styles.containerBodyInfo}>
                           <Icon name='ios-man-outline' style={styles.styleIcon} />
                           <Text style={styles.textWhite}>{user.user.joueur.taille} cm</Text>
                       </View>
                       <View style={styles.containerBodyInfoLast}>
                           <Icon name='ios-speedometer-outline' style={styles.styleIcon} />
                           <Text style={styles.textWhite}>{user.user.joueur.poid} Kg</Text>
                       </View>
                   </View>
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
                          <Text style={textStyle}>Profil</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickFriends()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-people-outline" style={colorIcon} />
                        </Left>
                        <Body>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={textStyle}>Mes amis</Text>
                                {this.renderNumberNotification()}
                            </View>
                        </Body>
                        <Right />
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickAdverts()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-albums-outline" style={colorIcon} />
                        </Left>
                        <Body>
                            <Text style={textStyle}>Mes annonces</Text>
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
                <TouchableNativeFeedback onPress={() => this.props.onClickMatchs()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-football-outline" style={colorIcon} />
                        </Left>
                        <Body>
                          <Text style={textStyle}>Mes matchs</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickListStades()}>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-git-branch-outline" style={colorIcon} />
                        </Left>
                        <Body>
                            <Text style={textStyle}>Liste des stades</Text>
                        </Body>
                    </ListItem>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.props.onClickDeconnexion()}>
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

const width = (Dimensions.get('window').width - (Dimensions.get('window').width / 5)) - 40;
const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    padding: 20,
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
    color: '#FFF',
    alignSelf: 'center'
  },
  containerInfo: {
      flexDirection: 'row',
      borderTopWidth: 0.5,
      marginTop: 10,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderTopColor: '#FFFFFF'
  },
  containerBodyInfo: {
      flexDirection: 'column',
      borderRightWidth: 0.5,
      borderRightColor: '#FFFFFF',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 3
  },
  containerBodyInfoLast: {
      flexDirection: 'column',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 3
  },
  textWhite: {
      color: '#FFFFFF',
      fontSize: 14
  },
  styleIcon: {
      color: '#FFFFFF',
      fontSize: 20
  },
  styleNotify: {
      backgroundColor: 'red',
      color: '#FFFFFF',
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 14
  }
};
export default SideBar;
