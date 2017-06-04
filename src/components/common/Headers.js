import React, { Component } from 'react';
import { View, Dimensions, TextInput, TouchableNativeFeedback } from 'react-native';
import { Header, Icon } from 'native-base';

class Headers extends Component {
  render() {
    return (
      <Header searchBar rounded >
        <TouchableNativeFeedback onPress={this.props.onSearch}>
          <View style={styles.mainContainer}>
              <TouchableNativeFeedback onPress={this.props.openDrawer}>
                  <Icon name='md-menu' style={styles.styleIcon} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.props.onPressSearch}>
                  <View style={styles.containerSearch}>
                      <TextInput placeholder="Rechercher ..." underlineColorAndroid={'#FFFFFF'} placeholderTextColor='#FFFFFF' editable={false} style={styles.styleInput} />
                      <Icon name='md-search' style={styles.styleIcon} />
                  </View>
              </TouchableNativeFeedback>
          </View>
        </TouchableNativeFeedback>
      </Header>
      );
  }
}
const { width } = Dimensions.get('window');
const styles = {
  styleIcon: {
    color: '#FFFFFF',
    paddingRight: 10,
    fontSize: 20
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  styleInput: {
    width: width - 80
  },
  containerSearch: {
      flexDirection: 'row',
      alignItems: 'center'
  }
};

export { Headers };
