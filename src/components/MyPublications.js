import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import SingleItemPublication from './common/SingleItemPublication';
import { getPublications, initialListPublications } from '../actions';

class MyPublications extends Component {
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentDidMount() {
        this.props.getPublications(this.props.team._id, this.props.page);
    }
    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }
    onRefresh() {
        this.props.initialListPublications(this.props.team._id);
    }

    onEndReached() {
      if (this.props.page !== 0) {
          this.props.getPublications(this.props.team._id, this.props.page);
      }
    }
    createDataSource({ adverts }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(adverts);
    }

    renderRow(advert) {
      return <SingleItemPublication advert={advert} team={this.props.team} />;
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
        marginTop: 54,
        backgroundColor: '#F5F5F5'
    }
};
const mapStateToProps = ({ myPublications }) => {
  const { adverts, page, refreshing } = myPublications;
  return { adverts, page, refreshing };
};
export default connect(mapStateToProps, { getPublications, initialListPublications })(MyPublications);
