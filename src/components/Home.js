import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tab, Tabs, TabHeading, Icon,
    Text, Button, Header, Right, Left, Body, Title, Drawer } from 'native-base';
import SideBar from './SideBar';
import Discussion from './Discussion';

class Home extends Component {
  handelProfile() {
      Actions.profil();
      this.closeDrawer();
  }
  handelFriends() {
      Actions.listFriends();
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
              content={<SideBar onClickProfil={this.handelProfile.bind(this)} onClickFriends={this.handelFriends.bind(this)} />}
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
                    <Discussion />  
                  </Tab>
                  <Tab heading={<TabHeading><Icon name="ios-notifications-outline" style={styles.styleIcon} /></TabHeading>}>
                      <Text>page 3</Text>
                  </Tab>
                  <Tab heading={<TabHeading><Icon name="ios-football-outline" style={styles.styleIcon} /></TabHeading>}>
                      <Text>page 4</Text>
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
export default Home;