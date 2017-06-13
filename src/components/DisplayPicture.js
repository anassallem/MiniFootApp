import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Image, TouchableNativeFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import { URL } from '../actions/api/config';
import { deletePictureMyTeam } from '../actions';

class DisplayPicture extends Component {
  onClickDelete(photo, e) {
      this.props.deletePictureMyTeam(this.props.idEquipe, photo);
  }
  renderButtonDelete(photo) {
      if (this.props.delete) {
          return (
              <TouchableNativeFeedback onPress={this.onClickDelete.bind(this, photo)}>
                  <View style={styles.styleButton}>
                      <Text style={styles.textWhite}>Supprimer</Text>
                  </View>
              </TouchableNativeFeedback>
          );
      }
  }
  renderPhotos() {
      return this.props.photos.map((photo, i) => {
          let uriImg;
          if (this.props.typePictures === 'Stade') {
              uriImg = `${URL}/stade/stadeUploads/${photo}`;
          } else if (this.props.typePictures === 'Team') {
              uriImg = `${URL}/equipe/teamUploads/${photo}`;
          }
          return (
              <View style={styles.slide} key={i}>
                <View style={styles.styleLayer} />
                <Image source={{ uri: uriImg }} resizeMode='stretch' style={styles.imageStyle} />
                <View style={styles.styleLayer}>
                    {this.renderButtonDelete(photo)}
                </View>
              </View>
          );
      });
  }
  render() {
    return (
        <Swiper showsButtons={false} loop={false} index={this.props.index}>
            {this.renderPhotos()}
        </Swiper>
    );
  }
}
const styles = {
    maincontainer: {
        marginTop: 54
    },
    slide: {
        flex: 1
    },
    styleLayer: {
        height: 80,
        backgroundColor: '#000000',
        alignItems: 'flex-end'
    },
    imageStyle: {
        width: null,
        height: null,
        flex: 1
    },
    styleButton: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 0.5,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        margin: 10
    },
    textWhite: {
        color: '#FFFFFF'
    }
};

export default connect(null, { deletePictureMyTeam })(DisplayPicture);
