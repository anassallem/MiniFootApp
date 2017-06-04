import React, { Component } from 'react';
import { TouchableNativeFeedback, AsyncStorage, View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { URL } from '../../actions/api/config';

const logoEquipe = require('../assets/logoEquipe.jpg');

class ItemTeam extends Component {
    onPressButton() {
        const { team } = this.props;
        try {
            AsyncStorage.getItem('user').then((value) => {
                const user = JSON.parse(value);
                if (user.user.equipe === team._id) {
                    Actions.profileEquipe({ idEquipe: team._id });
                } else if (user.user.equipe === undefined) {
                    Actions.searchTeamProfile({ idEquipe: team._id, title: `${team.name}` });
                } else {
                    Actions.searchTeamProfile({ idEquipe: team._id, title: `${team.name}`, test: true });
                }
            }).done();
        } catch (e) {
            console.log('caught error', e);
        }
    }
    renderPhoto() {
      const { logo } = this.props.team;
      const uriImg = `${URL}/equipe/teamUploads/${logo}`;
      if (logo !== undefined) {
          return <Image source={{ uri: uriImg }} style={styles.styleImage} />;
      }
          return <Image source={logoEquipe} style={styles.styleImage} />;
    }
    render() {
        const { name, joueurs, adresse } = this.props.team;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <View style={styles.mainContainer}>
                    <View>
                        {this.renderPhoto()}
                    </View>
                    <View style={styles.containerBody}>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Nom d'équipe: </Text>
                            <Text style={styles.styleTitle}>{`${name}`}</Text>
                        </View>
                        <View style={styles.containerIcons}>
                            <View style={styles.containerInfo}>
                                <Icon name='ios-shirt-outline' style={styles.styleIcon} />
                                <Text style={styles.styleText}>{joueurs.length} joueurs</Text>
                            </View>
                            <View style={[styles.containerInfo, { backgroundColor: '#009688', marginLeft: 5 }]}>
                                <Icon name='ios-compass-outline' style={styles.styleIcon} />
                                <Text style={styles.styleText}>{adresse}</Text>
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
        flexDirection: 'row',
        marginTop: 5,
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    containerBody: {
        flexDirection: 'column',
        marginLeft: 10
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
        borderColor: '#B0BEC5',
        borderWidth: 0.5,
        borderRadius: 3,
        backgroundColor: '#2196F3'
    },
    containerTitle: {
        flexDirection: 'row',
    },
    containerIcons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleText: {
        fontSize: 12,
        color: '#FFFFFF'
    },
    styleTitle: {
        color: '#000000',
        fontSize: 14,
        marginBottom: 8
    },
    styleImage: {
        width: 50,
        height: 50
    },
    styleIcon: {
        color: '#FFFFFF',
        fontSize: 14,
        marginRight: 3
    },
    title: {
        fontSize: 14
    }
};

export { ItemTeam };
