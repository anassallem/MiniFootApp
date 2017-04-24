import React, { Component } from 'react';
import { View, AsyncStorage, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from './common';
import ItemPlayerNotification from './common/ItemPlayerNotification';
import { getNotifications } from '../actions';

class Notification extends Component {

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
              this.props.getNotifications(user.user._id);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
  }

  createDataSource({ notifications }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(notifications);
  }

  renderRow(notification) {
    return <ItemPlayerNotification notification={notification} />;
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
const mapStateToProps = ({ notification }) => {
  const { notifications, loading } = notification;
  return { notifications, loading };
};
export default connect(mapStateToProps, { getNotifications })(Notification);
