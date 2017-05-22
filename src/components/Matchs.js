import React, { Component } from 'react';
import { View, Image, Text, TouchableNativeFeedback, ListView, RefreshControl } from 'react-native';
import { Header, Right, Body, Title, Icon } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleMatch } from './common';
import { getMatchsMyEquipe } from '../actions';

const background = require('./assets/grass.jpg');

class Matchs extends Component {
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
      if (this.props.user.equipe !== undefined) {
          if (this.props.user.equipe !== null) {
              this.props.getMatchsMyEquipe(this.props.user.equipe, moment(new Date()).format('DD/MM/YYYY'), 0);
          }
      }
  }
  onEndReached() {
      if (this.props.user.equipe !== undefined) {
          if (this.props.user.equipe !== null) {
              this.props.getMatchsMyEquipe(this.props.user.equipe, moment(new Date()).format('DD/MM/YYYY'), this.props.page);
          }
      }
  }
  handleNavigationSceneFocus() {
    this.onRefresh();
  }
  createDataSource({ listMatchs }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(listMatchs);
  }
  //pagiation
  renderRow(match) {
      return (
          <SingleMatch match={match} />
      );
  }
  renderList() {
      if (this.props.listMatchs.length > 0) {
          return (
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
          );
      }
      return (
          <View style={styles.containerMessage}>
              <Icon name='ios-chatbubbles' style={styles.styleIcon} />
              <Text style={styles.styleTextTitle}>Vous n'avez pas des matchs</Text>
          </View>
      );
  }
  render() {
      return (
          <View style={styles.mainContainer}>
              <Image source={background} style={styles.styleImage}>
                  {this.renderList()}
              </Image>
          </View>
      );
  }
}

const styles = {
    mainContainer: {
        flex: 1,
        marginTop: 54
    },
    styleImage: {
        width: null,
        height: null,
        flex: 1,
        justifyContent: 'center',
    },
    containerMessage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextTitle: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    styleIcon: {
        fontSize: 170,
        color: '#FFFFFF',
    }
};

const mapStateToProps = ({ matchs, homeDiscussion }) => {
  const { listMatchs, loading, page } = matchs;
  const { user } = homeDiscussion;
  return { listMatchs, loading, user, page };
};

export default connect(mapStateToProps, { getMatchsMyEquipe })(Matchs);
