import React, { Component } from 'react';
import { TouchableNativeFeedback, AsyncStorage, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';

class ItemPlayer extends Component {
    onPressButton() {
        const { player } = this.props;
        try {
             AsyncStorage.getItem('user').then((value) => {
                 const user = JSON.parse(value);
                 if (user.user._id === player._id) {
                   Actions.profil();
               } else {
                   Actions.searchPlayerProfile({ player, title: `${player.firstname} ${player.lastname}` });
               }
             }).done();
           } catch (e) {
               console.log('caught error', e);
           }
    }
    renderPostePlayer() {
        const { joueur } = this.props.player;
        switch (joueur.poste) {
            case 'Attaque':
                return <Text style={styles.textStyleAC}>{joueur.poste}</Text>;
            case 'Milieu':
                return <Text style={styles.textStyleMC}>{joueur.poste}</Text>;
            case 'Defence':
                return <Text style={styles.textStyleDF}>{joueur.poste}</Text>;
            case 'Gardien':
                return <Text style={styles.textStyleGB}>{joueur.poste}</Text>;
            default:
        }
    }
    render() {
        const { firstname, lastname, photo } = this.props.player;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <View style={styles.mainContainer}>
                    <Thumbnail source={{ uri: uriImg }} />
                    <View style={styles.containerBody}>
                        <Text>{`${firstname} ${lastname}`}</Text>
                        {this.renderPostePlayer()}
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
const styles = {
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    containerBody: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    textStyleAC: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        color: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#FAFAFA',
        backgroundColor: '#F44336',
        fontSize: 12,
        width: 65
    },
    textStyleMC: {
        paddingLeft: 17,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        color: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#FAFAFA',
        backgroundColor: '#3F51B5',
        fontSize: 12,
        width: 65
    },
    textStyleDF: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        color: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#FAFAFA',
        backgroundColor: '#FDD835',
        width: 66,
        fontSize: 12,
    },
    textStyleGB: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        color: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#FAFAFA',
        backgroundColor: '#4CAF50',
        fontSize: 12,
        width: 65
    }
};

export { ItemPlayer };
