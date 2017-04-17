import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, ListView, Image, Dimensions, ScrollView } from 'react-native';
import { Icon, Button, Header, Right, Body, Title } from 'native-base';
//import { connect } from 'react-redux';

const logoEquipe = require('./assets/logoEquipe.jpg');
const imgUser = require('./assets/userdefault.png');
//const imgEquipe = require('./assets/imgEquipe.jpg');

class ProfileEquipe extends Component {
    constructor(props) {
        super(props);
        this.state = { photosEquipe: [{ id: 1, image: logoEquipe }, { id: 2, image: logoEquipe },
                                      { id: 3, image: logoEquipe }, { id: 4, image: logoEquipe },
                                      { id: 5, image: logoEquipe }, { id: 6, image: logoEquipe }],
                       photos: [{ id: 1, name: 'Riadh', image: imgUser }, { id: 2, name: 'Mohamed', image: imgUser },
                                { id: 3, name: 'Youssef', image: imgUser }, { id: 4, name: 'Nabil', image: imgUser },
                                { id: 5, name: 'Anas', image: imgUser }, { id: 6, name: 'Salem', image: imgUser },
                                { id: 7, name: 'Marwan', image: imgUser }, { id: 8, name: 'Fredj', image: imgUser }],
                       matchs: [{ id: 1, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
                                { id: 2, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
                                { id: 3, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 },
                                { id: 4, image: logoEquipe, equipeOne: 'Fc Barcalone', scoreOne: 2, equipeTow: 'Real Madrid', scoreTow: 2 }]
                      };
    }

    componentWillMount() {
        this.createDataSource(this.state);
        this.createDataSourcePlayers(this.state);
        this.createDataSourceMatchs(this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        this.createDataSourceMatchs(this.state);
    }
    onButtonUpdate() {

    }
    createDataSource({ photosEquipe }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(photosEquipe);
    }
    createDataSourcePlayers({ photos }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.playerDataSource = ds.cloneWithRows(photos);
    }
    createDataSourceMatchs({ matchs }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.MatchDataSource = ds.cloneWithRows(matchs);
    }
    renderRow(photo) {
        return <Image source={photo.image} style={styles.photoTeamStyle} />;
    }
    renderRowPlayer(player) {
        return (<View style={styles.containerPlayerImage}>
                  <Image source={player.image} style={styles.photoPlayerStyle} />
                  <Text style={styles.styleTextPhoto}>{player.name}</Text>
                </View>);
    }
    renderRowMatch(match) {
        return (<View style={styles.containerMatchs}>
                    <Text style={styles.nameEquipeMatchStyle}>{match.equipeOne}</Text>
                    <Image source={match.image} style={styles.logoMatch} />
                    <View style={styles.scoreStyle}>
                        <Text style={styles.textScoreStyle}>{match.scoreOne}</Text>
                    </View>
                    <View style={styles.scoreStyle}>
                        <Text style={styles.textScoreStyle}>{match.scoreTow}</Text>
                    </View>
                    <Image source={match.image} style={styles.logoMatch} />
                    <Text style={styles.nameEquipeMatchStyle}>{match.equipeTow}</Text>
                </View>);
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header style={styles.headerStyle}>
                  <Body>
                      <Title>Mon Equipe</Title>
                  </Body>
                  <Right>
                      <TouchableNativeFeedback onPress={this.onButtonUpdate.bind(this)}>
                      <Text style={styles.textHeaderStyle}>Modifier</Text>
                      </TouchableNativeFeedback>
                  </Right>
                </Header>
                <ScrollView>
                    <View style={styles.containerTop}>
                        <Image source={logoEquipe} style={styles.styleLogo} />
                        <Text style={styles.styleNameEquipe}>Name Equipe</Text>
                        <Text numberOfLines={3} style={styles.styleDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                        <View style={styles.containerButton}>
                            <Button iconLeft light bordered style={{ marginRight: 20 }}>
                                <Icon name='ios-albums-outline' style={styles.styleIconButton} />
                               <Text>Annonces</Text>
                           </Button>
                           <Button iconLeft light bordered>
                               <Icon name='arrow-forward' style={styles.styleIconButton} />
                              <Text>Rejoindre</Text>
                          </Button>
                        </View>
                    </View>
                    <View style={styles.containerInfo}>
                        <View style={styles.containerBodyInfo}>
                            <Icon name='ios-person-outline' style={styles.styleIcon} />
                            <Text>Riadh Mkhinini</Text>
                        </View>
                        <View style={styles.containerBodyInfo}>
                            <Icon name='ios-navigate-outline' style={styles.styleIcon} />
                            <Text>Sousse</Text>
                        </View>
                        <View style={styles.containerBodyInfo}>
                            <Icon name='ios-calendar-outline' style={styles.styleIcon} />
                            <Text>Riadh Mkhinini</Text>
                        </View>
                    </View>
                    <ListView
                      enableEmptySections
                      dataSource={this.dataSource}
                      renderRow={this.renderRow}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.containerPlayersTitle}>
                        <Text style={styles.styleTextTitle}>Membres d'équipe</Text>
                    </View>
                    <ListView
                      enableEmptySections
                      dataSource={this.playerDataSource}
                      renderRow={this.renderRowPlayer}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.containerPlayersTitle}>
                        <Text style={styles.styleTextTitle}>Matchs joués</Text>
                    </View>
                    <ListView
                      enableEmptySections
                      dataSource={this.MatchDataSource}
                      renderRow={this.renderRowMatch}
                    />
                </ScrollView>
           </View>

        );
    }
}

const { width } = Dimensions.get('window');
const styles = {
    mainContainer: {
        flex: 1
    },
    headerStyle: {
        marginBottom: 10
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    containerTop: {
        alignItems: 'center'
    },
    styleLogo: {
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#EEEEEE'
    },
    styleNameEquipe: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        fontWeight: '700'
    },
    styleDescription: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    styleIconButton: {
        color: '#9E9E9E'
    },
    containerInfo: {
        flexDirection: 'row',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#E0E0E0'
    },
    containerBodyInfo: {
        flexDirection: 'column',
        borderRightWidth: 0.5,
        borderRightColor: '#E0E0E0',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3
    },
    styleIcon: {
        color: '#7D7D7D'
    },
    photoTeamStyle: {
        width: 80,
        height: 80,
        margin: 5,
        borderColor: '#9E9E9E',
        borderWidth: 1,
        borderRadius: 5
    },
    containerPlayersTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#E0E0E0',
        padding: 10
    },
    containerPlayerImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextTitle: {
        fontSize: 16,
        color: '#4A86E8'
    },
    styleTextPhoto: {
        fontSize: 12
    },
    photoPlayerStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 8,
        borderColor: '#9E9E9E',
        borderWidth: 1
    },
    containerMatchs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoMatch: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
        borderColor: '#9E9E9E',
        borderWidth: 1
    },
    nameEquipeMatchStyle: {
        fontSize: 14,
        margin: 5,
        color: '#434343'
    },
    scoreStyle: {
        margin: 5,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#9E9E9E',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    textScoreStyle: {
        margin: 5,
        color: '#434343',
        fontSize: 10
    }
};

export default ProfileEquipe;
