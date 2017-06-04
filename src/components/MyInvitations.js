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
      this.props.getInvitations(0, this.props.user._id);
  }
  onEndReached() {
      this.props.getInvitations(this.props.page, this.props.user._id);
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
  render() {
      return (
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow.bind(this)}
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
const mapStateToProps = ({ myInvitations, homeDiscussion }) => {
  const { invitations, loading, page } = myInvitations;
  const { user } = homeDiscussion;
  return { invitations, loading, page, user };
};
export default connect(mapStateToProps, { getInvitations })(MyInvitations);
