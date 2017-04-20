import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, AsyncStorage, Alert } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { URL } from '../../actions/api/config';
import { deletePlayer } from '../../actions';

class MembreTeam extends Component {
    onPressDelete() {
        const { _id } = this.props.player.idJoueur;
        try {
          AsyncStorage.getItem('equipe').then((value) => {
              const equipe = JSON.parse(value);
              AsyncStorage.getItem('user').then((data) => {
                  const user = JSON.parse(data);
                  if (equipe.createdBy === _id) {
                      Alert.alert('Attention', "Vous ne pouvez pas supprimer le responsable de l'équipe");
                  } else if (user.user.joueur.type === 'Responsable' || user.user.joueur.type === 'Sous Responsable') {
                      this.props.deletePlayer(equipe._id, _id);
                  } else {
                      Alert.alert('Attention', "Vous n'avez pas le droit du supprimer");
                  }
              }).done();
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }
    render() {
        const { firstname, lastname, city, photo, joueur } = this.props.player.idJoueur;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
            <Swipeable rightButtons={[
                      <TouchableNativeFeedback onPress={this.onPressDelete.bind(this)}>
                          <View style={styles.styleDelete}>
                              <Icon name='ios-trash-outline' style={styles.styleIconDelete} />
                          </View>
                      </TouchableNativeFeedback>
                    ]} rightButtonWidth={100}
            >
                <View style={styles.mainContainer}>
                    <Image source={{ uri: uriImg }} style={styles.stylePhoto} />
                    <View style={styles.containerBody}>
                        <Text style={styles.textTitle}>{firstname} {lastname}</Text>
                        <View style={styles.rowStyle}>
                            <View style={styles.styleInfo}>
                                <Icon name='ios-locate-outline' style={styles.styleIcon} />
                                <Text style={styles.smallText}>{city}</Text>
                            </View>
                            <View style={styles.styleInfo}>
                                <Icon name='ios-contact-outline' style={styles.styleIcon} />
                                <Text style={styles.smallText}>{joueur.age}</Text>
                            </View>
                            <View style={styles.styleInfo}>
                                <Icon name='ios-football-outline' style={styles.styleIcon} />
                                <Text style={styles.smallText}>{joueur.poste}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Swipeable>
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
    },
    styleDelete: {
        justifyContent: 'center',
        paddingLeft: 40,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#E53935'
    },
    styleIconDelete: {
        fontSize: 30,
        color: '#FFFFFF'
    }
};

const mapStateToProps = ({ membreTeam }) => {
  const { players } = membreTeam;
  return { players };
};

export default connect(mapStateToProps, { deletePlayer })(MembreTeam);
