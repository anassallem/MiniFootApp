import React, { Component } from 'react';
import { View, AsyncStorage, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from './common';
import { getInvitations } from '../actions';
import ItemPlayerInvitation from './common/ItemPlayerInvitation';

class MyInvitations extends Component {

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
              this.props.getInvitations(user.user._id);
          }).done();
      } catch (e) {
          console.log('caught error', e);
      }
  }

  createDataSource({ invitations }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(invitations);
  }

  renderRow(invitation) {
    return <ItemPlayerInvitation invitation={invitation} />;
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
const mapStateToProps = ({ myInvitations }) => {
  const { invitations, loading } = myInvitations;
  return { invitations, loading };
};
export default connect(mapStateToProps, { getInvitations })(MyInvitations);
