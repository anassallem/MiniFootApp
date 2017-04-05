import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Thumbnail, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

const image = require('../assets/userdefault.png');

class ItemDiscussion extends Component {
    onPressButton() {
      Actions.chat();
    }

    render() {
        return (
          <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
            <View style={styles.mainContainer}>
                <Thumbnail style={styles.styleImage} source={image} />
                <View style={styles.bodyContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={styles.titleStyle}>Riadh Mkhinini</Text>
                    <Text style={styles.textDateStyle}>3 min.</Text>
                  </View>
                  <Text style={styles.textStyle}>Le Lorem Ipsum est simplement du faux texte.</Text>
                </View>
                <Icon name='ios-arrow-forward-outline' style={styles.styleIcon} />
            </View>
          </TouchableNativeFeedback>
        );
    }
}

const styles = {
  mainContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 1
  },
  styleImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  bodyContainer: {
    flexDirection: 'column',
    padding: 8,
    width: 270
  },
  titleStyle: {
    color: '#000000'
  },
  textStyle: {
    fontSize: 12,
    marginRight: 8,
  },
  styleIcon: {
    color: 'green',
    alignSelf: 'center',
    fontSize: 14
  },
  textDateStyle: {
    fontSize: 12,
    alignSelf: 'center',
    marginRight: 10
  }
};
export { ItemDiscussion };
