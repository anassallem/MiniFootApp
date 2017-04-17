import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage, ListView, Text } from 'react-native';
import { Icon } from 'native-base';
import { getPlayerOnline } from '../actions';
import ItemPlayerConnect from './common/ItemPlayerConnect';

class DiscussionFriendsConnect extends Component {
  constructor(props) {
        super(props);
        try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              this.props.mySocket.emit('list_connectee', user.user._id);
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }
    componentWillMount() {
        this.props.getPlayerOnline(this.props.mySocket);
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

    render() {
      return (
        <View>
          <View style={styles.friendsConnetedStyle}>
            <Icon name={'ios-barcode-outline'} />
            <Text style={styles.textStyle}>Amis en ligne</Text>
          </View>
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

const mapStateToProps = ({ discussionPlayer }) => {
  const { mySocket, online } = discussionPlayer;
  return { mySocket, online };
};
export default connect(mapStateToProps, { getPlayerOnline })(DiscussionFriendsConnect);
