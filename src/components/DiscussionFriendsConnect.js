import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import { getPlayerOnline } from '../actions';
import ItemPlayerConnect from './common/ItemPlayerConnect';

class DiscussionFriendsConnect extends Component {
    constructor(props) {
        super(props);
        this.props.socket.emit('list_connectee', this.props.user._id);
    }
    componentWillMount() {
        this.props.socket.on('list_connectee', (data) => {
          this.props.getPlayerOnline(data);
        });
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }

    createDataSource({ online }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(online);
    }
    renderRow(player) {
        return <ItemPlayerConnect player={player} />;
    }
    renderFriendsOnline() {
        if (this.props.online.length === 0) {
            return <ActivityIndicator size="large" color={['#1976D2']} />;
        }
        return (
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow.bind(this)}
              pageSize={10}
            />
        );
    }
    render() {
      return (
        <View>
          <View style={styles.friendsConnetedStyle}>
            <Icon name={'ios-barcode-outline'} />
            <Text style={styles.textStyle}>Amis en ligne</Text>
          </View>
             {this.renderFriendsOnline()}
        </View>
    );
    }
}
const styles = {
    friendsConnetedStyle: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginBottom: 1
    },
    textStyle: {
        color: '#01579B',
        fontSize: 14,
        marginLeft: 10
    },
    styleIcon: {
        color: '#01579B',
        marginLeft: 10
    }
};

const mapStateToProps = ({ discussionPlayer, homeDiscussion }) => {
  const { online } = discussionPlayer;
  const { user, socket } = homeDiscussion;
  return { online, user, socket };
};
export default connect(mapStateToProps, { getPlayerOnline })(DiscussionFriendsConnect);
