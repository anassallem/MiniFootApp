import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { SwitchSegment } from './common';
import { changeSwitch, socketChanged, changeIdUser } from '../actions';
import DiscussionFriends from './DiscussionFriends';
import DiscussionFriendsConnect from './DiscussionFriendsConnect';

class Discussion extends Component {
    componentDidMount() {
        this.props.socketChanged(this.props.socket);
        try {
          AsyncStorage.getItem('user').then((value) => {
              const user = JSON.parse(value);
              this.props.changeIdUser(user.user._id);
          }).done();
        } catch (e) {
          console.log('caught error', e);
        }
    }

    handelSwitch() {
        this.props.changeSwitch();
    }

    renderPage() {
        return this.props.switcher === true ? <DiscussionFriends /> : <DiscussionFriendsConnect />;
    }
    
    render() {
        return (
            <View style={styles.mainContainer}>
               <SwitchSegment onClickSwitch={this.handelSwitch.bind(this)} switcher={this.props.switcher} leftButton={'Mes messages'} rightButton={'Amis en ligne'} />
               <ScrollView style={styles.scrollViewStyle}>
                   {this.renderPage()}
               </ScrollView>
           </View>
        );
    }
}
const styles = {
    scrollViewStyle: {
        backgroundColor: '#FFFFFF'
    },
    mainContainer: {
        flex: 1
    }
};

const mapStateToProps = ({ discussionPlayer }) => {
  const { players, switcher, mySocket, idUser } = discussionPlayer;
  return { players, switcher, mySocket, idUser };
};

export default connect(mapStateToProps, { changeSwitch, socketChanged, changeIdUser })(Discussion);
