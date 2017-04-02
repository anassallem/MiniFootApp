import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import { URL } from '../../actions/api/config';
import { deleteInvitations, acceptInvitations } from '../../actions';

class ItemPlayerInvitation extends Component {
  onClickName() {
      const { from } = this.props.invitation;
      Actions.searchPlayerProfile({ player: from, title: `${from.firstname} ${from.lastname}` });
  }

  onClickAccept() {
      const { from, to, _id } = this.props.invitation;
      this.props.acceptInvitations(_id, { idUser: to, friend: from._id });
  }

  onClickReject() {
      this.props.deleteInvitations(this.props.invitation._id);
  }

  render() {
      const { from } = this.props.invitation;
      const uriImg = `${URL}/users/upload/${from.photo}`;
      return (
        <ListItem avatar>
            <Left>
                <Thumbnail source={{ uri: uriImg }} />
            </Left>
            <Body>
                <TouchableNativeFeedback onPress={this.onClickName.bind(this)}>
                    <View style={styles.containerRow}>
                        <Text style={styles.styleTextPlayer}>{`${from.firstname} ${from.lastname}`}</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={styles.styleText}>{"Vous a envoyé une invitation d'amitié"}</Text>
                <View style={styles.containerRow}>
                  <Button bordered success style={styles.styleButton} onPress={this.onClickAccept.bind(this)}>
                    <Text>Accepter</Text>
                  </Button>
                  <Button bordered danger style={styles.styleButton} onPress={this.onClickReject.bind(this)}>
                    <Text>Refuser</Text>
                  </Button>
                </View>
            </Body>
        </ListItem>
    );
  }
}
const styles = {
  containerRow: {
    flexDirection: 'row',
  },
  styleButton: {
    marginRight: 10,
    height: 30
  },
  styleText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5
  },
  styleTextPlayer: {
    color: '#2962FF'
  }
};

const mapStateToProps = ({ myInvitations }) => {
  const { invitations } = myInvitations;
  return { invitations };
};

export default connect(mapStateToProps, { deleteInvitations, acceptInvitations })(ItemPlayerInvitation);
