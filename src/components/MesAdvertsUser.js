import React, { Component } from 'react';
import { View, ListView, RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getListAdvertsUser, deleteAdvertUserById } from '../actions';
import { SingleItemAdvertUser } from './common';

class MesAdvertsUser extends Component {
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
        this.props.getListAdvertsUser(0, this.props.user._id);
    }
    onEndReached() {
        this.props.getListAdvertsUser(this.props.page, this.props.user._id);
    }
    handleDeleteAdvert(idAdvert) {
        Alert.alert('Attention', 'Vous voulez vraiment supprimer cette annonce',
        [{ text: 'Confirmer', onPress: () => this.props.deleteAdvertUserById(idAdvert) }, { text: 'Annuler', onPress: () => console.log('OK Pressed!') }]);
    }
    createDataSource({ adverts }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(adverts);
    }
    renderRow(advert) {
        return <SingleItemAdvertUser advert={advert} idUser={this.props.user._id} delete onPressDelete={this.handleDeleteAdvert.bind(this)} />;
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={5}
                        refreshControl={
                            <RefreshControl
                                tintColor='blue'
                                colors={['#64B5F6', '#2196F3', '#1976D2']}
                                refreshing={this.props.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
            </View>
        );
    }
}
const styles = {
    mainContainer: {
        flex: 1,
        padding: 5,
        backgroundColor: '#F5F5F5',
        marginTop: 54
    }
};
const mapStateToProps = ({ mesAdverts, homeDiscussion }) => {
  const { adverts, page, refreshing } = mesAdverts;
  const { user } = homeDiscussion;
  return { adverts, page, refreshing, user };
};
export default connect(mapStateToProps, { getListAdvertsUser, deleteAdvertUserById })(MesAdvertsUser);
