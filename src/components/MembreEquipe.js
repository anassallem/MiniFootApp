import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ListView, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Text, Header, Right, Body, Title } from 'native-base';
import MembreTeam from './common/MembreTeam';
import { getMembresTeam } from '../actions';

class MembreEquipe extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentDidMount() {
      this.onRefresh();
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onRefresh() {
      this.props.getMembresTeam(this.props.idEquipe);
    }

    onButtonAddMembreTeam() {
        Actions.addMembresEquipe();
    }

    createDataSource({ players }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(players);
    }

    renderRow(player) {
        return <MembreTeam player={player} />;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header>
                  <Body>
                      <Title>Membres Equipe</Title>
                  </Body>
                  <Right>
                      <TouchableWithoutFeedback onPress={this.onButtonAddMembreTeam.bind(this)}>
                          <Text style={styles.textHeaderStyle}>Inviter</Text>
                      </TouchableWithoutFeedback>
                  </Right>
                </Header>
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
                  refreshControl={
                  <RefreshControl
                    tintColor='blue'
                    colors={['#64B5F6', '#2196F3', '#1976D2']}
                    refreshing={this.props.refresh}
                    onRefresh={this.onRefresh.bind(this)}
                  />}
                />
           </View>
        );
    }
}
const styles = {
    mainContainer: {
        flex: 1
    },
    textHeaderStyle: {
      color: '#FFFFFF'
    }
};


const mapStateToProps = ({ membreTeam }) => {
  const { players, refresh } = membreTeam;
  return { players, refresh };
};

export default connect(mapStateToProps, { getMembresTeam })(MembreEquipe);
