import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { Container, Tab, Tabs, TabHeading, Icon, Text, Button, Header, Right, Left, Body, Title, Drawer } from 'native-base';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Discussion from './Discussion';
import Equipe from './Equipe';
import Notification from './Notification';
import { URL } from '../actions/api/config';
import { getSocket, getRoomUser, initialStateHome, changeNumberNotify, changePage, changeNumberEquipe } from '../actions';

class Home extends Component {

  componentWillMount() {
      this.socket = io(URL, { jsonp: false });
      this.socket.emit('connection');
      try {
        AsyncStorage.getItem('user').then((value) => {
            const user = JSON.parse(value);
            this.socket.emit('add_user', user.user._id);
            this.props.getRoomUser(user.user._id);
            this.socket.on(user.user._id, (notification) => {
                this.props.changeNumberNotify();
                this.props.changePage('Notification');
            });
            this.socket.on(user.user.equipe, (rejoindre) => {
              if (!(user.user._id)) {
                this.props.changeNumberEquipe();
              }
            });
        }).done();
      } catch (e) {
        console.log('caught error', e);
      }
      this.props.getSocket(this.socket);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.rooms.forEach((room) => {
        nextProps.socket.emit('room', room._id);
    });
  }
  handelProfile() {
      Actions.profil();
      this.closeDrawer();
  }
  handelFriends() {
      Actions.listFriends();
      this.closeDrawer();
  }
  handelEquipe() {
      Actions.searchTeam();
      this.closeDrawer();
  }
  handelPhotos() {
      this.closeDrawer();
    }
  handelDeconnexion() {
      try {
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('equipe');
          this.props.initialStateHome();
          Actions.login();
       } catch (e) {
         console.log('caught error', e);
       }
  }
  closeDrawer = () => {
      this.drawer._root.close();
    };
  openDrawer = () => {
      this.drawer._root.open();
  };
  handelInitialNumberNotify() {
      this.props.initialNumberNotifyHome();
  }
  renderNumberNotification() {
      const { numberNotify } = this.props;
      if (numberNotify !== 0) {
          return (<View style={styles.styleContainerNotification}>
                      <Text style={styles.styleNotify}>{numberNotify}</Text>
                  </View>);
      }
  }
  renderNumberNotificationTeam() {
      const { numberNotifyTeam } = this.props;
      if (numberNotifyTeam !== 0) {
          return (<View style={styles.styleContainerNotification}>
                      <Text style={styles.styleNotify}>{numberNotifyTeam}</Text>
                  </View>);
      }
  }
  render() {
      //onPress={() => { this.props.changePage('Notification'); }}
    return (
      <Drawer
              ref={(ref) => { this.drawer = ref; }}
              content={<SideBar onClickProfil={this.handelProfile.bind(this)}
              onClickFriends={this.handelFriends.bind(this)} onClickEquipe={this.handelEquipe.bind(this)}
              onClickPhotos={this.handelPhotos.bind(this)}
              onClickDeconnexion={this.handelDeconnexion.bind(this)}
              />}
              onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header hasTabs searchBar rounded>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>Header</Title>
              </Body>
              <Right>
                  <Button transparent onPress={() => Actions.searchPlayer()}>
                      <Icon name='md-search' />
                  </Button>
              </Right>
          </Header>
          <Container>
              <Tabs>
                  <Tab heading={<TabHeading><Icon name="ios-keypad-outline" style={styles.styleIcon} /></TabHeading>}>
                    <Text>page 1</Text>
                  </Tab>
                  <Tab heading={<TabHeading><Icon name="ios-chatbubbles-outline" style={styles.styleIcon} /></TabHeading>}>
                    <Discussion socket={this.props.socket} />
                  </Tab>
                  <Tab heading={<TabHeading>
                              <Icon name="ios-notifications-outline" style={styles.styleIcon} />{this.renderNumberNotification()}
                          </TabHeading>}
                  >
                      <Notification initialNumberNotify={this.handelInitialNumberNotify.bind(this)} />
                  </Tab>
                  <Tab heading={<TabHeading>
                                  <Icon name="ios-football-outline" style={styles.styleIcon} />
                                  {this.renderNumberNotificationTeam()}
                                </TabHeading>}
                  >
                      <Equipe />
                  </Tab>
              </Tabs>
          </Container>
        </Container>
      </Drawer>
    );
  }
}

const styles = {
  styleIcon: {
    color: '#616161',
  },
  styleContainerNotification: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 17,
    height: 17,
    borderRadius: 8.5,
    marginTop: -15,
    marginLeft: -8
  },
  styleNotify: {
      color: '#FFFFFF',
      fontSize: 10
  }
};
const mapStateToProps = ({ homeDiscussion }) => {
  const { rooms, socket, numberNotify, notify, menu, numberNotifyTeam } = homeDiscussion;
  return { rooms, socket, numberNotify, notify, menu, numberNotifyTeam };
};
export default connect(mapStateToProps, { getSocket, getRoomUser, initialStateHome, changeNumberNotify, changePage, changeNumberEquipe })(Home);
