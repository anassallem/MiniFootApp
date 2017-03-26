import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import { Icon, Text, Header, Item, Input, Button } from 'native-base';
import { fetchPlayers, searchChanged } from '../actions';
import { ItemPlayer, Spinner } from './common';

class SearchPlayer extends Component {

  componentWillMount() {
    this.props.fetchPlayers(this.props.text);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onSearchChanged(text) {
     this.props.fetchPlayers(text);
     this.props.searchChanged(text);
  }

  createDataSource({ players }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(players);
  }

  renderRow(player) {
    return <ItemPlayer player={player} />;
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

const mapStateToProps = ({ searchPlayer }) => {
  const { players, text, loading } = searchPlayer;
  return { players, text, loading };
};
export default connect(mapStateToProps, { fetchPlayers, searchChanged })(SearchPlayer);
