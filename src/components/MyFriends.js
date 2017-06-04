import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, RefreshControl } from 'react-native';
import { ItemPlayer } from './common';
import { getMyFriends } from '../actions';

class MyFriends extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentDidMount() {
        this.onRefresh();
    }
    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }
    onRefresh() {
      this.props.getMyFriends(0, this.props.user._id);
    }
    onEndReached() {
        this.props.getMyFriends(this.props.page, this.props.user._id);
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
}
const mapStateToProps = ({ friends, homeDiscussion }) => {
  const { players, loading, page } = friends;
  const { user } = homeDiscussion;
  return { players, loading, user, page };
};
export default connect(mapStateToProps, { getMyFriends })(MyFriends);
