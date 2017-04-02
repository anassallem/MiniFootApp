import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { changeSwitch } from '../actions';
import { SwitchSegment } from './common';
import MyFriends from './MyFriends';
import MyInvitations from './MyInvitations';

class ListFriends extends Component {

  handelSwitch() {
      this.props.changeSwitch();
  }
  renderPage() {
      return this.props.switcher === true ? <MyFriends /> : <MyInvitations />;
  }
  render() {
    return (
      <View>
        <SwitchSegment onClickSwitch={this.handelSwitch.bind(this)} switcher={this.props.switcher} />
        <ScrollView>
          {this.renderPage()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ friends }) => {
  const { players, switcher } = friends;
  return { players, switcher };
};
export default connect(mapStateToProps, { changeSwitch })(ListFriends);
