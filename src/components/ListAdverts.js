import React, { Component } from 'react';
import { View, ListView, RefreshControl, Modal, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import SingleItemAdvert from './common/SingleItemAdvert';
import { getListAdverts, initialListAdverts, closeModal } from '../actions';
import { ItemPlayer } from './common';

class ListAdverts extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
        this.createDataSourceInteressted(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        this.createDataSourceInteressted(nextProps);
    }
    onRefresh() {
        this.props.initialListAdverts(this.props.user._id);
    }
    onEndReached() {
        this.props.getListAdverts(this.props.page, this.props.user._id);
    }
    createDataSource({ adverts }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(adverts);
    }
    createDataSourceInteressted({ listInteressted }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSourceInterssted = ds.cloneWithRows(listInteressted);
    }
    renderRow(advert) {
      return <SingleItemAdvert advert={advert} user={this.props.user} />;
    }
    renderRowPlayer(player) {
        return <ItemPlayer player={player} />;
    }
    renderListIntersted() {
      if (this.props.loading === true) {
        return (<Modal animationType={'fade'} transparent visible={this.props.loading} onRequestClose={() => {}}>
                  <View style={styles.containerLoadingStyle}>
                    <View style={styles.containerLoadingModal}>
                        <TouchableNativeFeedback onPress={() => { this.props.closeModal(); }}>
                            <View style={{ alignSelf: 'flex-end', margin: 5 }}>
                                <Icon name='ios-close-circle-outline' />
                            </View>
                        </TouchableNativeFeedback>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSourceInterssted}
                            renderRow={this.renderRowPlayer.bind(this)}
                        />
                    </View>
                  </View>
                </Modal>
                );
      }
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
                {this.renderListIntersted()}
            </View>
        );
    }
}
const styles = {
    mainContainer: {
        flex: 1,
        padding: 5,
        backgroundColor: '#F5F5F5'
    },
    containerLoadingStyle: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    containerLoadingModal: {
        borderWidth: 0.5,
        borderColor: '#9E9E9E',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        padding: 5,
        height: 400
    },
};
const mapStateToProps = ({ listAdverts }) => {
  const { adverts, page, refreshing, listInteressted, loading } = listAdverts;
  return { adverts, page, refreshing, listInteressted, loading };
};
export default connect(mapStateToProps, { getListAdverts, initialListAdverts, closeModal })(ListAdverts);
