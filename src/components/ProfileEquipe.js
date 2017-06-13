import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, ListView, Image, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Icon, Header, Right, Body, Title } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { getTeam, getImagesTeamProfil, getMatchTeam } from '../actions';
import { URL } from '../actions/api/config';

const logoEquipe = require('./assets/logo.png');
const background = require('./assets/blurred.jpg');

class ProfileEquipe extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
        this.createDataSourcePlayers(this.props);
        this.createDataSourceMatchs(this.props);
    }
    componentDidMount() {
      this.onRefresh();
      this.props.navigationStateHandler.registerFocusHook(this);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        this.createDataSourcePlayers(nextProps);
        this.createDataSourceMatchs(nextProps);
    }
    componentWillUnmount() {
      this.props.navigationStateHandler.unregisterFocusHook(this);
    }
    onRefresh() {
      this.props.getTeam(this.props.idEquipe);
      this.props.getImagesTeamProfil(this.props.idEquipe);
      this.props.getMatchTeam(this.props.idEquipe);
    }
    onButtonUpdate() {
      Actions.updateProfilTeam({ team: this.props.team });
    }
    onPressAnnonces() {
        Actions.myPublications({ team: this.props.team });
    }
    onChangeModal(image, e) {
        let position = 0;
        this.props.photosEquipe.forEach((photo, i) => {
           if (photo === image) {
               position = i;
           }
        });
        Actions.displayPicture({ photos: this.props.photosEquipe, index: position, delete: true, idEquipe: this.props.idEquipe, typePictures: 'Team' });
    }
    handleNavigationSceneFocus() {
      this.onRefresh();
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
        return (
          <TouchableNativeFeedback onPress={this.onChangeModal.bind(this, imageTeamProfil)}>
              <Image source={{ uri: imageTeamProfil }} style={styles.photoTeamStyle} />
          </TouchableNativeFeedback>
        );
    }
    renderRowPlayer(joueur) {
      const img = `${URL}/users/upload/${joueur.idJoueur.photo}`;
        return (
              <TouchableNativeFeedback onPress={() => {
                   if (this.props.user._id === joueur.idJoueur._id) {
                     Actions.profil();
                   } else {
                     Actions.searchPlayerProfile({ player: joueur.idJoueur, title: `${joueur.idJoueur.firstname} ${joueur.idJoueur.lastname}` });
                   }
                 }
               }
              >
                <View style={styles.containerPlayerImage}>
                    <Image source={{ uri: img }} style={styles.photoPlayerStyle} />
                    <Text style={styles.styleTextPhoto}>{joueur.idJoueur.firstname}</Text>
                </View>
              </TouchableNativeFeedback>
              );
    }
    renderLogoTeam(logo) {
        if (logo !== undefined) {
            return <Image style={styles.logoMatch} source={{ uri: `${URL}/equipe/teamUploads/${logo}` }} />;
        }
        return <Image style={styles.logoMatch} source={logoEquipe} />;
    }
    renderRowMatch(match) {
        return (<View style={styles.containerMatchs}>
                    <Text style={styles.nameEquipeMatchStyle}>{match.teamOne.name}</Text>
                    {this.renderLogoTeam(match.teamOne.logo)}
                    <View style={styles.scoreStyle}>
                        <Text style={styles.textScoreStyle}>{match.scoreOne}</Text>
                    </View>
                    <View style={styles.scoreStyle}>
                        <Text style={styles.textScoreStyle}>{match.scoreTow}</Text>
                    </View>
                    {this.renderLogoTeam(match.teamTow.logo)}
                    <Text style={styles.nameEquipeMatchStyle}>{match.teamTow.name}</Text>
                </View>);
    }
    renderPhotoEquipe() {
        if (this.props.team !== null && this.props.team.logo !== undefined) {
            const logoUri = `${URL}/equipe/teamUploads/${this.props.team.logo}`;
            return <Image source={{ uri: logoUri }} style={styles.styleLogo} />;
        }
        return <Image source={logoEquipe} style={styles.styleLogo} />;
    }
    renderPhotosTeamVide() {
        if (this.props.photosEquipe.length === 0) {
            return (<Text style={{ marginLeft: 20 }}>Aucune photo disponible</Text>);
        }
    }
    renderProfileEquipe() {
        if (this.props.team !== null && this.props.refresh === false) {
            const { name, description, adresse, date_creation, createdBy } = this.props.team;
            return (
                <View>
                    <Image source={background} resizeMode='stretch' style={styles.styleBackground}>
                        <View style={styles.containerTop}>
                                {this.renderPhotoEquipe()}
                                <Text style={styles.styleNameEquipe} >{name}</Text>
                                <Text numberOfLines={3} style={styles.styleDescription}>{description}</Text>
                                <TouchableNativeFeedback onPress={this.onPressAnnonces.bind(this)}>
                                    <View style={styles.styleButtonAdvert}>
                                        <Icon name='ios-albums-outline' style={styles.styleIconButton} />
                                        <Text style={{ color: '#FFFFFF' }}>Annonces</Text>
                                    </View>
                                </TouchableNativeFeedback>
                        </View>
                        <View style={styles.containerInfo}>
                            <View style={styles.containerBodyInfo}>
                                <Icon name='ios-person-outline' style={styles.styleIcon} />
                                <Text style={styles.textWhite}>{createdBy.firstname} {createdBy.lastname}</Text>
                            </View>
                            <View style={styles.containerBodyInfo}>
                                <Icon name='ios-navigate-outline' style={styles.styleIcon} />
                                <Text style={styles.textWhite}>{adresse}</Text>
                            </View>
                            <View style={styles.containerBodyInfo}>
                                <Icon name='ios-calendar-outline' style={styles.styleIcon} />
                                <Text style={styles.textWhite}>{moment(date_creation).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                    </Image>
                <View style={styles.containerPlayersTitle}>
                    <Icon name='ios-images-outline' style={styles.styleIconTitle} />
                    <Text style={styles.styleTextTitle}>Photos d'équipe</Text>
                </View>
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                {this.renderPhotosTeamVide()}
                <View style={styles.containerPlayersTitle}>
                    <Icon name='ios-shirt-outline' style={styles.styleIconTitle} />
                    <Text style={styles.styleTextTitle}>Membres d'équipe</Text>
                </View>
                <ListView
                  enableEmptySections
                  dataSource={this.playerDataSource}
                  renderRow={this.renderRowPlayer.bind(this)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                <View style={styles.containerPlayersTitle}>
                    <Icon name='ios-football' style={styles.styleIconTitle} />
                    <Text style={styles.styleTextTitle}>Matchs joués</Text>
                </View>
                <ListView
                  enableEmptySections
                  dataSource={this.MatchDataSource}
                  renderRow={this.renderRowMatch.bind(this)}
                />
                </View>
            );
        }
    }
    renderButtonUpdate() {
        if (this.props.user.joueur.type === 'Responsable') {
            return (
                <TouchableNativeFeedback onPress={this.onButtonUpdate.bind(this)}>
                    <Text style={styles.textHeaderStyle}>Modifier</Text>
                </TouchableNativeFeedback>
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
                  <Right>
                      {this.renderButtonUpdate()}
                  </Right>
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
        flex: 1,
    },
    styleBackground: {
        width: null,
        height: null,
        paddingTop: 10
    },
    styleButtonAdvert: {
        borderWidth: 0.5,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    containerTop: {
        alignItems: 'center'
    },
    styleLogo: {
        width: 100,
        height: 100
    },
    styleIconTitle: {
        color: '#2196F3',
        marginRight: 10
    },
    textWhite: {
        color: '#FFFFFF',
        fontSize: 14
    },
    styleNameEquipe: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        fontWeight: '700'
    },
    styleDescription: {
        fontSize: 12,
        color: '#FFFFFF',
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
        color: '#FFFFFF',
        marginRight: 5
    },
    containerInfo: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderTopColor: '#FFFFFF'
    },
    containerBodyInfo: {
        flexDirection: 'column',
        borderRightWidth: 0.5,
        borderRightColor: '#FFFFFF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3
    },
    styleIcon: {
        color: '#FFFFFF'
    },
    photoTeamStyle: {
        width: 100,
        height: 100,
        margin: 2
    },
    containerPlayersTitle: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    containerPlayerImage: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextTitle: {
        color: '#2196F3'
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
        width: 50,
        height: 50,
        borderRadius: 25,
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
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#9E9E9E',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    textScoreStyle: {
        margin: 5,
        color: '#434343',
        fontSize: 10
    },
    modalStyle: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    textStyle: {
      height: 50,
      paddingLeft: 280,
    },
    imageStyle: {
      flex: 1,
      width: null,
      alignSelf: 'stretch',
    }
};

const mapStateToProps = ({ profileEquipe, homeDiscussion }) => {
  const { team, refresh, photosEquipe, matchs } = profileEquipe;
  const { user } = homeDiscussion;
  return { team, refresh, photosEquipe, matchs, user };
};

export default connect(mapStateToProps, { getTeam, getImagesTeamProfil, getMatchTeam })(ProfileEquipe);
