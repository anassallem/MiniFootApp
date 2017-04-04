import React, { Component } from 'react';
import { Dimensions, View, TouchableNativeFeedback, Text } from 'react-native';

class SwitchSegment extends Component {
  onClickMyFriends() {
      this.props.onClickSwitch();
  }

  onClickMyInvitations() {
      this.props.onClickSwitch();
  }
  renderButtonLeft() {
    const { styleButtonLeft, styleText, styleButtonLeftClicked, styleTextClicked } = styles;
    if (this.props.switcher === true) {
      return (<View style={styleButtonLeftClicked}>
                <Text style={styleTextClicked}>Mes amis</Text>
              </View>);
    }
      return (<View style={styleButtonLeft}>
                <Text style={styleText}>Mes amis</Text>
              </View>);
  }
  renderButtonRight() {
    const { styleButtonRight, styleText, styleButtonRightClicked, styleTextClicked } = styles;
    if (this.props.switcher === false) {
      return (<View style={styleButtonRightClicked}>
                <Text style={styleTextClicked}>Mes invitations</Text>
              </View>);
    }
      return (<View style={styleButtonRight}>
                <Text style={styleText}>Mes invitations</Text>
              </View>);
  }
  render() {
      return (
        <View style={styles.containerButtons}>
          <TouchableNativeFeedback onPress={this.onClickMyFriends.bind(this)}>
            {this.renderButtonLeft()}
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.onClickMyInvitations.bind(this)}>
            {this.renderButtonRight()}
          </TouchableNativeFeedback>
        </View>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = {
  containerButtons: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 54
  },
  styleButtonLeft: {
    padding: 10,
    alignItems: 'center',
    borderColor: '#00ACC1',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: width / 3
  },
  styleButtonLeftClicked: {
    padding: 10,
    alignItems: 'center',
    borderColor: '#00ACC1',
    borderWidth: 1,
    backgroundColor: '#00ACC1',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: width / 3
  },
  styleButtonRight: {
    padding: 10,
    alignItems: 'center',
    borderColor: '#00ACC1',
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: width / 3
  },
  styleButtonRightClicked: {
    padding: 10,
    alignItems: 'center',
    borderColor: '#00ACC1',
    borderWidth: 1,
    backgroundColor: '#00ACC1',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    width: width / 3
  },
  styleText: {
    color: '#00838F'
  },
  styleTextClicked: {
    color: '#FFFFFF'
  }
};

export { SwitchSegment };
