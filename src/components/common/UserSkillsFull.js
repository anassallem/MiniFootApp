import React, { Component } from 'react';
import { Text, Icon, Button } from 'native-base';
import { View, Image, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating';

const stickersPlayerAC = require('../assets/stickersAC.png');
const stickersPlayerMC = require('../assets/stickersMC.png');
const stickersPlayerDF = require('../assets/stickersDF.png');
const stickersPlayerGB = require('../assets/stickersGB.png');

class UserSkillsFull extends Component {

  onStarRatingPressAC(rating) {
    this.props.changeRatingAC(rating);
  }
  onStarRatingPressDF(rating) {
    this.props.changeRatingDF(rating);
  }
  onStarRatingPressMC(rating) {
    this.props.changeRatingMC(rating);
  }
  onStarRatingPressGB(rating) {
    this.props.changeRatingGB(rating);
  }

  onButtonPress() {
    this.props.envoyerSkills();
  }

  renderButton() {
     if (this.props.disabled === false) {
         return (<Button transparent onPress={this.onButtonPress.bind(this)}>
                     <Icon active name="ios-send-outline" style={styles.colorWhite} />
                     <Text style={styles.colorWhite}>Envoyer</Text>
                 </Button>);
     }
  }
  render() {
      const { AC, DF, MC, GB, nbrNote, disabled } = this.props;
      return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Image source={stickersPlayerAC} style={styles.styleImageAC} resizeMode='stretch' />
                    <View>
                        <Text>Attaque</Text>
                        <Text style={styles.styleNote}>Marqueur des buts</Text>
                        <Text style={styles.styleNote}>Technique et vitesse</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={AC} starColor={'#FFEB3B'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressAC(rating)}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text>Milieu</Text>
                        <Text style={styles.styleNote}>Créateur de jeu</Text>
                        <Text style={styles.styleNote}>Une bonne vision du jeu</Text>
                        <Text style={styles.styleNote}>Une forte concentration</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={MC} starColor={'#FFEB3B'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressMC(rating)}
                        />
                    </View>
                    <Image source={stickersPlayerMC} style={styles.styleImage} resizeMode='stretch' />
                </View>
                <View style={styles.container}>
                    <Image source={stickersPlayerDF} style={styles.styleImage} resizeMode='stretch' />
                    <View>
                        <Text>Défence</Text>
                        <Text style={styles.styleNote}>Récupération du ballon</Text>
                        <Text style={styles.styleNote}>Endurance et vitesse</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={DF} starColor={'#FFEB3B'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressDF(rating)}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <Text>Gardien</Text>
                        <Text style={styles.styleNote}>Bonne lecture du jeu</Text>
                        <Text style={styles.styleNote}>Anticipation et rapidité</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={GB} starColor={'#FFEB3B'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressGB(rating)}
                        />
                    </View>
                    <Image source={stickersPlayerGB} style={styles.styleImage} resizeMode='stretch' />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.renderButton()}
                    <Text style={styles.textStyle}>{nbrNote} personnes</Text>
                </View>
            </View>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = {
  mainContainer: {
      padding: 20,
      backgroundColor: '#01579B'
  },
  styleImage: {
      width: width / 2,
      height: 120
  },
  styleImageAC: {
      width: (width / 2) - 10,
      height: 120,
      marginRight: 10

  },
  styleNote: {
      fontSize: 12,
      color: '#FAFAFA'
  },
  container: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  textStyle: {
      color: '#FFFFFF',
      fontSize: 12
  },
  colorWhite: {
      color: '#FFFFFF'
  }
};

export { UserSkillsFull };
