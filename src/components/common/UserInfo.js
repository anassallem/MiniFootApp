import React from 'react';
import { Text, Card, CardItem, Icon } from 'native-base';

const UserInfo = ({ city, position, email, phone, equipe, adresse }) => {
  const { containerInfo, textStyle, styleIcon } = styles;
  return (
            <Card style={containerInfo}>
                <CardItem header bordered style={{ borderBottomColor: '#9E9E9E', borderBottomWidth: 0.2 }}>
                    <Text>Informations générale</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-navigate-outline" style={styleIcon} />
                    <Text style={textStyle}>Habite à {city}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-home-outline" style={styleIcon} />
                    <Text style={textStyle}>{adresse}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-football-outline" style={styleIcon} />
                    <Text style={textStyle}>{position}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-mail-open-outline" style={styleIcon} />
                    <Text style={textStyle}>{email}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-call-outline" style={styleIcon} />
                    <Text style={textStyle}>{phone}</Text>
                </CardItem>
                <CardItem>
                    <Icon name="ios-shirt-outline" style={styleIcon} />
                    <Text style={textStyle}>Joué avec {equipe}</Text>
                </CardItem>
           </Card>
  );
};

const styles = {
  containerInfo: {
    margin: 10
  },
  textStyle: {
    color: '#616161'
  },
  styleIcon: {
     color: '#616161',
   }
};

export { UserInfo };
