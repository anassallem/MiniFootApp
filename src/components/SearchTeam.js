import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, RefreshControl } from 'react-native';
import { Icon, Header, Item, Input } from 'native-base';
import { fetchTeams, searchTeamChanged } from '../actions';
import { ItemTeam } from './common';

class SearchTeam extends Component {

  componentWillMount() {
    this.props.fetchTeams(this.props.text, 0);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onRefresh() {
      this.props.fetchTeams(this.props.text, 0);
  }
  onEndReached() {
      this.props.fetchTeams(this.props.text, this.props.page);
  }
  onSearchChanged(text) {
     this.props.fetchTeams(text, 0);
     this.props.searchTeamChanged(text);
  }

  createDataSource({ teams }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(teams);
  }

  renderRow(team) {
       return <ItemTeam team={team} />;
  }

  render() {
    return (
        <View style={{ marginBottom: 60 }}>
          <Header searchBar rounded>
              <Item>
                  <Icon name="search" />
                  <Input placeholder="Search" onChangeText={this.onSearchChanged.bind(this)} />
                  <Icon active name="people" />
              </Item>
          </Header>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
            pageSize={10}
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
        </View>
    );
  }
}

const mapStateToProps = ({ searchTeam }) => {
  const { teams, text, loading, page } = searchTeam;
  return { teams, text, loading, page };
};
export default connect(mapStateToProps, { fetchTeams, searchTeamChanged })(SearchTeam);
