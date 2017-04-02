import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Accueil from './components/Accueil';
import ProfilForm from './components/ProfilForm';
import SearchPlayer from './components/SearchPlayer';
import SearchPlayerProfile from './components/SearchPlayerProfile';
import PlayerNoteForm from './components/PlayerNoteForm';
import ListFriends from './components/ListFriends';

const icon = require('./components/assets/back.png');

class RouterComponent extends Component {

    render() {
        return (
          <Router>
            <Scene key="auth" hideNavBar>
              <Scene key="login" component={LoginForm} title="Login" initial />
              <Scene key="register" component={RegisterForm} title="Register" />
            </Scene>
            <Scene key="main">
              <Scene key="accueil" component={Accueil} title="Accueil" hideNavBar initial />
              <Scene key="profil" component={ProfilForm} title="Profile" hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="searchPlayer" component={SearchPlayer} hideNavBar />
              <Scene key="searchPlayerProfile" component={SearchPlayerProfile} hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="playerNoteForm" component={PlayerNoteForm} hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
          <Scene key="listFriends" component={ListFriends} hideNavBar={false} title="Mes amis"
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
           </Scene>
        </Router>
        );
    }
}
const styles = {
    navBar: {
        backgroundColor: '#00796B',
    },
    navBarTitle: {
        color: '#FFFFFF'
    }
};
export default RouterComponent;
