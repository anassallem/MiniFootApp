import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
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
  componentDidUpdate(prevProps, prevState) {
      if (prevProps.notify !== this.props.notify) {
        this.onRefresh();
      }
  }
  onRefresh() {
      this.props.getNotifications(this.props.user._id);
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
  render() {
      return (
        <View>
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
        </View>
    );
  }
}
const mapStateToProps = ({ notification, homeDiscussion }) => {
      const { notifications, loading } = notification;
      const { notify, user } = homeDiscussion;
  return { notifications, loading, notify, user };
};
export default connect(mapStateToProps, { getNotifications })(Notification);
