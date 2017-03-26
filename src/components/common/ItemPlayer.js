import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';

class ItemPlayer extends Component {
    onPressButton() {
        const { player } = this.props;
        Actions.searchPlayerProfile({ player, title: `${player.firstname} ${player.lastname}` });
    }
    render() {
        const { firstname, lastname, email, photo } = this.props.player;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: uriImg }} />
                    </Left>
                    <Body>
                        <Text>{`${firstname} ${lastname}`}</Text>
                        <Text note>{email}</Text>
                    </Body>
                </ListItem>
            </TouchableNativeFeedback>
        );
    }
}

export { ItemPlayer };
