import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, RefreshControl } from 'react-native';
import { Icon, Header, Item, Input } from 'native-base';
import { fetchListStades, searchListStadesChanged } from '../actions';
import { ItemStade } from './common';

class SearchStades extends Component {
  componentWillMount() {
    this.props.fetchListStades(this.props.text, 0);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onRefresh() {
      this.props.fetchListStades(this.props.text, 0);
  }
  onEndReached() {
      this.props.fetchListStades(this.props.text, this.props.page);
  }
  onSearchChanged(text) {
     this.props.fetchListStades(text, 0);
     this.props.searchListStadesChanged(text);
  }

  createDataSource({ stades }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(stades);
  }

  renderRow(stade) {
       return <ItemStade stade={stade} />;
  }

  render() {
    return (
        <View style={{ marginBottom: 60 }}>
          <Header searchBar rounded>
              <Item>
                  <Icon name="search" />
                  <Input placeholder="Rechercher..." onChangeText={this.onSearchChanged.bind(this)} />
                  <Icon active name="ios-git-branch-outline" />
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
            style={{ marginTop: 5 }}
          />
        </View>
    );
  }
}

const mapStateToProps = ({ searchStades }) => {
  const { stades, text, loading, page } = searchStades;
  return { stades, text, loading, page };
};
export default connect(mapStateToProps, { fetchListStades, searchListStadesChanged })(SearchStades);
