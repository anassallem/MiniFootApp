import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';

class ItemTeam extends Component {
    onPressButton() {
        const { team } = this.props;
        Actions.searchEquipeProfile({ team, title: `${team.name}` });
    }
    render() {
        const { name, logo } = this.props.team;
        const uriImg = `${URL}/equipe/teamUploads/${logo}`;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: uriImg }} />
                    </Left>
                    <Body>
                        <Text>{`${name}`}</Text>
                    </Body>
                </ListItem>
            </TouchableNativeFeedback>
        );
    }
}

export { ItemTeam };
