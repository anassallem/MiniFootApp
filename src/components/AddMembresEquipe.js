import React, { Component } from 'react';
import { View, ListView, ScrollView, TouchableWithoutFeedback, TextInput, ActivityIndicator, AsyncStorage, Modal } from 'react-native';
import { Text, Header, Right, Body, Title, Icon } from 'native-base';
import { connect } from 'react-redux';
import SinglePlayerSearchTeam from './common/SinglePlayerSearchTeam';
import { getAllUserEquipe, searchPalyersTeamChanged, filterListTags, envoyerIvitationEquipe } from '../actions';

class AddMembresEquipe extends Component {
    constructor(props) {
      super(props);
      this.onButtonPressDelete = this.onButtonPressDelete.bind(this);
    }
    componentWillMount() {
        this.createDataSource(this.props);
        this.props.getAllUserEquipe(this.props.search, 0);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onSearchChanged(text) {
      this.props.getAllUserEquipe(text, 0);
      this.props.searchPalyersTeamChanged(text);
    }
    onEndReached() {
        this.props.getAllUserEquipe(this.props.search, this.props.page);
    }
    onPressEnvoyer() {
        AsyncStorage.getItem('equipe').then((value) => {
            const equipe = JSON.parse(value);
            this.props.envoyerIvitationEquipe();
            const notify = { users: this.props.tags, title: equipe.name, idEquipe: equipe._id, icon: equipe.logo };
            this.props.socket.emit('invitationEquipe', notify);
        }).done();
    }
    onButtonPressDelete(ref, item) {
        this.props.filterListTags(this.props.tags, ref);
    }
    createDataSource({ users }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(users);
    }

    renderRow(player) {
        return <SinglePlayerSearchTeam player={player} />;
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
    renderLoading() {
      if (this.props.loading === true) {
        return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                  <View style={styles.containerLoadingStyle}>
                    <View style={styles.containerLoadingModal}>
                      <ActivityIndicator size="large" color={['#FFFFFF']} />
                      <Text style={styles.styleTextLoading}>  Chargement ...</Text>
                    </View>
                  </View>
                </Modal>
                );
      }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Header>
                  <Body>
                      <Title>Inviter des joueurs</Title>
                  </Body>
                  <Right>
                      <TouchableWithoutFeedback onPress={this.onPressEnvoyer.bind(this)}>
                      <Text style={styles.textHeaderStyle}>Envoyer</Text>
                      </TouchableWithoutFeedback>
                  </Right>
                </Header>
                {this.renderLoading()}
                <View style={styles.containerBody}>
                    <View style={styles.containerTags}>
                        <ScrollView horizontal>
                            {this.renderTagsView()}
                        </ScrollView>
                    </View>
                    <View style={styles.styleInputSearch}>
                        <Icon name='ios-people' style={styles.styleIconSearch} />
                        <TextInput
                            onChangeText={this.onSearchChanged.bind(this)}
                            value={this.props.search}
                            style={{ flex: 1 }}
                            underlineColorAndroid={'transparent'}
                            placeholder='Ajouter des joueurs'
                        />
                    </View>
                    <ListView
                      enableEmptySections
                      dataSource={this.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      pageSize={10}
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={5}
                    />
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
    },
    styleIconSearch: {
        marginLeft: 5,
        marginRight: 5,
        color: '#2962FF'
    },
    styleInputSearch: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerLoadingStyle: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    containerLoadingModal: {
       backgroundColor: '#01579B',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 30,
       marginLeft: 30,
       marginRight: 30
    },
    styleTextLoading: {
       color: '#FFFFFF'
    }
};


const mapStateToProps = ({ membreTeam, homeDiscussion }) => {
  const { users, search, tags, refresh, loading, page } = membreTeam;
  const { socket } = homeDiscussion;
  return { users, search, tags, refresh, loading, socket, page };
};

export default connect(mapStateToProps, { getAllUserEquipe, searchPalyersTeamChanged, filterListTags, envoyerIvitationEquipe })(AddMembresEquipe);
