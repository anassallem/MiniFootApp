import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import { Icon, Text, Header, Item, Input, Button } from 'native-base';
import { fetchTeams, searchTeamChanged } from '../actions';
import { ItemTeam, Spinner } from './common';

class SearchTeam extends Component {

  componentWillMount() {
    this.props.fetchTeams(this.props.text);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onSearchChanged(text) {
     this.props.fetchTeams(text);
     this.props.searchTeamChanged(text);
  }

  createDataSource({ teams }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(teams);
  }

  renderRow(team) {
    console.log(team);
    return <ItemTeam team={team} />;
  }

  renderList() {
     if (this.props.loading) {
       return <Spinner size="large" />;
     }
     return (
       <ListView
         enableEmptySections
         dataSource={this.dataSource}
         renderRow={this.renderRow}
         pageSize={10}
         onEndReached={() => { console.log('fired'); }}
       />
     );
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
              <Button transparent>
                  <Text>Search</Text>
              </Button>
          </Header>
          {this.renderList()}
        </View>
    );
  }
}

const mapStateToProps = ({ searchTeam }) => {
  const { teams, text, loading } = searchTeam;
  return { teams, text, loading };
};
export default connect(mapStateToProps, { fetchTeams, searchTeamChanged })(SearchTeam);
