import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, RefreshControl } from 'react-native';
import { Icon, Header, Item, Input } from 'native-base';
import { fetchPlayers, searchChanged } from '../actions';
import { ItemPlayer } from './common';

class SearchPlayer extends Component {

  componentWillMount() {
    this.props.fetchPlayers(this.props.text, 0);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onRefresh() {
      this.props.fetchPlayers(this.props.text, 0);
  }
  onEndReached() {
      this.props.fetchPlayers(this.props.text, this.props.page);
  }
  onSearchChanged(text) {
     this.props.fetchPlayers(text, 0);
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

const mapStateToProps = ({ searchPlayer }) => {
  const { players, text, loading, page } = searchPlayer;
  return { players, text, loading, page };
};
export default connect(mapStateToProps, { fetchPlayers, searchChanged })(SearchPlayer);
