import React, { Component } from 'react';
import { Text, Card, CardItem, Body, Col, Grid, Icon, Button } from 'native-base';
import StarRating from 'react-native-star-rating';

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
      const { containerInfo, textStyle, styleContainerFooter } = styles;
      return (
            <Card style={containerInfo}>
                <CardItem header bordered style={{ borderBottomColor: '#9E9E9E', borderBottomWidth: 0.2 }}>
                    <Text>Compétences</Text>
                </CardItem>
                <CardItem style={{ paddingLeft: 50, paddingRight: 50 }}>
                    <Body>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>AC</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={AC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                    selectedStar={(rating) => this.onStarRatingPressAC(rating)}
                                />
                            </Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>DF</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={DF} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                    selectedStar={(rating) => this.onStarRatingPressDF(rating)}
                                />
                            </Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>MC</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={MC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                    selectedStar={(rating) => this.onStarRatingPressMC(rating)}
                                />
                            </Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>GB</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={GB} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                    selectedStar={(rating) => this.onStarRatingPressGB(rating)}
                                />
                            </Col>
                        </Grid>
                    </Body>
                 </CardItem>
                 <CardItem footer style={styleContainerFooter}>
                    {this.renderButton()}
                    <Text style={textStyle}>{nbrNote} personnes</Text>
                 </CardItem>
           </Card>
    );
  }
}

const styles = {
  containerInfo: {
      margin: 10
  },
  textStyle: {
      color: '#616161',
      fontSize: 14
  },
  colorGray: {
      color: '#616161'
  },
  styleContainerFooter: {
      justifyContent: 'space-around',
      backgroundColor: '#FAFAFA',
  }
};

export { UserSkills };
