import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
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
              if (equipe !== null) {
                this.props.changeStepTow(equipe);
              }
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
            AsyncStorage.removeItem('equipe');
            this.props.initialState();
        } catch (e) { console.log('caught error', e); }
    }
    renderPage() {
      const { steps } = this.props;
      switch (steps) {
        case 0:
          return <CreateEquipe buttonPress={this.onButtonPressCreate.bind(this)} />;
        case 1:
          return <CreateEquipeStepOne buttonPress={this.onButtonPressCreate.bind(this)} />;
        case 2:
          return <MenuEquipe buttonPressQuit={this.onPressQuitEquipe.bind(this)} />;
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
  const { steps, team } = equipe;
  return { steps, team };
};

export default connect(mapStateToProps, { changeStepOne, changeStepTow, initialState })(Equipe);
