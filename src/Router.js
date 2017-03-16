import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Accueil from './components/Accueil';
import ProfilForm from './components/ProfilForm';

const RouterComponent = () => {
    return (
      <Router>
        <Scene key="auth" hideNavBar>
          <Scene key="login" component={LoginForm} title="Login" initial />
          <Scene key="register" component={RegisterForm} title="Register" />
        </Scene>
        <Scene key="main" hideNavBar>
          <Scene key="accueil" component={Accueil} title="Accueil" initial />
          <Scene key="profil" component={ProfilForm} title="Profile" />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
