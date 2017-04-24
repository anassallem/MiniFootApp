import React, { Component } from 'react';

import { View, Text, TouchableNativeFeedback, Image, Dimensions, Modal, ScrollView, NativeModules } from 'react-native';
import { Header, Right, Body, Title, Icon } from 'native-base';
import { connect } from 'react-redux';
import { setModalVisible, setMultiplePhotos } from '../actions';

var ImagePicker = NativeModules.ImageCropPicker;

class ShowTeamPhotos extends Component {

  //<Text style={styles.textStyle} onPress={() => { this.setModalVisible(false); }}> close</Text>
  onButtonAdd() {
    ImagePicker.openPicker({
    multiple: true
    }).then(images => {
      this.props.setMultiplePhotos(images);
    });
  }

  onModalVisible(visible, imageKey) {
    this.props.setModalVisible(visible, imageKey);
  }

  getImage() {
    return this.props.modalImage;
  }

  renderMultiplePhotos() {
    if (this.props.photos !== null) {
      return this.props.photos.map((photo, key) => {
        return (
          <View key={key} style={styles.imgWrap}>
                  <Image source={{ uri: photo.path }} style={styles.imageStyle} />
          </View>
        );
      });
    }
  }

  render() {
    const images = this.props.images.map((val, key) => {
      return (
        <TouchableNativeFeedback key={key} onPress={() => { this.onModalVisible(true, key); }}>
          <View style={styles.imgWrap}>
                  <Image source={val} style={styles.imageStyle} />
          </View>
        </TouchableNativeFeedback>
      );
    });

    return (
      <View >
        <Header>
          <Body>
              <Title>Photos</Title>
          </Body>
          <Right>
              <TouchableNativeFeedback onPress={this.onButtonAdd.bind(this)}>
                <Icon name="ios-camera-outline" style={{ color: '#fff', paddingRight: 20 }} />
              </TouchableNativeFeedback>
          </Right>
        </Header>
        <ScrollView>

          <View style={styles.mainContainer}>
            <Modal
              style={styles.modalStyle}
              animationType={'fade'}
              transparent
              visible={this.props.modalVisible}
              onRequestClose={() => {}}
            >
              <View style={styles.modalStyle}>
                <View style={styles.textStyle}>
                  <TouchableNativeFeedback onPress={() => { this.onModalVisible(false); }}>
                      <Icon name="ios-close-outline" style={{ color: '#fff' }} />
                  </TouchableNativeFeedback>
                </View>
                  <Image source={this.props.modalImage} style={styles.imageStyle} />
              </View>
            </Modal>
              {this.renderMultiplePhotos()}
              {images}
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
    textHeaderStyle: {
        color: '#FFFFFF'
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
    modalStyle: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    textStyle: {
      height: 50,
      paddingLeft: 280,
    }
  };

const mapStateToProps = ({ teamPhotos }) => {
    const { modalVisible, modalImage, images, photos } = teamPhotos;
    return { modalVisible, modalImage, images, photos };
  };
  export default connect(mapStateToProps, { setModalVisible, setMultiplePhotos })(ShowTeamPhotos);
