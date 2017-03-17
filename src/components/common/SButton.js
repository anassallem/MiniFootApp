import React from 'react';
import { Button, Icon, Text } from 'native-base';

const SButton = ({ onPress, children, icon }) => {
  const { buttonStyle } = styles;
  return (
    <Button iconLeft bordered rounded style={buttonStyle} onPress={onPress}>
      <Icon name={icon} style={{ color: '#FFF' }} />
      <Text style={{ color: '#FFF' }}>
        {children}
      </Text>
    </Button>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: 'center',
    paddingLeft: 80,
    paddingRight: 80,
    margin: 30,
    borderColor: '#FFF'
  }
};


export { SButton };