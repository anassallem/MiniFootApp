import React, { Component } from 'react';
import { View, Text, ListView, TouchableNativeFeedback, Image, Dimensions, ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import { Icon, Button, Header, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTeam, getImagesTeamProfil, getIdUser, getPlayerBelongsTeam, cancelRejoindreTeam } from '../actions';
import { URL } from '../actions/api/config';

const logoEquipe = require('./assets/logoEquipe.jpg');
//const imgUser = require('./assets/userdefault.png');

class SearchTeamProfile extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
        this.createDataSourcePlayers(this.props);
        this.createDataSourceMatchs(this.props);
    }

    componentDidMount() {
      this.onRefresh();
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        this.createDataSourcePlayers(nextProps);
        this.createDataSourceMatchs(nextProps);
    }

    onRefresh() {
       this.props.getTeam(this.props.idEquipe);
       this.props.getImagesTeamProfil(this.props.idEquipe);
       try {
            AsyncStorage.getItem('user').then((value) => {
                const user = JSON.parse(value);
                this.props.getIdUser(user.user.equipe);
                this.props.getPlayerBelongsTeam(user.user._id, this.props.idEquipe);
            }).done();
          } catch (e) {
              console.log('caught error', e);
          }
    }

    onRejoindreTeam() {
      try {
           AsyncStorage.getItem('user').then((value) => {
               const user = JSON.parse(value);
               const rejoin = { idUser: user.user._id, idEquipe: this.props.idEquipe };
               this.props.socket.emit('rejoindreTeam', rejoin);
               this.onRefresh();
           }).done();
         } catch (e) {
             console.log('caught error', e);
         }
    }
    onCancelRejoindreTeam() {
      const { playerRejoindreTeam } = this.props;
      this.props.cancelRejoindreTeam(playerRejoindreTeam.data._id);
    }
    onPressAnnonces() {
        Actions.myPublications({ team: this.props.team });
    }

    createDataSource({ photosEquipe }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(photosEquipe);
    }
    createDataSourcePlayers({ team }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.playerDataSource = ds.cloneWithRows(team.joueurs);
    }
    createDataSourceMatchs({ matchs }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.MatchDataSource = ds.cloneWithRows(matchs);
    }
    renderRow(photo) {
        const imageTeamProfil = `${URL}/equipe/teamUploads/${photo}`;
        return <Image source={{ uri: imageTeamProfil }} style={styles.photoTeamStyle} />;
    }
    renderRowPlayer(joueur) {
      const img = `${URL}/users/upload/${joueur.idJoueur.photo}`;
      return (
            <TouchableNativeFeedback onPress={() => {
                try {
                     AsyncStorage.getItem('user').then((value) => {
                         const user = JSON.parse(value);
                         if (user.user._id === joueur.idJoueur._id) {
                           Actions.profil();
                         } else {
                              Actions.searchPlayerProfile({ player: joueur.idJoueur, title: `${joueur.idJoueur.firstname} ${joueur.idJoueur.lastname}` });
                            }
                      }).done();
                } catch (e) {
                   console.log('caught error', e);
                  }
            }}
            >
            <View style={styles.containerPlayerImage}>
                <Image source={{ uri: img }} style={styles.photoPlayerStyle} />
                <Text style={styles.styleTextPhoto}>{joueur.idJoueur.firstname}</Text>
            </View>
          </TouchableNativeFeedback>
        );
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
    renderPhotoEquipe() {
        if (this.props.team !== null && this.props.team.logo !== undefined) {
            const logoUri = `${URL}/equipe/teamUploads/${this.props.team.logo}`;
            return <Image source={{ uri: logoUri }} style={styles.styleLogo} />;
        }
        return <Image source={logoEquipe} style={styles.styleLogo} />;
    }
    renderButtonRejoindre() {
      const { playerRejoindreTeam } = this.props;
      console.log(this.props.test);
      if (this.props.test !== true) {
        if (this.props.idUser !== this.props.idEquipe && playerRejoindreTeam.success === false) {
          return (
              <Button iconLeft light bordered onPress={this.onRejoindreTeam.bind(this)}>
                  <Icon name='arrow-forward' style={styles.styleIconButton} />
                 <Text>Rejoindre</Text>
             </Button>
           );
         }
          return (
              <Button iconLeft light bordered onPress={this.onCancelRejoindreTeam.bind(this)}>
                  <Icon name='arrow-forward' style={styles.styleIconButton} />
                 <Text>Annuler invitation</Text>
             </Button>
           );
      }
    }
    renderProfileEquipe() {
        if (this.props.refresh === false) {
          const { name, description, adresse, date_creation, createdBy } = this.props.team;
            return (
                <View>
                <View style={styles.containerTop}>
                    {this.renderPhotoEquipe()}
                    <Text style={styles.styleNameEquipe}>{name}</Text>
                    <Text numberOfLines={3} style={styles.styleDescription}>
                      {description}
                    </Text>
                    <View style={styles.containerButton}>
                        <Button iconLeft light bordered style={{ marginRight: 20 }} onPress={this.onPressAnnonces.bind(this)}>
                            <Icon name='ios-albums-outline' style={styles.styleIconButton} />
                           <Text>Annonces</Text>
                       </Button>
                       {this.renderButtonRejoindre()}
                    </View>
                </View>
                <View style={styles.containerInfo}>
                    <View style={styles.containerBodyInfo}>
                        <Icon name='ios-person-outline' style={styles.styleIcon} />
                        <Text>{createdBy.firstname} {createdBy.lastname}</Text>
                    </View>
                    <View style={styles.containerBodyInfo}>
                        <Icon name='ios-navigate-outline' style={styles.styleIcon} />
                        <Text>{adresse}</Text>
                    </View>
                    <View style={styles.containerBodyInfo}>
                        <Icon name='ios-calendar-outline' style={styles.styleIcon} />
                        <Text>{moment(date_creation).format('DD/MM/YYYY')}</Text>
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
                </View>
            );
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header style={styles.headerStyle}>
                  <Body>
                      <Title>Mon Equipe</Title>
                  </Body>
                </Header>

                <ScrollView
                    refreshControl={
                    <RefreshControl
                      tintColor='blue'
                      colors={['#64B5F6', '#2196F3', '#1976D2']}
                      refreshing={this.props.refresh}
                      onRefresh={this.onRefresh.bind(this)}
                    />}
                >
                    {this.renderProfileEquipe()}
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
        height: 80
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


const mapStateToProps = ({ profileEquipe, homeDiscussion }) => {
  const { team, refresh, photosEquipe, photos, matchs, idUser, playerRejoindreTeam } = profileEquipe;
  const { socket } = homeDiscussion;
  return { team, refresh, photosEquipe, photos, matchs, idUser, socket, playerRejoindreTeam };
};

export default connect(mapStateToProps, { getTeam, getImagesTeamProfil, getIdUser, getPlayerBelongsTeam, cancelRejoindreTeam })(SearchTeamProfile);
