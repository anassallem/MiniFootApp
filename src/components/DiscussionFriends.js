import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage, ListView } from 'react-native';
import ItemDiscussion from './common/ItemDiscussion';
import { getDiscussionPlayer, changeRoomDiscussion } from '../actions';

class DiscussionFriends extends Component {
    componentWillMount() {
        try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              this.props.getDiscussionPlayer(user.user._id, this.props.mySocket);
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ players }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(players);
    }

    renderRow(discussion) {
        return <ItemDiscussion room={discussion} />;
    }

    render() {
      return (
            <View>
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
                  pageSize={10}
                />
            </View>
            );
    }
}

const mapStateToProps = ({ discussionPlayer }) => {
  const { players, mySocket, idUser } = discussionPlayer;
  return { players, mySocket, idUser };
};
export default connect(mapStateToProps, { getDiscussionPlayer, changeRoomDiscussion })(DiscussionFriends);
