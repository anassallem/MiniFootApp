import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { URL } from '../actions/api/config';

const logoEquipe = require('./assets/logoEquipe.jpg');

class MenuEquipe extends Component {

    onPressEquipe() {
        Actions.profileEquipe({ idEquipe: this.props.team._id, title: this.props.team.name });
    }

    onPressFormation() {

    }

    onPressPictures() {
      Actions.showTeamPhotos();
    }

    onPressMembreEquipe() {
        Actions.membreEquipe({ idEquipe: this.props.team._id, user: this.props.user });
    }

    onPressRename() {
        Actions.selectAdjoint({ idEquipe: this.props.team._id });
    }
    onPressRenameCapitaine() {
        Actions.selectCapitaine({ idEquipe: this.props.team._id });
    }
    renderImageEquipe() {
        if (this.props.team.logo !== undefined) {
            const logoUri = `${URL}/equipe/teamUploads/${this.props.team.logo}`;
            return <Image source={{ uri: logoUri }} style={styles.logoStyle} />;
        }
        return <Image source={logoEquipe} style={styles.logoStyle} />;
    }
    renderRenameSousCapitaine() {
        if (this.props.user.joueur.type !== 'Joueur') {
            return (
                <TouchableNativeFeedback onPress={this.onPressRename.bind(this)}>
                    <View style={styles.rowStyle}>
                            <View style={[styles.containerIcon, { backgroundColor: '#00ACC1' }]}>
                                <Icon name='ios-contacts-outline' style={styles.styleIcon} />
                            </View>
                            <Text style={styles.styleText}>Nommer sous responsable d'équipe</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
    renderRenameCapitaine() {
        if (this.props.user.joueur.type === 'Responsable') {
            return (
                <TouchableNativeFeedback onPress={this.onPressRenameCapitaine.bind(this)}>
                    <View style={styles.rowStyle}>
                        <View style={[styles.containerIcon, { backgroundColor: '#3F51B5' }]}>
                            <Icon name='ios-contacts-outline' style={styles.styleIcon} />
                        </View>
                        <Text style={styles.styleText}>Nommer un responsable d'équipe</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
               <TouchableNativeFeedback onPress={this.onPressEquipe.bind(this)}>
                   <View style={styles.rowLogoStyle}>
                       {this.renderImageEquipe()}
                       <View style={styles.containerText}>
                           <Text style={styles.styleText}>{this.props.team.name}</Text>
                           <Text style={styles.styleMinText}>Voir profile equipe</Text>
                       </View>
                   </View>
               </TouchableNativeFeedback>
               <TouchableNativeFeedback onPress={this.onPressFormation.bind(this)}>
                   <View style={styles.rowStyle}>
                           <View style={[styles.containerIcon, { backgroundColor: '#00796B' }]}>
                               <Icon name='ios-git-network-outline' style={styles.styleIcon} />
                           </View>
                           <Text style={styles.styleText}>Formation</Text>
                   </View>
               </TouchableNativeFeedback>
               <TouchableNativeFeedback onPress={this.onPressMembreEquipe.bind(this)}>
                   <View style={styles.rowStyle}>
                           <View style={[styles.containerIcon, { backgroundColor: '#AA00FF' }]}>
                               <Icon name='ios-people-outline' style={styles.styleIcon} />
                           </View>
                           <Text style={styles.styleText}>Membres d'équipe</Text>
                   </View>
               </TouchableNativeFeedback>
               <TouchableNativeFeedback onPress={this.onPressPictures.bind(this)}>
                   <View style={styles.rowStyle}>
                           <View style={[styles.containerIcon, { backgroundColor: '#E64A19' }]}>
                               <Icon name='ios-images-outline' style={styles.styleIcon} />
                           </View>
                           <Text style={styles.styleText}>Photos d'équipe</Text>
                   </View>
               </TouchableNativeFeedback>
               {this.renderRenameSousCapitaine()}
               {this.renderRenameCapitaine()}
               <TouchableNativeFeedback onPress={this.props.buttonPressQuit}>
                   <View style={styles.rowStyle}>
                           <View style={[styles.containerIcon, { backgroundColor: '#757575' }]}>
                               <Icon name='ios-log-out-outline' style={styles.styleIcon} />
                           </View>
                           <Text style={styles.styleText}>Quitter l'équipe</Text>
                   </View>
               </TouchableNativeFeedback>
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
  const { team } = equipe;
  return { team };
};

export default connect(mapStateToProps, null)(MenuEquipe);
