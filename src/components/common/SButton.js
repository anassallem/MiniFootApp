import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';

const SButton = ({ onPress, children }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 8,
    marginBottom: 10
  },
  textStyle: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center'
  }
};


export { SButton };
