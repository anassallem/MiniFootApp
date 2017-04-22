import React, { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { connect } from 'react-redux';
import { URL } from '../../actions/api/config';
import { addPlayerToListTags } from '../../actions';

class SinglePlayerSearchTeam extends Component {
    onPressButton() {
        let { tags } = this.props;
        tags = [this.props.player, ...tags];
          tags = tags.filter((tag, index, self) => self.findIndex((item) => { return item._id === tag._id; }) === index);
          //tags = tags.filter((t) => { return (t._id === user.user._id) ? false : true; });
          let list = [];
          tags.forEach((item) => {
             this.props.players.forEach((person) => {
                if (new String(person.idJoueur._id).valueOf() !== new String(item._id).valueOf()) {
                  list.push(item);
                }
              });
          });
          this.props.addPlayerToListTags(list);
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

const mapStateToProps = ({ membreTeam }) => {
  const { tags, players } = membreTeam;
  return { tags, players };
};

export default connect(mapStateToProps, { addPlayerToListTags })(SinglePlayerSearchTeam);
