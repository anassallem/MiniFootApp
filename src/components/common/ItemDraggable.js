/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Image
} from 'react-native';
import { URL } from '../../actions/api/config';

class ItemDraggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showDraggable: this.props.bubble.showDraggable,
        pan: this.props.bubble.pan,
        bounceValue: new Animated.Value(1),
    };
  }
  componentWillMount() {
      var that = this;
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {
            dx: this.state.pan.x,
            dy: this.state.pan.y
        }]),
        onPanResponderGrant: (e, gestureState) => {
          this.props.handleVisibility(true, null, this.props.bubble._id);
          this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
          this.state.pan.setValue({ x: 0, y: 0 });
          this.state.bounceValue.setValue(1);
          Animated.spring(this.state.bounceValue, { toValue: 1.2, friction: 3 }).start();
        },
        onPanResponderRelease: (e, gesture) => {
            this.props.handleVisibility(false, gesture, this.props.bubble._id);
            this.state.pan.flattenOffset();
            this.state.bounceValue.setValue(1);
            Animated.spring(this.state.bounceValue, { toValue: 1.1, friction: 3 }).start();
            /*if (imageZoneValues !== null) {
                const partie = (imageZoneValues.height / 3) - 50;
                if ((gesture.moveY > partie) && (gesture.moveY < (partie * 2))) {
                    that.props.changeFormationTeam(this.props.bubble.idJoueur._id, 1, 0, 0);
                } else if ((gesture.moveY > (partie * 2)) && (gesture.moveY < (partie * 3))) {
                    that.props.changeFormationTeam(this.props.bubble.idJoueur._id, 0, 1, 0);
                } else {
                    that.props.changeFormationTeam(this.props.bubble.idJoueur._id, 0, 0, 1);
                }
            }*/
        }
    });
  }
  renderDraggable() {
      const { photo, firstname } = this.props.bubble.idJoueur;
      const uriImg = `${URL}/users/upload/${photo}`;
      if (this.state.showDraggable) {
         return (
             <Animated.View
                 {...this.panResponder.panHandlers}
                 style={[this.state.pan.getLayout(), styles.circle, { transform: [{ scale: this.state.bounceValue }] }]}
             >
                 <Image source={{ uri: uriImg }} style={styles.circleImage} />
                 <Text style={styles.text}>{firstname}</Text>
             </Animated.View>
             );
      }
  }
  render() {
      return (
          <View>
              {this.renderDraggable()}
          </View>
      );
  }

}
const CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
    circleImage: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    margin: 2,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    },
    text: {
      textAlign: 'center',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
});
export { ItemDraggable };
