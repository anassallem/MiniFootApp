import React, { Component } from 'react';
import { Dimensions, Image, TouchableNativeFeedback } from 'react-native';
import { Container, Thumbnail, Text, Button, Icon } from 'native-base';
import StarRating from 'react-native-star-rating';

const backgroundImage = require('../assets/backgroundprofil.png');

class UserCharacteristic extends Component {
  onClickImage() {
    this.props.onClickImage();
  }
  onClickButtonUpload() {
      this.props.onClickButtonUpload();
  }
  renderButton() {
    if (this.props.display === true) {
      return (<Button iconLeft style={styles.buttonStyle} onPress={this.onClickButtonUpload.bind(this)}>
                  <Icon name='ios-camera-outline' style={styles.colorGray} />
                  <Text style={styles.colorGray}>
                   Changer photo
                  </Text>
             </Button>);
    }
  }
  render() {
      const { background, styleUserImage, styleContainerUser, styleCharacteristic, textStyle, textStyleCharacteristic } = styles;
      const { imageUser, userName, age, poids, taille, total } = this.props;
      return (
        <Image source={backgroundImage} style={background}>
           <Container style={styleContainerUser}>
               <TouchableNativeFeedback onPress={this.onClickImage.bind(this)}>
                   <Thumbnail source={{ uri: imageUser }} style={styleUserImage} />
               </TouchableNativeFeedback>
               <Text style={textStyle}>{userName}</Text>
               <StarRating
                  disabled
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  rating={total}
                  starColor={'yellow'}
                  starSize={20}
                  emptyStarColor={'yellow'}
               />
                {this.renderButton()}
           </Container>
           <Container style={styleCharacteristic}>
               <Container style={{ alignItems: 'center' }}>
                   <Text style={textStyle}>{age} ans</Text>
                   <Text style={textStyleCharacteristic}>Age</Text>
               </Container>
               <Container style={{ alignItems: 'center' }}>
                   <Text style={textStyle}>{poids} Kg</Text>
                   <Text style={textStyleCharacteristic}>Poids</Text>
               </Container>
               <Container style={{ alignItems: 'center' }}>
                   <Text style={textStyle}>{taille} cm</Text>
                   <Text style={textStyleCharacteristic}>Taille</Text>
               </Container>
           </Container>

        </Image>
      );
  }
}
const { width } = Dimensions.get('window');
const styles = {
  background: {
    width,
    height: 300,
    backgroundColor: 'transparent',
    marginTop: 50
  },
  styleUserImage: {
   width: 100,
   height: 100,
   marginTop: 30,
   borderRadius: 50,
   borderWidth: 2,
   borderColor: '#FFFFFF'
  },
  styleContainerUser: {
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 30,
   marginTop: 40
  },
  styleCharacteristic: {
   flexDirection: 'row',
   paddingTop: 30
  },
  textStyle: {
   color: '#FFFFFF',
   fontSize: 20
  },
  textStyleCharacteristic: {
   color: '#FFFFFF',
   marginTop: 10
  },
  buttonStyle: {
     backgroundColor: '#FFFFFF',
     alignSelf: 'center',
     height: 30,
     marginTop: 10,
     marginBottom: 10
  },
  colorGray: {
      color: '#616161'
  }
};

export { UserCharacteristic };
