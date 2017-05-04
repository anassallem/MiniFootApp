import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';

const Checkbox = ({ isChecked, leftText, rightText, onClick }) => {
  return (
      <TouchableNativeFeedback onPress={onClick}>
          <View style={styles.containerStyle}>
              {renderLeftText(leftText)}
              <View style={styles.containeCheckbox}>
                  {renderIcon(isChecked)}
              </View>
              {renderRightText(rightText)}
          </View>
      </TouchableNativeFeedback>
  );
};
function renderIcon(isChecked) {
    if (isChecked) {
        return <Icon name='ios-checkmark-outline' style={styles.styleCheckbox} />;
    }
}
function renderLeftText(leftText) {
    if (leftText !== undefined) {
        return <Text style={styles.styleLeftText}>{leftText}</Text>;
    }
}
function renderRightText(rightText) {
    if (rightText !== undefined) {
        return <Text style={styles.styleRightText}>{rightText}</Text>;
    }
}
const styles = {
  containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 4
  },
  containeCheckbox: {
      borderWidth: 1,
      borderColor: '#009688',
      width: 15,
      height: 15,
      alignItems: 'center',
      justifyContent: 'center'
  },
  styleCheckbox: {
    color: '#009688'
  },
  styleLeftText: {
      marginRight: 10
  },
  styleRightText: {
      marginLeft: 10
  }
};

export { Checkbox };
