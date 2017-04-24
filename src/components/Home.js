import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { Container, Tab, Tabs, TabHeading, Icon,
    Text, Button, Header, Right, Left, Body, Title, Drawer } from 'native-base';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Discussion from './Discussion';
import Equipe from './Equipe';
import { URL } from '../actions/api/config';
import { getSocket, getRoomUser } from '../actions';

class Home extends Component {
  constructor(props) {
      super(props);
      this.socket = io(URL, { jsonp: false });
      this.socket.emit('connection');
      try {
        AsyncStorage.getItem('user').then((value) => {
            const user = JSON.parse(value);
            this.socket.emit('add_user', user.user._id);
            this.props.getRoomUser(user.user._id);
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
      Actions.showTeamPhotos();
      this.closeDrawer();
  }
  closeDrawer = () => {
      this.drawer._root.close();
    };
  openDrawer = () => {
      this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
              ref={(ref) => { this.drawer = ref; }}
              content={<SideBar onClickProfil={this.handelProfile.bind(this)}
              onClickFriends={this.handelFriends.bind(this)} onClickEquipe={this.handelEquipe.bind(this)}
              onClickPhotos={this.handelPhotos.bind(this)}
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
                  <Tab heading={<TabHeading><Icon name="ios-notifications-outline" style={styles.styleIcon} /></TabHeading>}>
                      <Text>page 3</Text>
                  </Tab>
                  <Tab heading={<TabHeading><Icon name="ios-football-outline" style={styles.styleIcon} /></TabHeading>}>
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
  }
};
const mapStateToProps = ({ homeDiscussion }) => {
  const { rooms, socket } = homeDiscussion;
  return { rooms, socket };
};
export default connect(mapStateToProps, { getSocket, getRoomUser })(Home);
