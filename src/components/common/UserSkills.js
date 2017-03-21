import React from 'react';
import { Text, Card, CardItem, Body, Col, Grid } from 'native-base';
import StarRating from 'react-native-star-rating';

const UserSkills = ({ AC, DF, MC, GB, nbrAC, nbrDF, nbrMC, nbrGB, disabled }) => {
  const { containerInfo, textStyle } = styles;
  return (
            <Card style={containerInfo}>
                <CardItem header bordered style={{ borderBottomColor: '#9E9E9E', borderBottomWidth: 0.2 }}>
                    <Text>Compétences</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>AC</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={AC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                />
                            </Col>
                            <Col style={{ marginLeft: 30 }}>
                            <Text style={textStyle}>{nbrAC} personnes</Text></Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>DF</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={DF} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                />
                            </Col>
                            <Col style={{ marginLeft: 30 }}>
                            <Text style={textStyle}>{nbrDF} personnes</Text></Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>MC</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={MC} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                />
                            </Col>
                            <Col style={{ marginLeft: 30 }}>
                            <Text style={textStyle}>{nbrMC} personnes</Text></Col>
                        </Grid>
                        <Grid style={{ alignItems: 'center' }}>
                            <Col style={{ width: 50 }}>
                                <Text>GB</Text>
                            </Col>
                            <Col>
                                <StarRating disabled emptyStar={'ios-star-outline'} fullStar={'ios-star'} halfStar={'ios-star-half'} iconSet={'Ionicons'}
                                    maxStars={5} rating={GB} starColor={'#2196F3'} starSize={30} emptyStarColor={'#2196F3'} disabled={disabled}
                                />
                            </Col>
                            <Col style={{ marginLeft: 30 }}>
                            <Text style={textStyle}>{nbrGB} personnes</Text></Col>
                        </Grid>
                    </Body>
                 </CardItem>
           </Card>
  );
};

const styles = {
  containerInfo: {
    margin: 10
  },
  textStyle: {
    color: '#616161',
    fontSize: 14
  }
};

export { UserSkills };
