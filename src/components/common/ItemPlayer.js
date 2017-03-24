import React from 'react';
import { View } from 'react-native';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';

const ItemPlayer = ({ player }) => {
    const { firstname, lastname, email } = player;
  return (
          <View>
            <ListItem avatar>
                <Left>
                    <Thumbnail source={require('../assets/userdefault.png')} />
                </Left>
                <Body>
                    <Text>{`${firstname} ${lastname}`}</Text>
                    <Text note>{email}</Text>
                </Body>
            </ListItem>
        </View>
  );
};

export { ItemPlayer };
