import React, { Component } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Thumbnail, Text, Content,
     ListItem, Left, Right, Switch, Icon, Body } from 'native-base';

class SideBar extends Component {
  componentWillMount() {
      //test
  }

  render() {
    const { backgroundImage, containerNavigation, colorIcon, textStyle, textUserStyle } = styles;
    return (
      <Container>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = {
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width,
    justifyContent: 'flex-end',
    padding: 20
  },
  containerNavigation: {
    flex: 2,
    backgroundColor: '#F5F5F5'
  },
  colorIcon: {
    color: '#BDBDBD'
  },
  textStyle: {
    color: '#212121'
  },
  textUserStyle: {
    color: '#FFF'
  }
};
export default SideBar;
