import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

const logoEquipe = require('./assets/logoEquipe.jpg');

class MenuEquipe extends Component {
    
    onPressFormation() {

    }

    onPressMembreEquipe() {

    }

    onPressRename() {

    }

    onPressQuitEquipe() {

    }

    render() {
        return (
            <View style={styles.mainContainer}>
               <View style={styles.rowLogoStyle}>
                   <Image source={logoEquipe} style={styles.logoStyle} />
                   <View style={styles.containerText}>
                       <Text style={styles.styleText}>Equipe</Text>
                       <Text style={styles.styleMinText}>Voir profile equipe</Text>
                   </View>
               </View>
               <View style={styles.rowStyle}>
                   <TouchableNativeFeedback onPress={this.onPressFormation.bind(this)}>
                       <View style={[styles.containerIcon, { backgroundColor: '#00796B' }]}>
                           <Icon name='ios-git-network-outline' style={styles.styleIcon} />
                       </View>
                       <Text style={styles.styleText}>Formation</Text>
                   </TouchableNativeFeedback>
               </View>
               <View style={styles.rowStyle}>
                   <TouchableNativeFeedback onPress={this.onPressMembreEquipe.bind(this)}>
                       <View style={[styles.containerIcon, { backgroundColor: '#E64A19' }]}>
                           <Icon name='ios-people-outline' style={styles.styleIcon} />
                       </View>
                       <Text style={styles.styleText}>Membres d'équipe</Text>
                   </TouchableNativeFeedback>
               </View>
               <View style={styles.rowStyle}>
                   <TouchableNativeFeedback onPress={this.onPressRename.bind(this)}>
                       <View style={[styles.containerIcon, { backgroundColor: '#00ACC1' }]}>
                           <Icon name='ios-contacts-outline' style={styles.styleIcon} />
                       </View>
                       <Text style={styles.styleText}>Nommer sous capitaine</Text>
                   </TouchableNativeFeedback>
               </View>
               <View style={styles.rowStyle}>
                   <TouchableNativeFeedback onPress={this.onPressQuitEquipe.bind(this)}>
                       <View style={[styles.containerIcon, { backgroundColor: '#757575' }]}>
                           <Icon name='ios-log-out-outline' style={styles.styleIcon} />
                       </View>
                       <Text style={styles.styleText}>Quitter l'équipe</Text>
                   </TouchableNativeFeedback>
               </View>
           </View>
        );
    }
}
const styles = {
    mainContainer: {
        flex: 1,
    },
    rowLogoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFFFFF'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFFFFF'
    },
    logoStyle: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    containerText: {
        flexDirection: 'column',
    },
    containerIcon: {
        borderRadius: 3,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    styleText: {
        fontSize: 14,
        color: '#000000'
    },
    styleMinText: {
        fontSize: 12,
        color: '#BDBDBD'
    },
    styleIcon: {
        fontSize: 16,
        color: '#FFFFFF'
    }
};


const mapStateToProps = ({ equipe }) => {
  const { steps } = equipe;
  return { steps };
};

export default connect(mapStateToProps, null)(MenuEquipe);
