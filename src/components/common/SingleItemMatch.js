import React, { Component } from 'react';
import { View, Image, Text, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';
import { URL } from '../../actions/api/config';

const logoEquipe = require('../assets/logoEquipe.jpg');

class SingleItemMatch extends Component {
    renderLogoTeam(logo) {
        if (logo !== undefined) {
            return <Image style={styles.styleLogo} source={{ uri: `${URL}/equipe/teamUploads/${logo}` }} />;
        }
        return <Image style={styles.styleLogo} source={logoEquipe} />;
    }
    renderButton() {
        const { match, idTeam } = this.props;
        if ((match.teamOne._id === idTeam) && ((match.etat === 0) || (match.etat === 1) || (match.etat === 2))) {
            return (
                <TouchableNativeFeedback onPress={() => { this.props.deleteMacth(match._id, null); }}>
                    <View style={styles.styleContainerDelete}>
                        <Icon name='ios-trash-outline' style={styles.styleIconDelete} />
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
    renderMessage() {
        const { match, idTeam } = this.props;
        if ((match.teamOne._id === idTeam) && (match.etat === 0)) {
            //test d'équipe qui a déposer le match (teamOne)
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>En attente l'acceptation de la deuxième équipe</Text>
                </View>
            );
        } else if ((match.etat === 0) && (match.teamOne._id !== idTeam)) {
            //test d'équipe (teamTwo) accepter ou rejeter le match
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>{match.teamOne.name} veux être votre adversaire</Text>
                    <View style={styles.containerTwoButton}>
                        <TouchableNativeFeedback onPress={() => { this.props.acceptMatch(match._id); }}>
                            <View style={[styles.styleButton, { marginRight: 10 }]}>
                                <Text style={styles.styleNameTeam}>Accepter</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => { this.props.rejectMatch(match._id); }}>
                            <View style={styles.styleButton}>
                                <Text style={styles.styleNameTeam}>Refuser</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            );
        } else if (match.etat === 1) {
            // si les deux équipe a accepter le match alors il peut réserver le stade
            return (
                <TouchableNativeFeedback onPress={() => { this.props.reserver(match._id, match.stade, match.teamOne, match.teamTow); }}>
                    <View style={styles.containerMessage}>
                        <Text style={styles.styleNameTeam}>Réserver</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        } else if (match.etat === 2) {
            // aprés la réservation on attendre la réservation
            return (
                <View style={styles.containerMessage}>
                    <Text style={styles.styleNameTeam}>En attente l'acceptation de la réservation</Text>
                </View>
            );
        } else if (match.etat === 3) {
            // aprés la réservation on peut annuler la réservation dans max délai 1 jour avant le match
            return (
                <TouchableNativeFeedback onPress={() => { this.props.deleteMacth(match._id, match.event.start); }}>
                    <View style={styles.containerMessage}>
                        <Text style={styles.styleNameTeam}>Annuler la réservation</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        } else if (match.etat === 4) {
            // aprés jouer le match on donne le score de match
            return (
                <TouchableNativeFeedback onPress={() => { this.props.addScore(match._id, match.teamOne, match.teamTow); }}>
                    <View style={styles.containerMessage}>
                        <Text style={styles.styleNameTeam}>Taper votre score</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }

    render() {
        const { teamOne, teamTow, scoreOne, scoreTow, stade } = this.props.match;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {this.renderButton()}
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
                        <Text style={styles.styleNameStade}>Ce match sera joué dans stade {stade.name}</Text>
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
    styleIconDelete: {
        color: '#FFFFFF'
    },
    styleContainerDelete: {
        alignSelf: 'flex-end'
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
    },
    containerTwoButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: '#FAFAFA',
        borderRadius: 10
    }
};

export { SingleItemMatch };
