import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import SingleMembreTeamCapitaine from './common/SingleMembreTeamCapitaine';
import { getMembresTeam } from '../actions';

class SelectCapitaineEquipe extends Component {
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

    createDataSource({ players }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(players);
    }

    renderRow(player) {
        return <SingleMembreTeamCapitaine player={player} />;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
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
        flex: 1,
        marginTop: 54
    }
};

const mapStateToProps = ({ membreTeam }) => {
  const { players, refresh } = membreTeam;
  return { players, refresh };
};

export default connect(mapStateToProps, { getMembresTeam })(SelectCapitaineEquipe);
