import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import LoginForm from './LoginForm';
import Home from './Home';

class Accueil extends Component {
    constructor(props) {
    super(props);
    this.state = { user: 0 };
  }
    componentDidMount() {
        try {
             AsyncStorage.getItem('user', (err, user) => {
                 if (user !== null) {
                     this.setState({ user: 1 });
                 } else {
                     this.setState({ user: 2 });
                 }
            });
        } catch (e) {
            console.log('caught error', e);
        }
    }

    renderPageAccueil() {
        if (this.state.user === 2) {
            return <LoginForm />;
        } else if (this.state.user === 1) {
            return <Home />;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderPageAccueil()}
            </View>
        );
    }
}

export default Accueil;
