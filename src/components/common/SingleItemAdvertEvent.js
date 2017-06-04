import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { TouchableNativeFeedback, View, Image, Text } from 'react-native';
import { Card } from 'native-base';
import { URL } from '../../actions/api/config';

const logoStade = require('../assets/photostade.jpg');

class SingleItemAdvertEvent extends Component {
    onClickNameStade() {
    }
    onClickCard() {
        Actions.advertEventDetail({ advert: this.props.advert });
    }
    renderPhotoStade() {
        if (this.props.advert.advertEvent.createdBy.photos.length > 0) {
            const uriImg = `${URL}/stade/stadeUploads/${this.props.advert.advertEvent.createdBy.photos[0]}`;
            return <Image source={{ uri: uriImg }} style={styles.logoStyle} />;
        }
        return <Image source={logoStade} style={styles.logoStyle} />;
    }
    renderPhotoEvent() {
        if (this.props.advert.advertEvent.image !== undefined) {
            const uriImg = `${URL}/adverts/uploadEvent/${this.props.advert.advertEvent.image}`;
            return (
                    <Image source={{ uri: uriImg }} resizeMode='stretch' style={styles.imageStyle}>
                        <View style={styles.containerImage}>
                            <View style={styles.styleTitleEvent}>
                                <Icon name='ios-calendar-outline' style={styles.styleIconLeft} />
                                <Text style={styles.textWhite} numberOfLines={1} ellipsizeMode='tail'>
                                    {this.props.advert.advertEvent.title}
                                </Text>
                            </View>
                        </View>
                    </Image>
            );
        }
    }
    renderTitleAndDescription() {
        if (this.props.advert.advertEvent.image === undefined) {
            return (
                <View style={styles.containerDescription}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5 }}>
                        <Icon name='ios-calendar-outline' style={{ marginRight: 5 }} />
                        <Text style={styles.styleDescription} numberOfLines={1} ellipsizeMode='tail'>
                            {this.props.advert.advertEvent.title}
                        </Text>
                    </View>
                    <Text style={styles.styleDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {this.props.advert.advertEvent.description}
                    </Text>
                </View>
            );
        }
        return (
            <View style={styles.containerDescription}>
                <Text style={styles.styleDescription} numberOfLines={3} ellipsizeMode='tail'>
                    {this.props.advert.advertEvent.description}
                </Text>
            </View>
        );
    }
    render() {
        return (
            <Card>
                <TouchableNativeFeedback onPress={this.onClickCard.bind(this)}>
                    <View style={styles.mainContainer}>
                        {this.renderPhotoEvent()}
                        <View style={styles.userContainer}>
                            {this.renderPhotoStade()}
                            <View style={styles.containerName}>
                                <TouchableNativeFeedback onPress={this.onClickNameStade.bind(this)}>
                                    <Text style={styles.styleNameUser}>{this.props.advert.advertEvent.createdBy.name}</Text>
                                </TouchableNativeFeedback>
                                <Text style={styles.styledate}>{moment(this.props.advert.createdAt).fromNow()}</Text>
                            </View>
                        </View>
                        <View style={styles.hr} />
                        <View style={styles.containerBody}>
                            <View style={styles.containerDate}>
                                <Text style={styles.styleDay}>{moment(this.props.advert.advertEvent.dateBegin).format('D')}</Text>
                                <Text style={styles.styleMonth}>{moment(this.props.advert.advertEvent.dateBegin).format('MMM')}</Text>
                            </View>
                            {this.renderTitleAndDescription()}
                        </View>
                    </View>
                </TouchableNativeFeedback>
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
    imageStyle: {
        width: null,
        height: 200,
        marginBottom: 8,
        justifyContent: 'flex-end'
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
        fontSize: 14,
        marginRight: 40,
        color: '#000000'
    },
    styleDelete: {
        fontSize: 12,
        color: '#EF5350'
    },
    hr: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE',
        marginTop: 8,
        marginBottom: 8
    },
    containerBody: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    containerDescription: {
        marginTop: 5,
        marginLeft: 10
    },
    containerDate: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20,
        borderRightWidth: 0.5,
        borderRightColor: '#EEEEEE'
    },
    styleDay: {
        fontSize: 25,
        color: '#000000'
    },
    styleMonth: {
        fontSize: 10
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    styleIconLeft: {
        color: '#FFFFFF'
    },
    textWhite: {
        color: '#FFFFFF',
        marginLeft: 5
    },
    styleTitleEvent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
};

export { SingleItemAdvertEvent };
