import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from 'native-base';

const InputTextAuth = ({ value, onChangeText, placeholder, secureTextEntry, testInput, icon, keyboardType }) => {
  const { inputStyle, containerIcon, containerGroupe } = styles;
  return (
    <View style={containerGroupe}>
        <View style={containerIcon} >
            <Icon name={icon} style={{ color: '#FFFFFF' }} />
        </View>
              <TextInput
                keyboardType={keyboardType ? keyboardType : 'default'}
                underlineColorAndroid={'transparent'}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                style={inputStyle}
                onChangeText={onChangeText}
                placeholderTextColor='#eeeeee'
              />
        <View style={containerIcon} >
            {renderIcon(testInput)}
        </View>
    </View>

  );
};
const renderIcon = (testInput) => {
  if (testInput === true) {
    return (<Icon name='checkmark-circle' style={{ color: '#FFFFFF' }} />);
  } else if (testInput === false) {
    return (<Icon name='close-circle' style={{ color: '#FF9800' }} />);
  }
};

const styles = {
  inputStyle: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1
  },
  containerIcon: {
    marginRight: 10,
    marginLeft: 10
  },
  containerGroupe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
  }
};

export { InputTextAuth };
