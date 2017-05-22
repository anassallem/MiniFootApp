import React, { Component } from 'react';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { TouchableNativeFeedback, View, Dimensions } from 'react-native';
import { CardItem, Body, Card, Text, Left, Icon, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { deleteInterrested, addNewInterrested, getListInteressted } from '../../actions';
import { URL } from '../../actions/api/config';

const logo = require('../assets/logoEquipe.jpg');

class SingleItemAdvert extends Component {
    onPressButton() {
        this.props.getListInteressted(this.props.advert._id);
    }
    onPressTeam() {
        const { user, advert } = this.props;
         if (user.equipe === advert.createdBy._id) {
            Actions.profileEquipe({ idEquipe: advert.createdBy._id });
         } else if (user.equipe === undefined) {
           Actions.searchTeamProfile({ idEquipe: advert.createdBy._id, title: `${advert.createdBy.name}` });
         } else {
            Actions.searchTeamProfile({ idEquipe: advert.createdBy._id, title: `${advert.createdBy.name}`, test: true });
         }
    }
    clickAddInteressted() {
        this.props.addNewInterrested(this.props.advert._id, this.props.user._id);
    }
    clickDeleteInteressted() {
        this.props.deleteInterrested(this.props.advert._id, this.props.user._id);
    }
    renderListDisponibility() {
        return this.props.advert.disponibility.map((item) => {
            return (
                <View key={Math.random(100)} style={styles.styleDisponibility}>
                    <Text>{item}</Text>
                </View>
            );
        });
    }
    renderInterested() {
        if (this.props.loadInterrested) {
            return (<View style={{ flexDirection: 'row' }}>
                        <Icon active name="ios-football-outline" style={styles.styleIconClicked} />
                        <Text style={styles.styleTextClicked}>envoyer...</Text>
                    </View>
            );
        }
        if (this.props.advert.testInterested) {
            return (
                <TouchableNativeFeedback onPress={this.clickDeleteInteressted.bind(this)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon active name="ios-football-outline" style={styles.styleIconClicked} />
                        <Text style={styles.styleTextClicked}>intéresser</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return (
            <TouchableNativeFeedback onPress={this.clickAddInteressted.bind(this)}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon active name="ios-football-outline" style={styles.styleIconNopClicked} />
                    <Text style={styles.styleTextNopClicked}>intéresser</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
    renderLogoTeam() {
        if (this.props.advert.createdBy.logo !== undefined) {
            return <Thumbnail style={{ width: 50, height: 50 }} square source={{ uri: `${URL}/equipe/teamUploads/${this.props.advert.createdBy.logo}` }} />;
        }
        return <Thumbnail style={{ width: 50, height: 50 }} square source={logo} />;
    }
    render() {
        const { createdBy, description, createdAt, countInterested } = this.props.advert;
        return (
                <Card>
                   <CardItem style={{ borderLeftWidth: 10, borderLeftColor: '#00BCD4' }}>
                       <Left>
                         {this.renderLogoTeam()}
                         <Body>
                             <TouchableNativeFeedback onPress={this.onPressTeam.bind(this)}>
                                 <Text style={styles.styleNameTeam}>{createdBy.name}</Text>
                             </TouchableNativeFeedback>
                             <Text note>{moment(createdAt).fromNow()}</Text>
                         </Body>
                       </Left>
                   </CardItem>
                   <CardItem content style={styles.styleContainerBody}>
                       <Text>{description}</Text>
                       <View style={styles.containerTitle}>
                           <Text style={styles.styleTitle}>Disponibilité d'équipe</Text>
                       </View>
                       <View style={styles.containerDisponibility}>
                          {this.renderListDisponibility()}
                       </View>
                   </CardItem>
                   <CardItem style={styles.styleContainerFooter}>
                     <View style={styles.styleFooter}>
                         {this.renderInterested()}
                        <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                             <View style={styles.styleNbrInterested}>
                                 <Text style={{ marginRight: 8, marginLeft: 8 }}>{countInterested}</Text>
                                 <Icon active name="ios-football-outline" style={{ fontSize: 18 }} />
                             </View>
                        </TouchableNativeFeedback>
                     </View>
                   </CardItem>
                </Card>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = {
    styleContainerFooter: {
        backgroundColor: '#FAFAFA',
    },
    styleFooter: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    styleNameTeam: {
        color: '#0D47A1'
    },
    styleNbrInterested: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#EEEEEE',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3
    },
    styleIconClicked: {
        fontSize: 20,
        color: '#2196F3'
    },
    styleTextClicked: {
        fontSize: 14,
        color: '#2196F3'
    },
    styleIconNopClicked: {
        fontSize: 20,
        color: '#9E9E9E'
    },
    styleTextNopClicked: {
        fontSize: 14,
        color: '#9E9E9E'
    },
    containerDisponibility: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleContainerBody: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderLeftWidth: 10,
        borderLeftColor: '#00BCD4'
    },
    styleDisponibility: {
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        borderRadius: 20,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5
    },
    containerTitle: {
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        width: width - 40,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    styleTitle: {
        color: '#9E9E9E'
    }
};
const mapStateToProps = ({ listAdverts }) => {
    const { loadInterrested } = listAdverts;
    return { loadInterrested };
};
export default connect(mapStateToProps, { deleteInterrested, addNewInterrested, getListInteressted })(SingleItemAdvert);
