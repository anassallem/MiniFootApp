import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { Container, Tab, Tabs, TabHeading, Icon, Text, Drawer } from 'native-base';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Discussion from './Discussion';
import Equipe from './Equipe';
import Notification from './Notification';
import ListAdverts from './ListAdverts';
import { URL } from '../actions/api/config';
import { Headers } from './common';
import { getUserCache, getSocket, getRoomUser, initialStateHome, changeNumberNotify, changePage, changeNumberEquipe, changeNumberAdverts } from '../actions';

class Home extends Component {

  componentWillMount() {
      this.socket = io(URL, { jsonp: false });
      this.socket.emit('connection');
      try {
        AsyncStorage.getItem('user').then((value) => {
            const user = JSON.parse(value);
            this.props.getUserCache(user);
            this.socket.emit('add_user', user.user._id);
            this.props.getRoomUser(user.user._id);
            this.socket.on(user.user._id, (notification) => {
                this.props.changeNumberNotify();
                this.props.changePage('Notification');
            });
            this.socket.on(user.user.equipe, (rejoindre) => {
              if (user.user._id !== rejoindre.joinTeam.from) {
                this.props.changeNumberEquipe();
              }
            });
            this.socket.on('new_advert', (advert) => {
                this.props.changeNumberAdverts();
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
  handleMesAdverts() {
      Actions.mesAdvertsUser();
      this.closeDrawer();
  }
  handelEquipe() {
      Actions.searchTeam();
      this.closeDrawer();
  }
  handleMatchs() {
      Actions.matchs();
      this.closeDrawer();
  }
  handleListStade() {
      Actions.searchStades();
      this.closeDrawer();
  }
  handelDeconnexion() {
      try {
          this.props.socket.emit('disconnect', this.props.user._id);
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('equipe');
          this.props.initialStateHome();
          Actions.login({ type: 'reset' });
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
  handelSearch() {
      Actions.searchPlayer();
  }
  handelDrawer() {
      this.openDrawer();
  }
  handelInitialNumberNotify() {
      this.props.initialNumberNotifyHome();
  }
  renderNumberNotificationAdverts() {
      const { numberNotifyAdverts } = this.props;
      if (numberNotifyAdverts !== 0) {
          return (<View style={styles.styleContainerNotification}>
                      <Text style={styles.styleNotify}>{numberNotifyAdverts}</Text>
                  </View>);
      }
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
  renderListAdverts() {
      if (this.props.user !== null) {
          return <ListAdverts user={this.props.user} />;
      }
  }
  render() {
    return (
      <Drawer
              ref={(ref) => { this.drawer = ref; }}
              content={<SideBar onClickProfil={this.handelProfile.bind(this)}
              onClickFriends={this.handelFriends.bind(this)} onClickEquipe={this.handelEquipe.bind(this)}
              onClickMatchs={this.handleMatchs.bind(this)}
              onClickListStades={this.handleListStade.bind(this)}
              onClickDeconnexion={this.handelDeconnexion.bind(this)}
              onClickAdverts={this.handleMesAdverts.bind(this)}
              tweenDuration={100}
              />}
              onClose={() => this.closeDrawer()}
      >
        <Container>
            <Headers onPressSearch={this.handelSearch.bind(this)} openDrawer={this.handelDrawer.bind(this)} />
          <Container>
              <Tabs>
                  <Tab heading={<TabHeading>
                                    <Icon name="ios-keypad-outline" style={styles.styleIcon} />
                                    {this.renderNumberNotificationAdverts()}
                                </TabHeading>}
                  >
                    {this.renderListAdverts()}
                  </Tab>

                  <Tab heading={<TabHeading><Icon name="ios-chatbubbles-outline" style={styles.styleIcon} /></TabHeading>}>
                    <Discussion socket={this.props.socket} />
                  </Tab>

                  <Tab heading={<TabHeading>
                                    <Icon name="ios-notifications-outline" style={styles.styleIcon} />
                                    {this.renderNumberNotification()}
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
  const { user, rooms, socket, numberNotify, notify, menu, numberNotifyTeam, numberNotifyAdverts } = homeDiscussion;
  return { user, rooms, socket, numberNotify, notify, menu, numberNotifyTeam, numberNotifyAdverts };
};
export default connect(mapStateToProps, { getUserCache, getSocket, getRoomUser, initialStateHome, changeNumberNotify, changePage, changeNumberEquipe, changeNumberAdverts })(Home);
