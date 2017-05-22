import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';
import { URL } from '../../actions/api/config';

const logoEquipe = require('../assets/logoEquipe.jpg');

class SingleMatch extends Component {
    renderLogoTeam(logo) {
        if (logo !== undefined) {
            return <Image style={styles.styleLogo} source={{ uri: `${URL}/equipe/teamUploads/${logo}` }} />;
        }
        return <Image style={styles.styleLogo} source={logoEquipe} />;
    }
    renderMessage() {
        const { match } = this.props;
        if (match.etat === 1) {
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>En attente la réservation de capitaine</Text>
                </View>
            );
        } else if (match.etat === 2) {
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>En attente l'acceptation de la réservation</Text>
                </View>
            );
        } else if ((match.etat === 3) || (match.etat === 4)) {
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>Date de match: {moment(match.event.start).format('DD/MM/YYYY')}</Text>
                </View>
            );
        }
    }

    render() {
        const { teamOne, teamTow, scoreOne, scoreTow, stade, etat } = this.props.match;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.containerBody}>
                        <View style={styles.containerTeam}>
                            {this.renderLogoTeam(teamOne.logo)}
                            <Text style={styles.styleNameTeam}>{teamOne.name}</Text>
                        </View>
                        <View style={styles.containerScore}>
                            <Text style={styles.styleScore}>{scoreOne}</Text>
                            <Text style={styles.styleScore}>:</Text>
                            <Text style={styles.styleScore}>{scoreTow}</Text>
                        </View>
                        <View style={styles.containerTeam}>
                            {this.renderLogoTeam(teamTow.logo)}
                            <Text style={styles.styleNameTeam}>{teamTow.name}</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.containerStade}>
                        <Icon name='ios-compass-outline' style={{ color: '#FAFAFA' }} />
                        <Text style={styles.styleNameStade}>{(etat === 5) ? 'Match joué dans stade' : 'Ce match sera joué dans stade' } {stade.name}</Text>
                    </View>
                </View>
                {this.renderMessage()}
            </View>
        );
    }
}

const styles = {
    mainContainer: {
        flexDirection: 'column'
    },
    container: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 5,
        marginLeft: 20,
        marginRight: 20
    },
    containerTeam: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerScore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerMessage: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        marginTop: 2,
        marginLeft: 20,
        marginRight: 20,
        padding: 10
    },
    containerBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    styleScore: {
        fontSize: 40,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5
    },
    styleNameTeam: {
        color: '#FFFFFF'
    },
    containerStade: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hr: {
        margin: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#FFFFFF'
    },
    styleNameStade: {
        color: '#FFFFFF',
        marginLeft: 10
    }
};

export { SingleMatch };
