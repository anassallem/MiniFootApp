import React, { Component } from 'react';
import { View, AsyncStorage, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from './common';
import { getNotificationRejoindreTeam } from '../actions';
import ItemTeamNotificationRejoindre from './common/ItemTeamNotificationRejoindre';

class NotificationRejoindreTeam extends Component {

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
              this.props.getNotificationRejoindreTeam(user.user.equipe);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
  }

  createDataSource({ notificationsRejoindre }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(notificationsRejoindre);
  }

  renderRow(notificationRejoindre) {
    return <ItemTeamNotificationRejoindre notificationRejoindre={notificationRejoindre} />;
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
        <View style={{ paddingTop: 50 }}>
            {this.renderList()}
        </View>
    );
  }
}
const mapStateToProps = ({ notificationRejoindreTeam }) => {
  const { notificationsRejoindre, loading } = notificationRejoindreTeam;
  return { notificationsRejoindre, loading };
};
export default connect(mapStateToProps, { getNotificationRejoindreTeam })(NotificationRejoindreTeam);
