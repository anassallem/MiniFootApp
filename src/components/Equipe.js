import React, { Component } from 'react';
import { View, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CreateEquipe from './CreateEquipe';
import CreateEquipeStepOne from './CreateEquipeStepOne';
import MenuEquipe from './MenuEquipe';
import { changeStepOne, changeStepTow, initialState } from '../actions';

class Equipe extends Component {

    componentDidMount() {
        try {
          AsyncStorage.getItem('equipe').then((value) => {
              const equipe = JSON.parse(value);
              AsyncStorage.getItem('user').then((player) => {
                const user = JSON.parse(player);
                this.props.changeStepTow(equipe, user);
              }).done();
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }

    onButtonPressCreate() {
        this.props.changeStepOne();
    }
    onPressQuitEquipe() {
        try {
            AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              if (user.user.joueur.type === 'Responsable') {
                  Alert.alert('Attention', "Vous devez spécifier un responsable d'équipe avant de quitter");
              } else {
                  user.user.joueur.type = 'Joueur';
                  AsyncStorage.mergeItem('user', JSON.stringify(user), () => {
                      AsyncStorage.getItem('equipe').then((data) => {
                          const equipe = JSON.parse(data);
                          this.props.initialState(equipe._id, user.user._id);
                      }).done();
                  });
              }
          }).done();
        } catch (e) { console.log('caught error', e); }
    }
    renderPage() {
      const { steps, user, refresh } = this.props;
      if (refresh) {
          return (<View style={{ justifyContent: 'center', flex: 1 }} >
                    <ActivityIndicator size={'large'} color={['#1565C0']} />
                  </View>
                 );
      }
      switch (steps) {
          case 0:
          return <CreateEquipe buttonPress={this.onButtonPressCreate.bind(this)} />;
          case 1:
          return <CreateEquipeStepOne buttonPress={this.onButtonPressCreate.bind(this)} />;
          case 2:
          return <MenuEquipe buttonPressQuit={this.onPressQuitEquipe.bind(this)} user={user} />;
          default:
          return <CreateEquipe buttonPress={this.onButtonPressCreate.bind(this)} />;
      }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
              {this.renderPage()}
            </View>
        );
    }
}
const styles = {
    mainContainer: {
        flex: 1
    }
};

const mapStateToProps = ({ equipe }) => {
  const { steps, team, user, refresh } = equipe;
  return { steps, team, user, refresh };
};

export default connect(mapStateToProps, { changeStepOne, changeStepTow, initialState })(Equipe);
