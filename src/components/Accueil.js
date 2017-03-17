import React, { Component } from 'react';
import { AsyncStorage, BackAndroid } from 'react-native';
import getTheme from '../theme/components';
import material from '../theme/variables/material';
import { Actions } from 'react-native-router-flux';
import { Container, Tab, Tabs, TabHeading, Icon,
     Text, Button, Header, Right, Left, Body, Title, Drawer, StyleProvider } from 'native-base';
import SideBar from './SideBar';

class Accueil extends Component {
  componentWillMount() {
    const route = this.props.title;
    BackAndroid.addEventListener('hardwareBackPress', function() {
     if (route === 'Accueil') {
      //BackAndroid.exitApp();
      return false;
     }
     return true;
    });
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
              content={<SideBar />}
              onClose={() => this.closeDrawer()}
      >
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header hasTabs>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                    <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                  <Title>Header</Title>
              </Body>
              <Right />
          </Header>
          <Container>
              <Tabs>
                  <Tab heading={<TabHeading><Icon name="ios-keypad-outline" style={styles.styleIcon} /></TabHeading>}>
                    <Text>page 1</Text>
                  </Tab>
                  <Tab heading={<TabHeading><Icon name="ios-chatbubbles-outline" style={styles.styleIcon} /></TabHeading>}>
                      <Text>page 2</Text>
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
      </StyleProvider>
      </Drawer>
    );
  }
}

const styles = {
  styleIcon: {
    color: '#616161',
  }
};
export default Accueil;
