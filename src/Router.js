import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import NavigationStateHandler from 'react-native-router-flux-focus-hook';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Accueil from './components/Accueil';
import Home from './components/Home';
import ProfilForm from './components/ProfilForm';
import SearchPlayer from './components/SearchPlayer';
import SearchPlayerProfile from './components/SearchPlayerProfile';
import PlayerNoteForm from './components/PlayerNoteForm';
import UpdateProfilUser from './components/UpdateProfilUser';
import ListFriends from './components/ListFriends';
import Chat from './components/Chat';
import ProfileEquipe from './components/ProfileEquipe';
import SearchTeam from './components/SearchTeam';
import SearchTeamProfile from './components/SearchTeamProfile';
import UpdateProfilTeam from './components/UpdateProfilTeam';

const icon = require('./components/assets/back.png');

class RouterComponent extends Component {
    render() {
        const navigationStateHandler = new NavigationStateHandler();
        return (
          <Router
              createReducer={navigationStateHandler.getReducer.bind(navigationStateHandler)}
              navigationStateHandler={navigationStateHandler}
          >
            <Scene key="main" duration={1}>
              <Scene key="accueil" component={Accueil} title="Accueil" hideNavBar initial />
              <Scene key="home" component={Home} title="home" />
              <Scene key="login" component={LoginForm} title="Login" hideNavBar />
              <Scene key="register" component={RegisterForm} title="Register" hideNavBar />
              <Scene key="profil" component={ProfilForm} title="Profile" hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="updateProfil" component={UpdateProfilUser} title="Modifier Profile" hideNavBar />
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
              <Scene key="chat" component={Chat} title="Chat" hideNavBar={false} title="Mes amis"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="profileEquipe" component={ProfileEquipe} hideNavBar />
              <Scene key="searchTeam" component={SearchTeam} hideNavBar />
              <Scene key="searchTeamProfile" component={SearchTeamProfile} hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
            <Scene key="updateProfilTeam" component={UpdateProfilTeam} title="Modifier Equipe" hideNavBar />
           </Scene>
        </Router>
        );
    }
}
const styles = {
    navBar: {
        backgroundColor: '#0277BD',
    },
    navBarTitle: {
        color: '#FFFFFF'
    }
};
export default RouterComponent;
