import React, { Component } from 'react';
import moment from 'moment';
import { TouchableNativeFeedback, View, Dimensions } from 'react-native';
import { CardItem, Body, Card, Text, Left, Icon, Thumbnail } from 'native-base';
import { URL } from '../../actions/api/config';

const logo = require('../assets/logoEquipe.jpg');

class SingleItemPublication extends Component {
    onPressButton() {
    }
    clickInteressted() {

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

    renderLogoTeam() {
        if (this.props.advert.createdBy.logo !== undefined) {
            return <Thumbnail square source={{ uri: `${URL}/equipe/teamUploads/${this.props.advert.createdBy.logo}` }} />;
        }
        return <Thumbnail square source={logo} />;
    }
    render() {
        const { createdBy, description, createdAt, interested } = this.props.advert;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <Card>
                   <CardItem>
                       <Left>
                         {this.renderLogoTeam()}
                         <Body>
                             <Text>{createdBy.name}</Text>
                             <Text note>{moment(createdAt).fromNow()}</Text>
                         </Body>
                       </Left>
                   </CardItem>
                   <CardItem content style={styles.styleContainerBody}>
                       <Text>{description}</Text>
                       <View style={styles.containerTitle}>
                           <Text style={styles.styleTitle}>Disponibilité d équipe</Text>
                       </View>
                       <View style={styles.containerDisponibility}>
                          {this.renderListDisponibility()}
                       </View>
                   </CardItem>
                   <CardItem style={styles.styleContainerFooter}>

                     <View style={styles.styleFooter}>
                         <View style={styles.styleNbrInterested}>
                             <Text style={{ marginRight: 8, marginLeft: 8 }}>{interested.length}</Text>
                             <Icon active name="ios-football-outline" style={{ fontSize: 18 }} />
                         </View>
                     </View>
                   </CardItem>
                </Card>
            </TouchableNativeFeedback>
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
        alignItems: 'flex-start'
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

export default SingleItemPublication;
