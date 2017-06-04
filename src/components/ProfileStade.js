import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Image, Dimensions, Text, TouchableNativeFeedback, ScrollView, ListView } from 'react-native';
import { Icon } from 'native-base';
import { URL } from '../actions/api/config';
import { clickLikeStade, verifLickStade, clickDeslikeStade } from '../actions';

const logoStade = require('./assets/photostade.jpg');

class ProfileStade extends Component {
  componentWillMount() {
        this.createDataSource(this.props);
  }
  componentDidMount() {
      this.props.verifLickStade(this.props.stade._id, this.props.user._id);
  }
  componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
  }
  onClickImage(tag, e) {
      let position = 0;
      this.props.stade.photos.forEach((photo, i) => {
         if (photo === tag) {
             position = i;
         }
      });
      Actions.displayPicture({ photos: this.props.stade.photos, index: position, delete: false, typePictures: 'Stade' });
  }
  onClickLike() {
      this.props.clickLikeStade(this.props.stade._id, this.props.user._id);
  }
  onClickDeslike() {
      this.props.clickDeslikeStade(this.props.stade._id, this.props.user._id);
  }
  createDataSource({ stade }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(stade.photos);
  }
  renderBodyImage() {
        return (
            <View style={styles.containerImage}>
                <View style={styles.styleNameStade}>
                    <Icon name='ios-expand-outline' style={styles.styleIconLeft} />
                    <Text style={styles.textWhite}>{this.props.stade.name}</Text>
                </View>
                <View style={styles.styleNameStade}>
                    <Icon name='ios-locate-outline' style={styles.styleIconRight} />
                    <Text style={styles.textWhite}>Carte</Text>
                </View>
            </View>
        );
  }
  renderImageStade() {
      if (this.props.stade.photos.length > 0) {
          const uriImgStade = `${URL}/stade/stadeUploads/${this.props.stade.photos[0]}`;
          return (
                <Image source={{ uri: uriImgStade }} style={styles.styleImage}>
                    {this.renderButton()}
                    {this.renderBodyImage()}
                </Image>
            );
      }
          return (
                  <Image source={logoStade} style={styles.styleImage}>
                      {this.renderButton()}
                      {this.renderBodyImage()}
                  </Image>
              );
  }
  renderButton() {
      if (!this.props.etat) {
          return (
              <TouchableNativeFeedback onPress={this.onClickLike.bind(this)}>
                  <View style={styles.containerButton}>
                      <Text style={styles.textButton}>J'aime</Text>
                  </View>
              </TouchableNativeFeedback>
          );
      } else if (this.props.etat) {
          return (
              <TouchableNativeFeedback onPress={this.onClickDeslike.bind(this)}>
                  <View style={styles.containerButton}>
                      <Text style={styles.textButtonBlue}>J'aime</Text>
                  </View>
              </TouchableNativeFeedback>
          );
      }
  }
  renderOption(option, name) {
      if (option) {
          return (
              <View style={styles.containerProp}>
                  <Icon name='ios-checkmark-outline' style={{ color: '#4CAF50', marginRight: 10 }} />
                  <Text>{name}</Text>
              </View>
          );
      }
  }

  renderRow(photo) {
      const uriImgStade = `${URL}/stade/stadeUploads/${photo}`;
      return (
          <TouchableNativeFeedback onPress={this.onClickImage.bind(this, photo)}>
              <Image source={{ uri: uriImgStade }} style={styles.stylePhoto} />
          </TouchableNativeFeedback>
        );
  }

  render() {
      const { stade } = this.props;
    return (
        <ScrollView>
            <View style={styles.maincontainer}>
                {this.renderImageStade()}
                <View style={styles.containerTitle}>
                    <Icon name='ios-images-outline' style={styles.styleIcon} />
                    <Text style={styles.styleTitle}>Photos de stade</Text>
                </View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <View style={styles.containerTitle}>
                    <Icon name='ios-list-box-outline' style={styles.styleIcon} />
                    <Text style={styles.styleTitle}>Information générale</Text>
                </View>
                <View style={styles.containerProp}>
                    <Icon name='ios-compass-outline' style={{ marginRight: 10, color: '#9E9E9E' }} />
                    <View style={styles.styleLineDirection}>
                        <Text>localisé à { (stade.adresse === undefined) ? "pas d'adresse" : stade.adresse } </Text>
                        <Text>, { (stade.city === undefined) ? '' : stade.city } </Text>
                    </View>
                </View>
                <View style={styles.containerProp}>
                    <Icon name='ios-contact-outline' style={{ marginRight: 10, color: '#9E9E9E' }} />
                    <Text>{`appartient à ${stade.user.firstname} ${stade.user.lastname}`}</Text>
                </View>
                <View style={styles.containerProp}>
                    <Icon name='ios-call-outline' style={{ marginRight: 14, color: '#9E9E9E' }} />
                    <Text>numéro </Text>
                </View>
                <View style={styles.containerTitle}>
                    <Icon name='ios-build-outline' style={styles.styleIcon} />
                    <Text style={styles.styleTitle}>Equipements de stade</Text>
                </View>
                <View style={styles.containerProp}>
                    <Icon name='ios-checkmark-outline' style={{ marginRight: 10, color: '#4CAF50' }} />
                    <Text>qualité du tarton { (stade.tarton === undefined) ? 'non défini' : stade.tarton }</Text>
                </View>
                {this.renderOption(stade.options.vestiaire, 'Vestaire')}
                {this.renderOption(stade.options.cafe, 'Café')}
                {this.renderOption(stade.options.lumiere, 'Lumière')}
                {this.renderOption(stade.options.arbitre, 'Arbitre')}
            </View>
        </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window').width;
const styles = {
    maincontainer: {
        marginTop: 54
    },
    styleImage: {
        width,
        height: 200,
        justifyContent: 'flex-end'
    },
    containerImage: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 1
    },
    styleNameStade: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleIconLeft: {
        color: '#FFFFFF'
    },
    styleIconRight: {
        color: '#FFCDD2'
    },
    textWhite: {
        color: '#FFFFFF',
        marginLeft: 10
    },
    containerButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#424242',
        borderWidth: 0.5,
        backgroundColor: '#FAFAFA',
        alignSelf: 'flex-end',
        marginBottom: -15,
        marginRight: 10,
        zIndex: 2
    },
    textButton: {
        color: '#000000'
    },
    textButtonBlue: {
        color: '#2196F3'
    },
    containerTitle: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    styleIcon: {
        color: '#2196F3',
        marginRight: 10
    },
    styleText: {
        color: '#2196F3'
    },
    containerProp: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EEEEEE'
    },
    styleTitle: {
        color: '#2196F3'
    },
    styleLineDirection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    stylePhoto: {
        width: 100,
        height: 100,
        margin: 2
    },
    containerLoadingStyle: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    containerLoadingModal: {
        borderWidth: 0.5,
        borderColor: '#232123',
        backgroundColor: '#232123',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        height: 400
    },
    imageStyle: {
        height: 360,
        width: width - 61
    }
};

const mapStateToProps = ({ profileStade, homeDiscussion }) => {
  const { etat } = profileStade;
  const { user } = homeDiscussion;
  return { etat, user };
};
export default connect(mapStateToProps, { clickLikeStade, verifLickStade, clickDeslikeStade })(ProfileStade);
