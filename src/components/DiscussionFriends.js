import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import ItemDiscussion from './common/ItemDiscussion';
import { changeRoomDiscussion, onNewMessageReceive, changeRoomToVue } from '../actions';

class DiscussionFriends extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    handleMessageReceive(idRoom, message, users) {
        this.props.onNewMessageReceive(idRoom, message, users);
    }
    handleChangeRoomToVue(user, mySocket, room, title) {
        this.props.changeRoomToVue(user, this.props.socket, room, title);
    }
    createDataSource({ rooms }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(rooms);
    }
    renderRow(room) {
        return (
                <ItemDiscussion
                    room={room}
                    socket={this.props.socket}
                    user={this.props.user}
                    messageReceive={this.handleMessageReceive.bind(this)}
                    onChangeToVue={this.handleChangeRoomToVue.bind(this)}
                />
     );
    }
    render() {
      return (
            <View>
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  pageSize={10}
                />
            </View>
            );
    }
}

const mapStateToProps = ({ homeDiscussion }) => {
  const { rooms, socket, user } = homeDiscussion;
  return { rooms, socket, user };
};
export default connect(mapStateToProps, { changeRoomDiscussion, onNewMessageReceive, changeRoomToVue })(DiscussionFriends);
