import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, RefreshControl, AsyncStorage } from 'react-native';
import { Spinner, ItemPlayer } from './common';
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
        try {
            AsyncStorage.getItem('user').then((value) => {
                const user = JSON.parse(value);
                this.props.getMyFriends(user.user._id);
            }).done();
        } catch (e) {
            console.log('caught error', e);
        }
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

    render() {
      return (
        <View>
            {this.renderList()}
        </View>
    );
    }
}
const mapStateToProps = ({ friends }) => {
  const { players, loading } = friends;
  return { players, loading };
};
export default connect(mapStateToProps, { getMyFriends })(MyFriends);
