import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { SwitchSegment } from './common';
import { changeSwitch, socketChanged, changeIdUser } from '../actions';
import DiscussionFriends from './DiscussionFriends';
import DiscussionFriendsConnect from './DiscussionFriendsConnect';

class Discussion extends Component {
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

const mapStateToProps = ({ discussionPlayer, homeDiscussion }) => {
  const { switcher, online } = discussionPlayer;
  const { user, socket } = homeDiscussion;
  return { switcher, user, socket, online };
};

export default connect(mapStateToProps, { changeSwitch, socketChanged, changeIdUser })(Discussion);
