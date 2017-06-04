import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
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
        <SwitchSegment style={styles.styleSwitcher} onClickSwitch={this.handelSwitch.bind(this)}
            switcher={this.props.switcher} leftButton={'Mes amis'} rightButton={'Mes Invitations'}
        />
          {this.renderPage()}
      </View>
    );
  }
}
const styles = {
    styleSwitcher: {
        marginTop: 54
    }
};
const mapStateToProps = ({ friends }) => {
  const { players, switcher } = friends;
  return { players, switcher };
};
export default connect(mapStateToProps, { changeSwitch })(ListFriends);
