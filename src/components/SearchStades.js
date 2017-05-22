import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, ActivityIndicator } from 'react-native';
import { Icon, Text, Header, Item, Input, Button } from 'native-base';
import { fetchListStades, searchListStadesChanged } from '../actions';
import { ItemStade } from './common';

class SearchStades extends Component {

  componentWillMount() {
    this.props.fetchListStades(this.props.text);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onSearchChanged(text) {
     this.props.fetchListStades(text);
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

  renderList() {
     if (this.props.loading) {
       return <ActivityIndicator size="large" color={['#1565C0']} />;
     }
     return (
       <ListView
         enableEmptySections
         dataSource={this.dataSource}
         renderRow={this.renderRow.bind(this)}
         pageSize={10}
         style={{ marginTop: 5 }}
       />
     );
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
              <Button transparent>
                  <Text>Search</Text>
              </Button>
          </Header>
          {this.renderList()}
        </View>
    );
  }
}

const mapStateToProps = ({ searchStades }) => {
  const { stades, text, loading } = searchStades;
  return { stades, text, loading };
};
export default connect(mapStateToProps, { fetchListStades, searchListStadesChanged })(SearchStades);
