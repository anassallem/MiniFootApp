import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { URL } from '../../actions/api/config';

const logoStade = require('../assets/photostade.jpg');

class ItemStade extends Component {
    onPressButton() {
        const { stade } = this.props;
        Actions.profileStade({ stade, title: stade.name });
    }
    renderPhoto() {
      const { photos } = this.props.stade;
      if (photos.length > 0) {
          const uriImgStade = `${URL}/stade/stadeUploads/${photos[0]}`;
          return <Image source={{ uri: uriImgStade }} style={styles.styleImage} />;
      }
          return <Image source={logoStade} style={styles.styleImage} />;
    }
    render() {
        const { name, adresse } = this.props.stade;
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this)}>
                <View style={styles.maincontainer}>
                    {this.renderPhoto()}
                    <View style={styles.containerBody}>
                        <Icon name='ios-expand-outline' style={styles.styleIconLeft} />
                        <View style={styles.containerText}>
                            <View style={styles.styleText}>
                                <Text>Nom de stade: </Text>
                                <Text style={styles.styleColorBlue}>{`${name}`}</Text>
                            </View>
                            <View style={styles.styleText}>
                                <Text>Adresse: </Text>
                                <Text style={styles.styleColorBlue}>{`${adresse}`}</Text>
                            </View>
                        </View>
                        <Icon name='ios-locate-outline' style={styles.styleIconRight} />
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
const { width } = Dimensions.get('window').width;
const styles = {
    maincontainer: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderWidth: 0.5,
        borderColor: '#EEEEEE'
    },
    containerBody: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        flex: 1
    },
    containerText: {
        flexDirection: 'column',
        marginLeft: 20,
        flex: 6
    },
    styleImage: {
        width: width - 20,
        height: 200
    },
    styleText: {
        flexDirection: 'row'
    },
    styleIconLeft: {
        color: '#424242'
    },
    styleIconRight: {
        color: '#F44336',
        justifyContent: 'center',
        flex: 1
    },
    styleColorBlue: {
        color: '#2196F3',
        justifyContent: 'center',
        flex: 1
    }
};

export { ItemStade };
