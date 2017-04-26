import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Header, Right, Body, Title, Left } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ItemDraggable } from './common';
import { equipeFetchFormation, changeVisibilityDropZone, setDropZone, filterBubblesVisibility, saveFormationTeam } from '../actions';

const iconDelete = require('./assets/deleteIcon.png');
const imageTerrain = require('./assets/terrain.png');

class Formation extends Component {
  componentDidMount() {
    this.props.equipeFetchFormation(this.props.idEquipe, this.props.tags);
  }
  onPressAddPlayers() {
      Actions.addPlayersFormation({ idEquipe: this.props.idEquipe });
  }
  onPressSaveFormation() {
      this.props.saveFormationTeam(this.props.idEquipe, this.props.bubbles)
  }
  onVisibilityZoneDrop(value, gesture, id) {
    this.props.changeVisibilityDropZone(value);
    if (gesture !== null) {
      if (this.isDropZone(gesture)) {
          this.props.filterBubblesVisibility(id);
      }
    }
  }
  setDropZoneValues(event) {
      this.props.setDropZone(event);
  }

  isDropZone(gesture) {
       const { dropZoneValues } = this.props;
       return gesture.moveY > dropZoneValues.y && gesture.moveY < dropZoneValues.y + dropZoneValues.height + 50;
  }

  renderBubbles() {
    return this.props.bubbles.map((bubble) => {
      return <ItemDraggable key={bubble.idJoueur._id} bubble={bubble} handleVisibility={this.onVisibilityZoneDrop.bind(this)} />;
    });
  }

  renderDropZone() {
       if (this.props.visibilityZoneDrop) {
           return (
                   <View onLayout={this.setDropZoneValues.bind(this)} style={styles.dropZone}>
                       <Image source={iconDelete} style={{ width: 30, height: 30 }} />
                       <Text style={styles.styleTextDelete}>Supprimer</Text>
                   </View>
           );
       }
   }
   renderLoading() {
     if (this.props.loading === true) {
       return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                 <View style={styles.containerLoadingStyle}>
                   <View style={styles.containerLoadingModal}>
                     <ActivityIndicator size="large" color={['blue']} />
                     <Text>  Chargement ...</Text>
                   </View>
                 </View>
               </Modal>
               );
     }
   }
  render() {
      return (
          <View style={styles.mainContainer}>
              <Header>
                  <Left>
                      <TouchableWithoutFeedback onPress={this.onPressAddPlayers.bind(this)}>
                          <View>
                              <Text style={styles.textHeaderStyle}>Ajouter</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  </Left>
                <Body style={{ alignItems: 'center' }}>
                    <Title>Formation</Title>
                </Body>
                <Right>
                    <TouchableWithoutFeedback onPress={this.onPressSaveFormation.bind(this)}>
                        <View>
                            <Text style={styles.textHeaderStyle}>Enregistrer</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Right>
              </Header>
              <Image source={imageTerrain} style={styles.styleContainerImage}>
                  {this.renderDropZone()}
                  <View style={styles.draggableContainer}>
                      {this.renderLoading()}
                      {this.renderBubbles()}
                  </View>
              </Image>
          </View>

      );
  }
}

const { width } = Dimensions.get('window');
let styles = StyleSheet.create({
  mainContainer: {
      flex: 1
  },
  textHeaderStyle: {
    color: '#FFFFFF'
  },
  styleContainerImage: {
      flex: 1,
      width: undefined,
      backgroundColor: 'transparent'
  },
  dropZone: {
    height: 50,
    width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  draggableContainer: {
    flexDirection: 'row',
    marginTop: 60,
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  styleTextDelete: {
    textAlign: 'center',
    color: '#fff',
    marginLeft: 10
  },
  containerLoadingStyle: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center'
  },
  containerLoadingModal: {
     backgroundColor: '#FFFFFF',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 30,
     marginLeft: 30,
     marginRight: 30
  }
});

const mapStateToProps = ({ formation }) => {
  const { bubbles, visibilityZoneDrop, dropZoneValues, loading } = formation;
  return { bubbles, visibilityZoneDrop, dropZoneValues, loading };
};

export default connect(mapStateToProps, { equipeFetchFormation, changeVisibilityDropZone, setDropZone, filterBubblesVisibility, saveFormationTeam })(Formation);
