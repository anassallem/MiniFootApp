import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#01579B',
    alignItems: 'center'
  }
};

export { CardSection };
