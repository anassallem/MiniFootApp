import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

class CreateEquipe extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
               <Icon name='ios-chatbubbles' style={styles.styleIcon} />
               <Text style={styles.styleTextTitle}>Avez vous une équipe ?</Text>
               <Text style={styles.styleText}>Appuyez sur le boutton pour la créer</Text>
               <TouchableNativeFeedback onPress={this.props.buttonPress}>
                   <View style={styles.buttonStyle}>
                     <Text style={styles.textButtonStyle}>
                       Créer une équipe
                     </Text>
                   </View>
              </TouchableNativeFeedback>
           </View>
        );
    }
}
//backgroundColor: 'rgba(0,0,0,0.2)',
const styles = {
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextTitle: {
      fontSize: 18,
      color: '#000000'
    },
    styleText: {
      fontSize: 16,
      color: '#BDBDBD'
    },
    styleIcon: {
      fontSize: 170,
      color: '#9E9E9E'
    },
    buttonStyle: {
       marginTop: 20,
       justifyContent: 'center',
       backgroundColor: '#00ACC1',
       padding: 8,
       paddingLeft: 50,
       paddingRight: 50,
       marginBottom: 10
     },
     textButtonStyle: {
       color: '#FFFFFF',
       alignSelf: 'center'
     }
};

const mapStateToProps = ({ equipe }) => {
  const { steps } = equipe;
  return { steps };
};

export default connect(mapStateToProps, null)(CreateEquipe);
