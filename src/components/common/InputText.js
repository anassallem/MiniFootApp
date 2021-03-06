import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, Icon } from 'native-base';

const InputText = ({ label, value, onChangeText, placeholder, secureTextEntry, testInput, icon, keyboardType }) => {
  const { inputStyle, containerIcon, containerInputText, containerGroupe, labelStyle } = styles;
  return (
    <View style={containerGroupe}>
        <View style={containerIcon} >
            <Icon name={icon} style={{ color: '#FFFFFF' }} />
        </View>
        <View style={containerInputText}>
            <Text style={labelStyle}>{label}</Text>
              <TextInput
                keyboardType={keyboardType ? keyboardType : 'default'}
                underlineColorAndroid={'transparent'}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                style={inputStyle}
                onChangeText={onChangeText}
                placeholderTextColor='#FFFFFF'
              />

        </View>
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
    color: '#FFF',
    flex: 1,
    fontSize: 18,
  },
  labelStyle: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 17
  },
  containerIcon: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10
  },
  containerGroupe: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFFFF'
  },
  containerInputText: {
    flex: 1,
    flexDirection: 'column',
  }
};

export { InputText };
