import React, { Component } from 'react';
import { TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';

const logoEquipe = require('../assets/logoEquipe.jpg');

class ItemTeam extends Component {
    onPressButton() {
        const { team } = this.props;
        try {
             AsyncStorage.getItem('user').then((value) => {
                 const user = JSON.parse(value);
                 if (user.user.equipe === team._id) {
                    Actions.profileEquipe({ idEquipe: team._id });
                 } else {
                   Actions.searchTeamProfile({ idEquipe: team._id, title: `${team.name}` });
               }
             }).done();
           } catch (e) {
               console.log('caught error', e);
           }
    }
    renderPhoto() {
      const { logo } = this.props.team;
      const uriImg = `${URL}/equipe/teamUploads/${logo}`;
      if (logo !== undefined) {
          return <Thumbnail source={{ uri: uriImg }} />;
      }
          return <Thumbnail source={logoEquipe} />;
    }
    render() {
        const { name } = this.props.team;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <ListItem avatar>
                    <Left>
                        {this.renderPhoto()}
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
