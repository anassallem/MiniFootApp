import React, { Component } from 'react';
import { View, ListView, Text, Image, TouchableNativeFeedback, TextInput, ScrollView, RefreshControl } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { getListComment, descriptionCommentChanged, addCommentAdvert, deleteCommentAdvert } from '../actions';
import { URL } from '../actions/api/config';

const background = require('./assets/events.jpg');
const logoStade = require('./assets/photostade.jpg');

class AdvertEventDetail extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentDidMount() {
        this.props.getListComment(this.props.advert._id, this.props.page);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    onChangeDescription(text) {
        this.props.descriptionCommentChanged(text);
    }
    onEndReached() {
        this.props.getListComment(this.props.advert._id, this.props.page);
    }
    handleClickSend() {
        const comment = { advert: this.props.advert._id, description: this.props.text, postedBy: this.props.user._id };
        const postedBy = { _id: this.props.user._id, firstname: this.props.user.firstname, lastname: this.props.user.lastname, photo: this.props.user.photo };
        this.props.addCommentAdvert(comment, postedBy);
    }
    handleClickDelete(comment, tag) {
        this.props.deleteCommentAdvert(comment._id);
    }
    createDataSource({ comments }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(comments);
    }
    renderIconDelete(comment) {
        if (comment.postedBy._id === this.props.user._id) {
            return (
                <TouchableNativeFeedback onPress={this.handleClickDelete.bind(this, comment)}>
                    <Icon name='ios-close-outline' style={{ color: '#929292', alignSelf: 'center', marginRight: 10 }} />
                </TouchableNativeFeedback>
            );
        }
    }
    renderRow(comment) {
        const uriImg = `${URL}/users/upload/${comment.postedBy.photo}`;
        return (
            <View style={styles.containerComment}>
                <Image source={{ uri: uriImg }} style={styles.styleImageUserComment} />
                <View style={[styles.containerBodyComment, { flex: 1 }]}>
                    <View style={styles.containerNameUserComment}>
                        <Text style={styles.textBlue}>{comment.postedBy.firstname} {comment.postedBy.lastname}</Text>
                        {this.renderIconDelete(comment)}
                    </View>
                    <Text style={styles.textBlack}>{comment.description}</Text>
                    <Text style={styles.textDateComment}>{moment(comment.createdAt).format('LLL')}</Text>
                </View>
            </View>
        );
    }
    renderPhotoEvent() {
        if (this.props.advert.advertEvent.image !== undefined) {
            const uriImg = `${URL}/adverts/uploadEvent/${this.props.advert.advertEvent.image}`;
            return <Image source={{ uri: uriImg }} style={styles.imageStyle} />;
        }
        return <Image source={background} style={styles.imageStyle} />;
    }
    renderPhotoStade() {
        if (this.props.advert.advertEvent.createdBy.photos.length > 0) {
            const uriImg = `${URL}/stade/stadeUploads/${this.props.advert.advertEvent.createdBy.photos[0]}`;
            return <Image source={{ uri: uriImg }} resizeMode='contain' style={styles.logoStyle} />;
        }
        return <Image source={logoStade} resizeMode='stretch' style={styles.logoStyle} />;
    }
    render() {
        const uriImg = `${URL}/users/upload/${this.props.user.photo}`;
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    {this.renderPhotoEvent()}
                    <View style={styles.userContainer}>
                        {this.renderPhotoStade()}
                        <View style={styles.containerName}>
                            <Text style={styles.styleNameUser}>{this.props.advert.advertEvent.createdBy.name}</Text>
                            <Text style={styles.styledate}>{moment(this.props.advert.createdAt).fromNow()}</Text>
                        </View>
                        <Icon name='ios-calendar-outline' style={{ fontSize: 18, alignSelf: 'center', marginLeft: 10 }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.styleText}>
                                {this.props.advert.advertEvent.title}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containerDate}>
                        <Icon name='ios-clock-outline' />
                        <View style={styles.containerDateEvent}>
                            <Text style={styles.styleDateEvent}>Date début</Text>
                            <Text style={styles.styleDateEventSmall}>{moment(this.props.advert.advertEvent.dateBegin).format('LL')}</Text>
                        </View>
                        <Icon name='ios-clock-outline' />
                        <View style={styles.containerDateEvent}>
                            <Text style={styles.styleDateEvent}>Date fin</Text>
                            <Text style={styles.styleDateEventSmall}>{moment(this.props.advert.advertEvent.dateEnd).format('LL')}</Text>
                        </View>
                    </View>
                    <View style={styles.containerDescription}>
                        <Text style={styles.textBlue}>Description</Text>
                        <View style={styles.hr} />
                        <Text style={styles.styleDescription}>
                            {this.props.advert.advertEvent.description}
                        </Text>
                    </View>
                    <View style={styles.containerComment}>
                        <Image source={{ uri: uriImg }} style={styles.styleImageUser} />
                        <TextInput placeholder='Ecrire une description...' value={this.props.text} onChangeText={this.onChangeDescription.bind(this)} underlineColorAndroid={'transparent'} style={styles.styleInput} />
                        <TouchableNativeFeedback onPress={this.handleClickSend.bind(this)}>
                            <Icon name='md-send' style={styles.styleIcon} />
                        </TouchableNativeFeedback>
                    </View>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            onEndReached={this.onEndReached.bind(this)}
                            onEndReachedThreshold={5}
                            refreshControl={
                                <RefreshControl
                                    tintColor='blue'
                                    colors={['#64B5F6', '#2196F3', '#1976D2']}
                                    refreshing={this.props.refreshing}
                                />
                            }
                        />
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    mainContainer: {
        flex: 1,
        marginTop: 54,
        backgroundColor: '#F5F5F5'
    },
    imageStyle: {
        width: null,
        height: 200,
        marginBottom: 10
    },
    logoStyle: {
        width: 40,
        height: 40,
    },
    userContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        padding: 10
    },
    containerName: {
        flexDirection: 'column',
        marginLeft: 10,
        paddingRight: 10,
        borderRightWidth: 0.5,
        borderRightColor: '#EEEEEE'
    },
    styleNameUser: {
        color: '#0D47A1'
    },
    styledate: {
        fontSize: 12
    },
    styleText: {
        marginLeft: 5,
        width: 220,
        color: '#000000'
    },
    containerDate: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        padding: 10,
        marginTop: 5,
        backgroundColor: '#FFFFFF'
    },
    containerDateEvent: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleDateEvent: {
        fontSize: 18,
        color: '#000000'
    },
    styleDateEventSmall: {
        fontSize: 12,
    },
    styleDescription: {
        color: '#000000',
        marginBottom: 10
    },
    containerDescription: {
        padding: 10,
        marginTop: 5,
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF'
    },
    hr: {
        marginBottom: 5,
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    containerComment: {
        padding: 5,
        marginTop: 5,
        paddingLeft: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleImageUser: {
        width: 30,
        height: 30
    },
    styleImageUserComment: {
        width: 40,
        height: 40
    },
    styleInput: {
        flex: 1,
        marginLeft: 10
    },
    containerBodyComment: {
        flexDirection: 'column',
        marginLeft: 10
    },
    textBlue: {
        color: '#0D47A1'
    },
    textBlack: {
        color: '#000000',
        fontSize: 14
    },
    textDateComment: {
        fontSize: 12
    },
    styleIcon: {
        color: '#0D47A1',
        marginRight: 5
    },
    containerNameUserComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
};

const mapStateToProps = ({ advertEventDetail, homeDiscussion }) => {
  const { comments, page, text, refreshing } = advertEventDetail;
  const { user } = homeDiscussion;
  return { comments, page, text, refreshing, user };
};
export default connect(mapStateToProps, { getListComment, descriptionCommentChanged, addCommentAdvert, deleteCommentAdvert })(AdvertEventDetail);
