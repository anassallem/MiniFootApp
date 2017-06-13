import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, AsyncStorage, Alert } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { URL } from '../../actions/api/config';
import { nommerSousCapitaine } from '../../actions';

class SingleMembreTeam extends Component {

    onPressSelectPlayer() {
        const { _id, joueur, firstname, lastname } = this.props.player.idJoueur;
        try {
          AsyncStorage.getItem('equipe').then((value) => {
              const equipe = JSON.parse(value);
              if (joueur.type === 'Responsable') {
                  Alert.alert('Information', `${firstname} ${lastname} est déja le responsable`);
              } else if (joueur.type === 'Sous Responsable') {
                  Alert.alert('Information', `${firstname} ${lastname} est déja sous responsable`);
              } else {
                  Alert.alert('Information', `Vous voulez vraiment nommée ${firstname} ${lastname} sous responsable`,
                  [{ text: 'Confirmer', onPress: () => this.props.nommerSousCapitaine(_id, equipe._id) }, { text: 'Annuler', onPress: () => console.log('OK Pressed!') }]);
              }
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }

    render() {
        const { firstname, lastname, photo, joueur } = this.props.player.idJoueur;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
            <TouchableNativeFeedback onPress={this.onPressSelectPlayer.bind(this)}>
                <View style={styles.mainContainer}>
                    <Image source={{ uri: uriImg }} style={styles.stylePhoto} />
                    <View style={styles.containerBody}>
                        <Text style={styles.textTitle}>{firstname} {lastname}</Text>
                        <View style={styles.rowStyle}>
                            <View style={styles.styleInfo}>
                                <Icon name='ios-contact-outline' style={styles.styleIcon} />
                                <Text style={styles.smallText}>{joueur.type}</Text>
                            </View>
                            <View style={styles.styleInfo}>
                                <Icon name='ios-football-outline' style={styles.styleIcon} />
                                <Text style={styles.smallText}>{joueur.poste}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = {
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE',
        padding: 5
    },
    stylePhoto: {
        height: 50,
        width: 50
    },
    containerBody: {
        flexDirection: 'column',
        marginLeft: 10
    },
    textTitle: {
        color: '#000000',
    },
    smallText: {
        fontSize: 12
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: 5
    },
    styleInfo: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    styleIcon: {
        fontSize: 10,
        marginRight: 5
    }
};

const mapStateToProps = ({ membreTeam }) => {
  const { players } = membreTeam;
  return { players };
};

export default connect(mapStateToProps, { nommerSousCapitaine })(SingleMembreTeam);
