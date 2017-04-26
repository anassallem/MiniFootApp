import React, { Component } from 'react';
import { TouchableNativeFeedback, Alert } from 'react-native';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { connect } from 'react-redux';
import { URL } from '../../actions/api/config';
import { addPlayerToListTagsFormation } from '../../actions';

class SinglePlayerTeamFormation extends Component {
    onPressButton() {
          let { tags } = this.props;
          let valid = 0;
          this.props.bubbles.forEach((item) => {
              if (item.idJoueur._id === this.props.player.idJoueur._id) {
                  valid = 1;
              }
          });
          if (valid === 0) {
              tags = [this.props.player.idJoueur, ...tags];
              tags = tags.filter((tag, index, self) => self.findIndex((item) => { return item._id === tag._id; }) === index);
              this.props.addPlayerToListTagsFormation(tags);
          } else {
               Alert.alert('Attention', `${this.props.player.idJoueur.lastname} ${this.props.player.idJoueur.firstname} est déja dans le formation`);
          }
    }
    render() {
        const { firstname, lastname, email, photo } = this.props.player.idJoueur;
        const uriImg = `${URL}/users/upload/${photo}`;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <ListItem avatar style={{ margin: 4 }}>
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

const mapStateToProps = ({ playersFormation, formation }) => {
  const { tags } = playersFormation;
  const { bubbles } = formation;
  return { tags, bubbles };
};

export default connect(mapStateToProps, { addPlayerToListTagsFormation })(SinglePlayerTeamFormation);
