import React, { Component } from 'react';
import { Text, Icon, Button, Card } from 'native-base';
import { View, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

const stickersPlayer = require('../assets/stickers.png');

class UserSkills extends Component {

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
                     <Icon active name="ios-send-outline" />
                     <Text style={styles.colorGray}>Envoyer</Text>
                 </Button>);
     }
  }
  render() {
      const { AC, DF, MC, GB, nbrNote, disabled } = this.props;
      return (
          <Card>
            <View style={styles.mainContainer}>
                <Image source={stickersPlayer} style={styles.styleImage} resizeMode='stretch'>
                    <View style={styles.containerAC}>
                        <Text>Attaque</Text>
                        <Text style={styles.textStyle}>Technique et vitesse</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={AC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressAC(rating)}
                        />
                    </View>
                    <View style={styles.containerMC}>
                        <Text>Milieu</Text>
                        <Text style={styles.textStyle}>Tactique et concentration</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={MC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressMC(rating)}
                        />
                    </View>
                    <View style={styles.containerDF}>
                        <Text>Défence</Text>
                        <Text style={styles.textStyle}>Endurance et vitesse</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={DF} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressDF(rating)}
                        />
                    </View>
                    <View style={styles.containerGB}>
                        <Text>Gardien</Text>
                        <Text style={styles.textStyle}>Anticipation et rapidité</Text>
                        <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                            maxStars={5} rating={GB} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                            selectedStar={(rating) => this.onStarRatingPressGB(rating)}
                        />
                    </View>
                </Image>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    {this.renderButton()}
                    <Text style={styles.textStyle}>{nbrNote} personnes</Text>
                </View>
            </View>
        </Card>
    );
  }
}

const styles = {
  mainContainer: {
      margin: 5
  },
  styleImage: {
      width: null,
      height: 290,
      paddingTop: 5,
      paddingBottom: 5
  },
  containerAC: {
      alignSelf: 'flex-start',
  },
  containerMC: {
      alignSelf: 'flex-end',
      marginTop: 30,
  },
  containerDF: {
      alignSelf: 'flex-start',
      marginTop: 10
  },
  containerGB: {
      alignSelf: 'flex-end',
      marginTop: 10
  },
  textStyle: {
      color: '#616161',
      fontSize: 12
  },
  colorGray: {
      color: '#616161'
  }
};

export { UserSkills };
