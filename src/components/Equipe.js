import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import CreateEquipe from './CreateEquipe';
import CreateEquipeStepOne from './CreateEquipeStepOne';
import MenuEquipe from './MenuEquipe';
import { changeStepOne, changeStepTow } from '../actions';

class Equipe extends Component {
    componentDidMount() {
        /*try {
          AsyncStorage.getItem('equipe').then((value) => {
              const equipe = JSON.parse(value);
              if (equipe) {

              }
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }*/
    }

    onButtonPressCreate() {
        this.props.changeStepOne();
    }

    renderPage() {
      const { steps } = this.props;
      switch (steps) {
        case 0:
          return <CreateEquipe buttonPress={this.onButtonPressCreate.bind(this)} />;
        case 1:
          return <CreateEquipeStepOne buttonPress={this.onButtonPressCreate.bind(this)} />;
        default:
          return <CreateEquipe buttonPress={this.onButtonPressCreate.bind(this)} />;
      }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
               <MenuEquipe />
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
  const { steps } = equipe;
  return { steps };
};

export default connect(mapStateToProps, { changeStepOne, changeStepTow })(Equipe);
