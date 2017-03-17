import React from 'react';
import { View } from 'react-native';
import { Item, Input, Text, Icon } from 'native-base';

const InputText = ({ label, value, onChangeText, placeholder, secureTextEntry, testInput, icon }) => {
  const { inputStyle, containerIcon, containerInputText, containerGroupe, labelStyle } = styles;
  return (
    <View style={containerGroupe}>
        <View style={containerIcon} >
            <Icon name={icon} style={{ color: '#FFF' }} />
        </View>
        <View style={containerInputText}>
            <Text style={labelStyle}>{label}</Text>
            <Item success>
              <Input
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                style={inputStyle}
                onChangeText={onChangeText}
                placeholderTextColor='gray'
              />
              {renderIcon(testInput)}
            </Item>
        </View>
    </View>

  );
};
const renderIcon = (testInput) => {
  if (testInput === true) {
    return (<Icon name='checkmark-circle' />);
  } else if (testInput === false) {
    return (<Icon name='close-circle' style={{ color: 'red' }} />);
  }
};
const styles = {
  inputStyle: {
    color: '#FFF'
  },
  labelStyle: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 17
  },
  containerIcon: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  containerGroupe: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerInputText: {
    flex: 1,
    flexDirection: 'column',
    margin: 10
  }
};

export { InputText };
