import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Animated, ListView, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Text, Header, Right, Body, Title, Icon } from 'native-base';
import { connect } from 'react-redux';
import SinglePlayerTeamFormation from './common/SinglePlayerTeamFormation';
import { getMembresTeamFormation, filterListTagsFormation, initialStateAddPlayerFormation } from '../actions';

class AddPlayersFormation extends Component {
    constructor(props) {
      super(props);
      this.onButtonPressDelete = this.onButtonPressDelete.bind(this);
    }
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentDidMount() {
        this.props.getMembresTeamFormation(this.props.idEquipe);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onPressConfirm() {
        let newTags = [];
        this.props.tags.forEach((item) => {
            newTags.push({
                idJoueur: { _id: item._id, firstname: item.firstname, joueur: item.joueur, photo: item.photo },
                pan: new Animated.ValueXY(),
                showDraggable: true,
                _id: item._id
            });
        });
        Actions.formation({ type: ActionConst.REPLACE, idEquipe: this.props.idEquipe, tags: newTags });
        this.props.initialStateAddPlayerFormation();
    }
    onButtonPressDelete(ref, item) {
        this.props.filterListTagsFormation(this.props.tags, ref);
    }
    createDataSource({ players }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(players);
    }

    renderRow(player) {
        return <SinglePlayerTeamFormation player={player} />;
    }
    renderList() {
       if (this.props.loading) {
         return <ActivityIndicator size={'large'} color={['#1565C0']} />;
       }
       return (
           <ListView
             enableEmptySections
             dataSource={this.dataSource}
             renderRow={this.renderRow}
             style={{ flex: 1 }}
           />
       );
     }
    renderTagsView() {
        return this.props.tags.map((item) => {
            return (<View key={item._id} style={styles.styleTag}>
                        <Text style={styles.styleTextTag}>{`${item.firstname} ${item.lastname}`}</Text>
                        <TouchableWithoutFeedback onPress={this.onButtonPressDelete.bind(this, item)}>
                            <Icon name='ios-close-outline' style={styles.styleIcon} />
                        </TouchableWithoutFeedback>
                    </View>);
        });
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header>
                  <Body>
                      <Title>Ajouter des joueurs</Title>
                  </Body>
                  <Right>
                      <TouchableWithoutFeedback onPress={this.onPressConfirm.bind(this)}>
                      <Text style={styles.textHeaderStyle}>Confirmer</Text>
                      </TouchableWithoutFeedback>
                  </Right>
                </Header>
                <View style={styles.containerBody}>
                    <View style={styles.containerTags}>
                        <ScrollView horizontal>
                            {this.renderTagsView()}
                        </ScrollView>
                    </View>
                    <ScrollView>
                        {this.renderList()}
                    </ScrollView>
                </View>
           </View>
        );
    }
}

const styles = {
    mainContainer: {
        flex: 1
    },
    containerBody: {
        margin: 10
    },
    textHeaderStyle: {
        color: '#FFFFFF'
    },
    containerTags: {
        height: 46,
        padding: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#EEEEEE',
        backgroundColor: '#EEEEEE'
    },
    styleTag: {
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderWidth: 1,
        borderRadius: 5
    },
    styleTextTag: {
        color: '#FFFFFF',
    },
    styleIcon: {
        marginLeft: 5,
        color: '#FFFFFF'
    }
};


const mapStateToProps = ({ playersFormation }) => {
  const { players, tags, loading } = playersFormation;
  return { players, tags, loading };
};

export default connect(mapStateToProps, { getMembresTeamFormation, filterListTagsFormation, initialStateAddPlayerFormation })(AddPlayersFormation);
