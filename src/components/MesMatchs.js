import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Image, Text, TouchableNativeFeedback, ListView, RefreshControl, Alert, Modal, TextInput } from 'react-native';
import { Header, Right, Body, Title } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { URL } from '../actions/api/config';
import { SingleItemMatch } from './common';
import { getMatchsEquipe, deleteMatchById, acceptMatchById, changeModalScore, scoreOneChanged, scoreTowChanged, addScoreToMatch } from '../actions';

const background = require('./assets/grass.jpg');
const logoEquipe = require('./assets/logoEquipe.jpg');

class MesMatchs extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }
  componentDidMount() {
    this.onRefresh();
    this.props.navigationStateHandler.registerFocusHook(this);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  componentWillUnmount() {
    this.props.navigationStateHandler.unregisterFocusHook(this);
  }
  onRefresh() {
      this.props.getMatchsEquipe(this.props.team._id, moment(new Date()).format('DD/MM/YYYY'), 0);
  }
  onEndReached() {
      this.props.getMatchsEquipe(this.props.team._id, moment(new Date()).format('DD/MM/YYYY'), this.props.page);
  }
  onPressAddMatch() {
      Actions.createMatch({ myTeam: this.props.team });
  }
  onClickAddScore() {
      this.props.addScoreToMatch(this.props.idMatch, this.props.scoreOne, this.props.scoreTow);
  }
  handleNavigationSceneFocus() {
    this.onRefresh();
  }
  createDataSource({ matchs }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(matchs);
  }
  handelScoreOneChanged(text) {
      this.props.scoreOneChanged(text);
  }
  handelScoreTowChanged(text) {
      this.props.scoreTowChanged(text);
  }
  handleDeleteMatch(idMatch, date) {
      if (moment(date).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY')) {
          Alert.alert('Attention', "Vous ne pouvez pas supprimer ce match ça sera joué aujourd'hui");
      } else {
          this.props.deleteMatchById(idMatch);
      }
  }
  handleAcceptMatch(idMatch) {
      this.props.acceptMatchById(idMatch);
  }
  handleRejectMatch(idMatch) {
      this.props.deleteMatchById(idMatch);
  }
  handleReserverMatch(idMatch, stade) {
      Actions.reserverStade({ stade, title: stade.name, idMatch });
  }
  handleAddScore(idMatch, teamOne, teamTow) {
      this.props.changeModalScore(idMatch, teamOne, teamTow);
  }
  renderRow(match) {
      return (
          <SingleItemMatch match={match} idTeam={this.props.team._id}
                deleteMacth={this.handleDeleteMatch.bind(this)}
                acceptMatch={this.handleAcceptMatch.bind(this)}
                rejectMatch={this.handleRejectMatch.bind(this)}
                reserver={this.handleReserverMatch.bind(this)}
                addScore={this.handleAddScore.bind(this)}
          />
      );
  }
  renderLogoTeam(team) {
      if (team.logo !== undefined) {
          return <Image style={styles.styleLogo} source={{ uri: `${URL}/equipe/teamUploads/${team.logo}` }} />;
      }
      return <Image style={styles.styleLogo} source={logoEquipe} />;
  }
  renderModal() {
      return (<Modal animationType={'fade'} transparent visible={this.props.visible} onRequestClose={() => {}}>
                <View style={styles.containerLoading}>
                    <View style={styles.containerModal}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.containerTeam}>
                                {this.renderLogoTeam(this.props.teamOne)}
                                <Text style={styles.styleTextLoading}>{this.props.teamOne.name}</Text>
                            </View>
                            <View style={styles.containerScore}>
                                <View style={styles.containerInput}>
                                    <TextInput
                                        keyboardType={'numeric'}
                                        style={styles.styleInputScore}
                                        onChangeText={this.handelScoreOneChanged.bind(this)}
                                        underlineColorAndroid={'transparent'}
                                        value={this.props.scoreOne+''}
                                    />
                                </View>
                                <Text style={styles.styleScore}>:</Text>
                                <View style={styles.containerInput}>
                                    <TextInput
                                        placeholder="0"
                                        keyboardType={'numeric'}
                                        style={styles.styleInputScore}
                                        onChangeText={this.handelScoreTowChanged.bind(this)}
                                        underlineColorAndroid={'transparent'}
                                        value={this.props.scoreTow+''}
                                    />
                                </View>
                            </View>
                            <View style={styles.containerTeam}>
                                {this.renderLogoTeam(this.props.teamTow)}
                                <Text style={styles.styleTextLoading}>{this.props.teamTow.name}</Text>
                            </View>
                        </View>
                        <TouchableNativeFeedback onPress={this.onClickAddScore.bind(this)}>
                            <View style={styles.styleButtonOk}>
                                <Text style={{ color: '#000000', fontSize: 14 }}> Envoyer </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
              </Modal>
              );
  }
  render() {
      return (
          <View style={styles.mainContainer}>
              <Header>
                  <Body>
                      <Title>Mes Matchs</Title>
                  </Body>
                  <Right>
                      <TouchableNativeFeedback onPress={this.onPressAddMatch.bind(this)}>
                          <Text style={styles.textHeaderStyle}>Ajouter</Text>
                      </TouchableNativeFeedback>
                  </Right>
              </Header>
              <Image source={background} style={styles.styleImage}>
                  {this.renderModal()}
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
                              refreshing={this.props.loading}
                              onRefresh={this.onRefresh.bind(this)}
                          />
                      }
                  />
              </Image>
          </View>
      );
  }
}

const styles = {
    mainContainer: {
        flex: 1
    },
    styleImage: {
        width: null,
        height: null,
        flex: 1
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    containerLoading: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    containerModal: {
       backgroundColor: '#01579B',
       justifyContent: 'center',
       alignItems: 'center',
       borderWidth: 0.5,
       borderColor: '#232123',
       padding: 20,
       marginLeft: 30,
       marginRight: 30
    },
    styleTextLoading: {
       color: '#FFFFFF'
    },
    styleLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    styleScore: {
        fontSize: 40,
        color: '#FFFFFF',
        marginLeft: 5,
        marginRight: 5
    },
    containerInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    styleInputScore: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: '#FFFFFF',
        width: 40,
        height: 40,
        color: '#FFFFFF',
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
    styleButtonOk: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
    }
};

const mapStateToProps = ({ mesMatchs }) => {
  const { matchs, loading, visible, idMatch, teamOne, teamTow, scoreOne, scoreTow, page } = mesMatchs;
  return { matchs, loading, visible, idMatch, teamOne, teamTow, scoreOne, scoreTow, page };
};

export default connect(mapStateToProps, { getMatchsEquipe, deleteMatchById, acceptMatchById, changeModalScore, scoreOneChanged, scoreTowChanged, addScoreToMatch })(MesMatchs);
