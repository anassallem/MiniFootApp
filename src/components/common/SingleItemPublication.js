import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { TouchableNativeFeedback, View, Dimensions, Alert } from 'react-native';
import { CardItem, Body, Card, Text, Left, Icon, Thumbnail, Right } from 'native-base';
import { URL } from '../../actions/api/config';
import { getListInteresstedPublication, deleteAdvert } from '../../actions';

const logo = require('../assets/logoEquipe.jpg');

class SingleItemPublication extends Component {
    onPressButton() {
        this.props.getListInteresstedPublication(this.props.advert._id);
    }
    onPressButtonDelete() {
        if (this.props.user.joueur.type !== 'Joueur') {
            Alert.alert('Attention', 'Vous voulez vraiment supprimer cette annonce',
            [{ text: 'Confirmer', onPress: () => this.props.deleteAdvert(this.props.advert._id) }, { text: 'Annuler', onPress: () => console.log('OK Pressed!') }]);
        } else {
            Alert.alert('Attention', "Vous n'avez pas le droit du supprimer");
        }
    }
    clickInteressted() {

    }
    renderListDisponibility() {
        return this.props.advert.advertTeam.disponibility.map((item) => {
            return (
                <View key={Math.random(100)} style={styles.styleDisponibility}>
                    <Text>{item}</Text>
                </View>
            );
        });
    }

    renderLogoTeam() {
        if (this.props.advert.advertTeam.createdBy.logo !== undefined) {
            return <Thumbnail square source={{ uri: `${URL}/equipe/teamUploads/${this.props.advert.advertTeam.createdBy.logo}` }} />;
        }
        return <Thumbnail square source={logo} />;
    }
    render() {
        const { createdBy, description, interested } = this.props.advert.advertTeam;
        return (
                <Card>
                   <CardItem>
                       <Left>
                         {this.renderLogoTeam()}
                         <Body>
                             <Text>{createdBy.name}</Text>
                             <Text note>{moment(this.props.advert.createdAt).fromNow()}</Text>
                         </Body>
                       </Left>
                       <Right>
                           <TouchableNativeFeedback onPress={this.onPressButtonDelete.bind(this)}>
                               <Icon name='ios-trash-outline' style={styles.styleIconDelete} />
                           </TouchableNativeFeedback>
                       </Right>
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
                         <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                             <View style={styles.styleNbrInterested}>
                                 <Text style={{ marginRight: 8, marginLeft: 8 }}>{interested.length}</Text>
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
    },
    styleIconDelete: {
        color: '#F44336',
        fontSize: 30
    }
};

const mapStateToProps = ({ homeDiscussion }) => {
  const { user } = homeDiscussion;
  return { user };
};

export default connect(mapStateToProps, { getListInteresstedPublication, deleteAdvert })(SingleItemPublication);
