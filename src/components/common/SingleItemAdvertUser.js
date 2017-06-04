import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { TouchableNativeFeedback, View, Image, Text } from 'react-native';
import { Card } from 'native-base';
import { URL } from '../../actions/api/config';

const logoUser = require('../assets/userdefault.png');

class SingleItemAdvertUser extends Component {
    onClickNameUser() {
        const { createdBy } = this.props.advert.advertUser;
        if (this.props.idUser === createdBy._id) {
            Actions.profil();
        } else {
            Actions.searchPlayerProfile({ player: createdBy, title: `${createdBy.firstname} ${createdBy.lastname}` });
        }
    }
    renderPhotoUser() {
        if (this.props.advert.advertUser.createdBy.photo !== undefined) {
            const uriImg = `${URL}/users/upload/${this.props.advert.advertUser.createdBy.photo}`;
            return <Image source={{ uri: uriImg }} style={styles.logoStyle} />;
        }
        return <Image source={logoUser} style={styles.logoStyle} />;
    }
    renderButtonDelete() {
        if (this.props.delete) {
            return (
                <TouchableNativeFeedback onPress={() => { this.props.onPressDelete(this.props.advert._id) }}>
                    <View style={styles.containerDelete}>
                        <Text style={styles.styleDelete}>Supprimer</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
    render() {
        return (
            <Card>
                <View style={styles.mainContainer}>
                    <View style={styles.userContainer}>
                        {this.renderPhotoUser()}
                        <View style={styles.containerName}>
                            <TouchableNativeFeedback onPress={this.onClickNameUser.bind(this)}>
                                <Text style={styles.styleNameUser}>{this.props.advert.advertUser.createdBy.firstname} {this.props.advert.advertUser.createdBy.lastname}</Text>
                            </TouchableNativeFeedback>
                            <Text style={styles.styledate}>{moment(this.props.advert.createdAt).fromNow()}</Text>
                        </View>
                        {this.renderButtonDelete()}
                    </View>
                    <Text style={styles.styleDescription}>
                        {this.props.advert.advertUser.description}
                    </Text>
                </View>
            </Card>
        );
    }
}

const styles = {
    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoStyle: {
       width: 40,
       height: 40,
    },
    containerName: {
        flexDirection: 'column',
        marginLeft: 10,
        flex: 4
    },
    containerDelete: {
        alignSelf: 'flex-start',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#EF5350'
    },
    styleNameUser: {
        color: '#0D47A1'
    },
    styledate: {
        fontSize: 12
    },
    styleDescription: {
        color: '#000000',
        marginTop: 10,
        marginBottom: 10
    },
    styleDelete: {
        fontSize: 12,
        color: '#EF5350'
    }
};

export { SingleItemAdvertUser };
