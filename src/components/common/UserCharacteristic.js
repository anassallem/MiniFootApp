import React, { Component } from 'react';
import { Dimensions, Image, TouchableNativeFeedback } from 'react-native';
import { Container, Thumbnail, Text, Button } from 'native-base';
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
      return <Button light onPress={this.onClickButtonUpload.bind(this)}><Text> Upload </Text></Button>;
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
                {this.renderButton()}         
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
   borderRadius: 50,
   borderWidth: 2,
   borderColor: '#FFFFFF'
  },
  styleContainerUser: {
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 30,
   marginTop: 30
  },
  styleCharacteristic: {
   flexDirection: 'row'
  },
  textStyle: {
   color: '#FFFFFF',
   fontSize: 20
  },
  textStyleCharacteristic: {
   color: '#FFFFFF',
   marginTop: 10
  }
};

export { UserCharacteristic };
