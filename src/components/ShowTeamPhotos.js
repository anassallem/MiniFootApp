import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, TouchableNativeFeedback, Image, Dimensions, ScrollView, Modal, ActivityIndicator, Text } from 'react-native';
import { Header, Right, Body, Title, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setMultiplePhotos, getPhotosTeam, uploadImageEquipe } from '../actions';
import { URL } from '../actions/api/config';

class ShowTeamPhotos extends Component {

  componentDidMount() {
    this.props.getPhotosTeam(this.props.idEquipe);
  }
  onButtonUpload() {
      this.props.uploadImageEquipe(this.props.idEquipe, this.props.image);
  }
  onClickImage(image, e) {
      let position = 0;
      this.props.photos.forEach((photo, i) => {
         if (photo === image) {
             position = i;
         }
      });
      Actions.displayPicture({ photos: this.props.photos, index: position, delete: true, idEquipe: this.props.idEquipe, typePictures: 'Team' });
  }
  onButtonAdd() {
      const options = {
          title: 'Select Image',
          takePhotoButtonTitle: null,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          },
          mediaType: 'image'
      };
      ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
              console.log('User cancelled image picker');
          } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
          } else {
              this.props.setMultiplePhotos(response);
          }
      });
  }

  renderMultiplePhotos() {
      return this.props.photos.map((photo, key) => {
        return (
            <TouchableNativeFeedback key={key} onPress={this.onClickImage.bind(this, photo)}>
                <View style={styles.imgWrap}>
                    <Image source={{ uri: `${URL}/equipe/teamUploads/${photo}` }} style={styles.imageStyle} />
                </View>
            </TouchableNativeFeedback>
        );
      });
  }
  renderImageUpload() {
      if (this.props.image !== null) {
          return (
              <View style={styles.imgWrap}>
                <Image source={{ uri: this.props.image.uri }} style={styles.imageStyle} />
              </View>
          );
      }
  }
  renderButtonUpload() {
      if (this.props.image !== null) {
          return (
              <TouchableNativeFeedback onPress={this.onButtonUpload.bind(this)}>
                <Icon name="md-checkmark" style={{ color: '#fff', paddingRight: 20 }} />
              </TouchableNativeFeedback>
          );
      }
      return (
          <TouchableNativeFeedback onPress={this.onButtonAdd.bind(this)}>
            <Icon name="ios-camera-outline" style={{ color: '#fff', paddingRight: 20 }} />
          </TouchableNativeFeedback>
      );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Body>
              <Title>Photos</Title>
          </Body>
          <Right>
              {this.renderButtonUpload()}
          </Right>
        </Header>
        <ScrollView>
            <Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                <View style={styles.containerStyle}>
                    <View style={styles.containerModal}>
                        <ActivityIndicator size="large" />
                        <Text>  Chargement ...</Text>
                    </View>
                </View>
            </Modal>
          <View style={styles.mainContainer}>
              {this.renderImageUpload()}
              {this.renderMultiplePhotos()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = {
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#eee',
    },
    headerStyle: {
        marginBottom: 10
    },
    imageStyle: {
      flex: 1,
      width: null,
      alignSelf: 'stretch',
    },
    imgWrap: {
      margin: 2,
      padding: 2,
      height: (Dimensions.get('window').height / 3) - 12,
      width: (Dimensions.get('window').width / 2) - 4,
      backgroundColor: '#fff'
    },
    containerStyle: {
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'gray'
    },
    containerModal: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      marginLeft: 30,
      marginRight: 30
    }
};

const mapStateToProps = ({ teamPhotos }) => {
    const { photos, image, loading } = teamPhotos;
    return { photos, image, loading };
};
export default connect(mapStateToProps, { setMultiplePhotos, getPhotosTeam, uploadImageEquipe })(ShowTeamPhotos);
