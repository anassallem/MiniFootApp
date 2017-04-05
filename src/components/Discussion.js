import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { ItemDiscussion } from './common';

class Discussion extends Component {

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
              <View>
                <ItemDiscussion />
                <ItemDiscussion />
                <ItemDiscussion />
              </View>
            </ScrollView>
        );
    }
}

export default Discussion;
