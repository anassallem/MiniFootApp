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
import MembreEquipe from './components/MembreEquipe';
import AddMembresEquipe from './components/AddMembresEquipe';
import SelectAdjointEquipe from './components/SelectAdjointEquipe';
import SelectCapitaineEquipe from './components/SelectCapitaineEquipe';
import ShowTeamPhotos from './components/ShowTeamPhotos';
import Formation from './components/Formation';
import AddPlayersFormation from './components/AddPlayersFormation';
import CreateAdvertMatch from './components/CreateAdvertMatch';
import NotificationRejoindreTeam from './components/NotificationRejoindreTeam';
import MyPublications from './components/MyPublications';
import MesMatchs from './components/MesMatchs';
import CreateMatch from './components/CreateMatch';
import SearchStades from './components/SearchStades';
import ProfileStade from './components/ProfileStade';
import ReserverStade from './components/ReserverStade';
import Matchs from './components/Matchs';
import CreateAdvert from './components/CreateAdvert';
import MesAdvertsUser from './components/MesAdvertsUser';
import AdvertEventDetail from './components/AdvertEventDetail';
import DisplayPicture from './components/DisplayPicture';

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
              <Scene key="home" component={Home} title="home" hideNavBar />
              <Scene key="login" component={LoginForm} title="Login" hideNavBar />
              <Scene key="register" component={RegisterForm} title="Register" hideNavBar />
              <Scene key="profil" component={ProfilForm} title="Profil" hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="updateProfil" component={UpdateProfilUser} title="Modifier Profil" hideNavBar />
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
              <Scene key="membreEquipe" component={MembreEquipe} hideNavBar={false} hideNavBar />
              <Scene key="addMembresEquipe" component={AddMembresEquipe} hideNavBar={false} hideNavBar />
              <Scene key="searchTeam" component={SearchTeam} hideNavBar />
              <Scene key="searchTeamProfile" component={SearchTeamProfile} hideNavBar={false}
                  navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="updateProfilTeam" component={UpdateProfilTeam} title="Modifier Equipe" hideNavBar />
              <Scene key="selectAdjoint" component={SelectAdjointEquipe} hideNavBar={false} title="Select un sous responsable"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
          <Scene key="selectCapitaine" component={SelectCapitaineEquipe} hideNavBar={false} title="Select un responsable d'équipe"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="createAdvert" component={CreateAdvertMatch} />
              <Scene key="createAdvertUser" component={CreateAdvert} />
              <Scene key="mesAdvertsUser" component={MesAdvertsUser} hideNavBar={false} title="Mes annonces"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="formation" component={Formation} hideNavBar />
              <Scene key="addPlayersFormation" component={AddPlayersFormation} hideNavBar />
              <Scene key="showTeamPhotos" component={ShowTeamPhotos} title="Photos" hideNavBar />
              <Scene key="notificationRejoindreTeam" component={NotificationRejoindreTeam} hideNavBar={false} title="Invitations"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="myPublications" component={MyPublications} hideNavBar={false} title="Mes Publications"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="mesMatchs" component={MesMatchs} hideNavBar={false} title="Mes Matchs" hideNavBar />
              <Scene key="createMatch" component={CreateMatch} hideNavBar={false} hideNavBar />
              <Scene key="searchStades" component={SearchStades} hideNavBar />
              <Scene key="profileStade" component={ProfileStade} hideNavBar={false} title="profil"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="reserverStade" component={ReserverStade} hideNavBar={false} title="profil"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="matchs" component={Matchs} hideNavBar={false} title="Mes matchs"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="advertEventDetail" component={AdvertEventDetail} hideNavBar={false} title="Événement"
                navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} backButtonImage={icon}
              />
              <Scene key="displayPicture" component={DisplayPicture} hideNavBar />
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
