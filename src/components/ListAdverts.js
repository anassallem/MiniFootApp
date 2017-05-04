import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import SingleItemAdvert from './common/SingleItemAdvert';
import { getListAdverts, initialListAdverts } from '../actions';

class ListAdverts extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
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

    renderRow(advert) {
      return <SingleItemAdvert advert={advert} user={this.props.user} />;
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
        backgroundColor: '#F5F5F5'
    }
};
const mapStateToProps = ({ listAdverts }) => {
  const { adverts, page, refreshing } = listAdverts;
  return { adverts, page, refreshing };
};
export default connect(mapStateToProps, { getListAdverts, initialListAdverts })(ListAdverts);
