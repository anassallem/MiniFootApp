import React, { Component } from 'react';
import { View, Image, Text, TouchableNativeFeedback, ListView, Modal, TextInput, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Header, Body, Title, Icon, ListItem, Left, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { fetchTeams, searchTeamChanged, teamAdversaireChanged, switchModalChanged,
     searchTeamMatchChanged, createMacth, switchModalStadeChanged, fetchStades, searchStadeChanged, stadeChanged } from '../actions';
import { URL } from '../actions/api/config';
import { Spinner } from './common';

const logoEquipe = require('./assets/logoEquipe.jpg');
const logoStade = require('./assets/photostade.jpg');
const background = require('./assets/grass.jpg');

class CreateMatch extends Component {
  componentWillMount() {
     this.props.fetchTeams(this.props.text);
     this.props.fetchStades(this.props.textStade);
     this.createDataSource(this.props);
     this.createdataSourceStade(this.props);
  }
  componentWillReceiveProps(nextProps) {
     this.createDataSource(nextProps);
     this.createdataSourceStade(nextProps);
  }
  onSearchChanged(text) {
     this.props.fetchTeams(text);
     this.props.searchTeamChanged(text);
  }
  onSearchStadeChanged(text) {
      this.props.fetchStades(text);
      this.props.searchStadeChanged(text);
  }
  onPressChooseTeam() {
      this.props.switchModalChanged();
  }
  onPressChooseStade() {
      this.props.switchModalStadeChanged();
  }
  onPressCreateMatch() {
      const { teamAdversaire, myTeam } = this.props;
      if (this.props.teamAdversaire !== null) {
          if (this.props.stade !== null) {
              const match = { teamOne: myTeam, teamTow: teamAdversaire, stade: this.props.stade._id, type: 'Match' };
              this.props.socket.emit('add_match', match);
              this.props.createMacth(myTeam);
          } else {
              Alert.alert('Information', 'selectionner un stade avant de créer match');
          }
      } else {
          Alert.alert('Information', 'selectionner une équipe avant de créer match');
      }
  }
  createDataSource({ teams }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(teams);
  }
  createdataSourceStade({ stades }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSourceStade = ds.cloneWithRows(stades);
  }
  renderPhotoStade(photos) {
    if (photos.length > 0) {
        const uriImgStade = `${URL}/stade/stadeUploads/${photos[0]}`;
        return <Thumbnail source={{ uri: uriImgStade }} />;
    }
        return <Thumbnail source={logoStade} />;
  }
  renderRowStade(stade) {
      return (
          <TouchableNativeFeedback onPress={() => { this.props.stadeChanged(stade); this.props.switchModalStadeChanged(); }}>
              <ListItem avatar>
                  <Left>
                      {this.renderPhotoStade(stade.photos)}
                  </Left>
                  <Body>
                      <Text>{stade.name}</Text>
                  </Body>
              </ListItem>
          </TouchableNativeFeedback>
      );
  }
  renderPhoto(team) {
    const uriImg = `${URL}/equipe/teamUploads/${team.logo}`;
    if (team.logo !== undefined) {
        return <Thumbnail source={{ uri: uriImg }} />;
    }
        return <Thumbnail source={logoEquipe} />;
  }
  renderRow(team) {
       return (
           <TouchableNativeFeedback onPress={() => { this.props.teamAdversaireChanged(team); this.props.switchModalChanged(); }}>
               <ListItem avatar>
                   <Left>
                       {this.renderPhoto(team)}
                   </Left>
                   <Body>
                       <Text>{`${team.name}`}</Text>
                   </Body>
               </ListItem>
           </TouchableNativeFeedback>
       );
  }
  renderList() {
     if (this.props.loading) {
       return <Spinner size="large" />;
     }
     return (
       <ListView
         enableEmptySections
         dataSource={this.dataSource}
         renderRow={this.renderRow.bind(this)}
         pageSize={10}
       />
     );
   }
  renderChooseTeamAdversaire() {
       return (<Modal animationType={'fade'} transparent visible={this.props.visible} onRequestClose={() => {}}>
                 <View style={styles.containerLoadingStyle}>
                   <View style={styles.containerLoadingModal}>
                       <TouchableNativeFeedback onPress={() => { this.props.switchModalChanged(); }}>
                           <View style={{ alignItems: 'flex-end', padding: 5, backgroundColor: '#232123', width: width - 61  }}>
                               <Icon name='ios-close-circle-outline' style={{ color: '#FFFFFF' }} />
                           </View>
                       </TouchableNativeFeedback>
                        <TextInput style={styles.inputSearch} value={this.props.text}
                            placeholder="Rechercher ..." onChangeText={this.onSearchChanged.bind(this)}
                            underlineColorAndroid={'#E0E0E0'}
                        />
                       {this.renderList()}
                   </View>
                 </View>
               </Modal>
               );
   }
  renderLogo() {
      if (this.props.myTeam.logo !== undefined) {
          const logoUri = `${URL}/equipe/teamUploads/${this.props.myTeam.logo}`;
          return <Image source={{ uri: logoUri }} style={styles.styleLogo} />;
      }
      return <Image source={logoEquipe} style={styles.styleLogo} />;
  }
  renderLogoAdversaire() {
      if (this.props.teamAdversaire.logo !== undefined) {
          const logoUri = `${URL}/equipe/teamUploads/${this.props.teamAdversaire.logo}`;
          return <Image source={{ uri: logoUri }} style={styles.styleLogo} />;
      }
      return <Image source={logoEquipe} style={styles.styleLogo} />;
  }
  renderTeam() {
      if (this.props.teamAdversaire !== null) {
          return (
              <View style={styles.containerTeam}>
                  <TouchableNativeFeedback onPress={this.onPressChooseTeam.bind(this)}>
                      {this.renderLogoAdversaire()}
                  </TouchableNativeFeedback>
                  <Text style={styles.styleTextWhite}> {this.props.teamAdversaire.name}</Text>
              </View>
          );
      }
      return (
          <View style={styles.containerTeam}>
              <TouchableNativeFeedback onPress={this.onPressChooseTeam.bind(this)}>
                  <View style={styles.containerTeamTow}>
                      <Icon name="ios-add-outline" style={styles.styleIconPlus} />
                  </View>
              </TouchableNativeFeedback>
              <Text style={styles.styleTextWhite}> Equipe 2 </Text>
          </View>
      );
  }
  renderListStade() {
      if (this.props.loadingStade) {
        return <Spinner size="large" />;
      }
      return (
        <ListView
          enableEmptySections
          dataSource={this.dataSourceStade}
          renderRow={this.renderRowStade.bind(this)}
          pageSize={10}
        />
      );
  }
  renderChooseStade() {
      return (<Modal animationType={'fade'} transparent visible={this.props.visibleStade} onRequestClose={() => {}}>
                <View style={styles.containerLoadingStyle}>
                  <View style={styles.containerLoadingModal}>
                      <TouchableNativeFeedback onPress={() => { this.props.switchModalStadeChanged(); }}>
                          <View style={{ alignItems: 'flex-end', padding: 5, backgroundColor: '#232123', width: width - 61 }}>
                              <Icon name='ios-close-circle-outline' style={{ color: '#FFFFFF' }} />
                          </View>
                      </TouchableNativeFeedback>
                       <TextInput style={styles.inputSearch} value={this.props.textStade}
                           placeholder="Rechercher ..." onChangeText={this.onSearchStadeChanged.bind(this)}
                           underlineColorAndroid={'#E0E0E0'}
                       />
                   {this.renderListStade()}
                  </View>
                </View>
              </Modal>
              );
  }
  renderStade() {
      if (this.props.stade !== null) {
          const imgStade = `${URL}/stade/stadeUploads/${this.props.stade.photos[0]}`;
          return (
              <View style={styles.containerStade}>
                  <TouchableNativeFeedback onPress={this.onPressChooseStade.bind(this)}>
                      <View style={styles.containerLogoStade}>
                          { (this.props.stade.photos.length > 0) ? <Image source={{ uri: imgStade }} style={styles.styleLogo} /> : <Image source={logoStade} style={styles.styleLogo} />}
                      </View>
                  </TouchableNativeFeedback>
                  <Text style={styles.styleTextWhite}> {this.props.stade.name} </Text>
              </View>
          );
      }
      return (
          <View style={styles.containerStade}>
              <TouchableNativeFeedback onPress={this.onPressChooseStade.bind(this)}>
                  <View style={styles.containerLogoStade}>
                      <Icon name="ios-add-outline" style={styles.styleIconPlus} />
                  </View>
              </TouchableNativeFeedback>
              <Text style={styles.styleTextWhite}> Sélectionner une stade </Text>
          </View>
      );
  }
  renderModalLoadingCreate() {
      return (<Modal animationType={'fade'} transparent visible={this.props.loadCreate} onRequestClose={() => {}}>
                  <View style={styles.containerLoading}>
                    <View style={styles.containerModal}>
                      <ActivityIndicator size="large" color={['#FFFFFF']} />
                      <Text style={styles.styleTextLoading}>  Chargement ...</Text>
                    </View>
                  </View>
              </Modal>
              );
  }
  render() {
      return (
          <View style={styles.containerMain}>
              <Header>
                  <Body>
                      <Title>Créer un Match</Title>
                  </Body>
              </Header>
              <Image source={background} style={styles.styleImage}>
                  {this.renderChooseTeamAdversaire()}
                  {this.renderModalLoadingCreate()}
                  {this.renderChooseStade()}
                  <View style={styles.mainContainer}>
                      <View style={styles.container}>
                          <View style={styles.containerTeam}>
                              {this.renderLogo()}
                              <Text style={styles.styleTextWhite}> {this.props.myTeam.name}</Text>
                          </View>
                          <View style={styles.containerScore}>
                              <Text style={styles.styleScore}>0</Text>
                              <Text style={styles.styleScore}>:</Text>
                              <Text style={styles.styleScore}>0</Text>
                          </View>
                              {this.renderTeam()}
                      </View>
                      <View style={styles.containerButton}>
                          {this.renderStade()}
                          <Text style={styles.styleTextWhite}>
                              Une notification sera envoyée à l'équipe adverse qui vos êtes sélectionnées pour accepter votre défi.
                          </Text>
                      </View>
                      <TouchableNativeFeedback onPress={this.onPressCreateMatch.bind(this)}>
                          <View style={[styles.containerButton, { marginTop: 20, alignItems: 'center' }]}>
                              <Text style={styles.styleTextButton}>Créer Match</Text>
                          </View>
                      </TouchableNativeFeedback>
                  </View>
              </Image>
          </View>
      );
  }
}
const { width } = Dimensions.get('window');
const styles = {
    containerMain: {
        flex: 1
    },
    styleImage: {
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    mainContainer: {
        flexDirection: 'column'
    },
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 20
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
    containerButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        marginTop: 2,
        marginLeft: 20,
        marginRight: 20,
        padding: 20
    },
    styleLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    styleScore: {
        fontSize: 40,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5
    },
    styleTextWhite: {
        color: '#FFFFFF'
    },
    styleTextButton: {
        color: '#FFFFFF',
        fontSize: 20
    },
    containerTeamTow: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        backgroundColor: '#616161',
        borderColor: '#424242',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleIconPlus: {
        color: '#FFFFFF',
        fontSize: 60
    },
    containerLoadingStyle: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    containerLoadingModal: {
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        height: 400
    },
    inputSearch: {
        flexDirection: 'row',
        width: width - 80
    },
    containerLoading: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    containerModal: {
       backgroundColor: '#01579B',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 30,
       marginLeft: 30,
       marginRight: 30
    },
    styleTextLoading: {
       color: '#FFFFFF'
    },
    containerStade: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'flex-start'
    },
    containerLogoStade: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#616161',
        borderColor: '#424242',
        opacity: 0.5,
        alignItems: 'center'
    },
};
const mapStateToProps = ({ searchTeam, createMatch, homeDiscussion }) => {
  const { teams, text, loading } = searchTeam;
  const { visible, teamAdversaire, loadCreate, stade, stades, visibleStade, loadingStade } = createMatch;
  const { socket } = homeDiscussion;
  return { teams, text, loading, visible, teamAdversaire, socket, loadCreate, stades, stade, visibleStade, loadingStade };
};

export default connect(mapStateToProps,
    { fetchTeams, searchTeamChanged, teamAdversaireChanged, switchModalChanged, searchTeamMatchChanged, createMacth, switchModalStadeChanged, fetchStades, searchStadeChanged, stadeChanged })(CreateMatch);
