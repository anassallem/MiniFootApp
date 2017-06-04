import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Dimensions, Text, ScrollView, TouchableNativeFeedback, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import Timeline from 'react-native-timeline-listview';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { URL } from '../actions/api/config';
import { getMatchs, changeModalReserver, dateChanged, showModalReserver, messageReserverChanged, envoyerMatchForReserver, hideModalChargement } from '../actions';

const logoEquipe = require('./assets/logoEquipe.jpg');
const logoStade = require('./assets/photostade.jpg');

class ReserverStade extends Component {
  componentDidMount() {
      this.props.getMatchs(this.props.stade._id, moment(new Date()).format('DD/MM/YYYY'));
  }
  onPressReserver() {
      this.props.showModalReserver();
  }
  onClickEnvoyer() {
      const notify = { idStade: this.props.stade._id, teamOne: this.props.teamOne, teamTow: this.props.teamTow };
      this.props.socket.emit('reserver', notify);
      this.props.envoyerMatchForReserver(this.props.idMatch, this.props.date, this.props.message);
  }
  onPressCalendar() {
      this.props.changeModalReserver();
  }
  onClickOk() {
      this.props.hideModalChargement();
  }
  handelMessageChanged(message) {
      this.props.messageReserverChanged(message);
  }
  handleDatePicked(date) {
      this.props.dateChanged(date);
      this.props.getMatchs(this.props.stade._id, moment(date).format('DD/MM/YYYY'));
  }
  hideDateTimePicker() {
      this.props.changeModalReserver();
  }
  renderBodyImage() {
        return (
            <View style={styles.containerImage}>
                <View style={styles.styleNameStade}>
                    <Icon name='ios-expand-outline' style={styles.styleIconLeft} />
                    <Text style={styles.textWhite}>{this.props.stade.name}</Text>
                </View>
                <TouchableNativeFeedback onPress={this.onPressReserver.bind(this)}>
                    <View style={styles.containerButton}>
                        <Text style={styles.textButton}>Réserver</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
  }
  renderImageStade() {
      if (this.props.stade.photos.length > 0) {
          const uriImgStade = `${URL}/stade/stadeUploads/${this.props.stade.photos[0]}`;
          return (
                <Image source={{ uri: uriImgStade }} style={styles.styleImage}>
                    {this.renderBodyImage()}
                </Image>
            );
      }
          return (
                  <Image source={logoStade} style={styles.styleImage}>
                      {this.renderBodyImage()}
                  </Image>
              );
  }
  renderLogoTeam(logo) {
      if (logo !== undefined) {
          return <Image style={styles.styleLogo} source={{ uri: `${URL}/equipe/teamUploads/${logo}` }} />;
      }
      return <Image style={styles.styleLogo} source={logoEquipe} />;
  }
  renderDetail(rowData, sectionID, rowID) {
    return (
          <View style={styles.container}>
              <Text style={styles.styleNameTeam}>{rowData.title}</Text>
              <View style={styles.containerBody}>
                  <View style={styles.containerTeam}>
                      {this.renderLogoTeam(rowData.teamOne.logo)}
                      <Text style={styles.styleNameTeam}>{rowData.teamOne.name}</Text>
                  </View>
                  <View style={styles.containerScore}>
                      <Text style={styles.styleScore}>{rowData.scoreOne}</Text>
                      <Text style={styles.styleScore}>:</Text>
                      <Text style={styles.styleScore}>{rowData.scoreTow}</Text>
                  </View>
                  <View style={styles.containerTeam}>
                      {this.renderLogoTeam(rowData.teamTow.logo)}
                      <Text style={styles.styleNameTeam}>{rowData.teamTow.name}</Text>
                  </View>
              </View>
          </View>
    );
  }
  renderTimeLine() {
      if (this.props.events.length > 0) {
          return (
              <Timeline
                  circleSize={20}
                  circleColor='rgb(45,156,219)'
                  lineColor='rgb(45,156,219)'
                  innerCircle={'icon'}
                  timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                  timeStyle={{ textAlign: 'center', backgroundColor: '#2196F3', color: 'white', padding: 5, borderRadius: 13, marginTop: 2 }}
                  descriptionStyle={{ color: 'gray' }}
                  options={{
                      style: { paddingTop: 5 }
                  }}
                  data={this.props.events}
                  renderDetail={this.renderDetail.bind(this)}
              />
          );
      }
  }
  renderModal() {
       return (<Modal animationType={'fade'} transparent visible={this.props.show} onRequestClose={() => {}}>
                 <View style={styles.containerLoadingStyle}>
                   <View style={styles.containerLoadingModal}>
                       <TouchableNativeFeedback onPress={() => { this.props.showModalReserver(); }}>
                           <View style={{ alignItems: 'flex-end', padding: 5, backgroundColor: '#232123', width: width - 61 }}>
                               <Icon name='ios-close-circle-outline' style={{ color: '#FFFFFF' }} />
                           </View>
                       </TouchableNativeFeedback>
                       <TextInput
                           placeholder="Entrer un message..."
                           onChangeText={this.handelMessageChanged.bind(this)}
                           underlineColorAndroid={'#9E9E9E'}
                           value={this.props.message}
                           multiline
                       />
                        <View style={styles.containerEnvoyer}>
                            <Text style={styles.styleTextDate}>le {moment(this.props.date).format('DD/MM/YYYY')}.</Text>
                            <TouchableNativeFeedback onPress={this.onClickEnvoyer.bind(this)}>
                                <View style={styles.styleButtonEnvoyer}>
                                    <Text style={{ color: '#2196F3', fontSize: 14 }}> Envoyer </Text>
                                </View>
                            </TouchableNativeFeedback>
                       </View>
                   </View>
                 </View>
               </Modal>
               );
   }
  renderBodyReserver() {
       if (this.props.response !== 'Chargement ...') {
           return (
               <View style={styles.containerModal}>
                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                       <Text style={styles.styleTextLoading}>{this.props.response}</Text>
                   </View>
                   <View>
                       <TouchableNativeFeedback onPress={this.onClickOk.bind(this)}>
                           <View style={styles.styleButtonOk}>
                               <Text style={{ color: '#000000', fontSize: 14 }}> Ok </Text>
                           </View>
                       </TouchableNativeFeedback>
                   </View>
               </View>
           );
       }
       return (
           <View style={styles.containerModal}>
               <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                   <ActivityIndicator size="large" color={['#FFFFFF']} />
                   <Text style={styles.styleTextLoading}>{this.props.response}</Text>
               </View>
           </View>
       );
    }
  renderLoading() {
       return (<Modal animationType={'fade'} transparent visible={this.props.loadEnvoyer} onRequestClose={() => {}}>
                 <View style={styles.containerLoading}>
                       {this.renderBodyReserver()}
                 </View>
               </Modal>
               );
    }
  render() {
    return (
        <ScrollView>
            <View style={styles.maincontainer}>
                {this.renderImageStade()}
            </View>
            {this.renderModal()}
            {this.renderLoading()}
            <View>
                <DateTimePicker
                    isVisible={this.props.visible}
                    onConfirm={this.handleDatePicked.bind(this)}
                    onCancel={this.hideDateTimePicker.bind(this)}
                />
                <View style={styles.containerCalendar}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        value={moment(this.props.date).format('DD/MM/YYYY')}
                        style={styles.inputStyle}
                        placeholderTextColor='#eeeeee'
                        editable={false}
                    />
                    <View style={styles.containerIcon} >
                        <TouchableNativeFeedback onPress={this.onPressCalendar.bind(this)}>
                            <Icon name='ios-calendar-outline' style={{ color: '#2196F3' }} />
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    {this.renderTimeLine()}
                </View>
            </View>
        </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window').width;
const styles = {
    maincontainer: {
        marginTop: 54
    },
    styleImage: {
        width,
        height: 200,
        justifyContent: 'flex-end'
    },
    containerImage: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    styleNameStade: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleIconLeft: {
        color: '#FFFFFF'
    },
    styleIconRight: {
        color: '#FFCDD2'
    },
    textWhite: {
        color: '#FFFFFF',
        marginLeft: 10
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#232123',
        padding: 5,
        borderWidth: 0.5,
        borderRadius: 10
    },
    containerTeam: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerScore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FAFAFA'
    },
    styleScore: {
        fontSize: 30,
        color: '#EEEEEE',
        marginLeft: 5,
        marginRight: 5
    },
    styleNameTeam: {
        color: '#FFFFFF'
    },
    containerButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#424242',
        borderWidth: 0.5,
        backgroundColor: '#FAFAFA',
        alignSelf: 'flex-end',
        marginRight: 10
    },
    textButton: {
        color: '#000000'
    },
    stylebuttonCalendar: {
        padding: 10
    },
    containerCalendar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 8,
        height: 40,
        margin: 20
    },
    inputStyle: {
      color: '#0D47A1',
      paddingLeft: 10,
      flex: 1
    },
    containerIcon: {
      marginRight: 10,
      marginLeft: 10
    },
    containerEnvoyer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        padding: 10
    },
    styleButtonEnvoyer: {
        borderWidth: 0.5,
        borderColor: '#2196F3',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
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
        marginRight: 30
    },
    styleTextDate: {
        fontSize: 12
    },
    containerLoading: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    containerModal: {
       backgroundColor: '#01579B',
       justifyContent: 'center',
       padding: 30,
       marginLeft: 30,
       marginRight: 30
    },
    styleTextLoading: {
       color: '#FFFFFF',
       marginLeft: 20
   },
   styleButtonOk: {
       backgroundColor: '#FFFFFF',
       paddingLeft: 20,
       paddingRight: 20,
       paddingTop: 5,
       paddingBottom: 5,
       marginBottom: 10,
       alignSelf: 'flex-end'
   }
};

const mapStateToProps = ({ reserverStade, homeDiscussion }) => {
  const { events, loading, visible, date, show, message, loadEnvoyer, response } = reserverStade;
  const { socket } = homeDiscussion;
  return { events, loading, visible, date, show, message, loadEnvoyer, response, socket };
};

export default connect(mapStateToProps, { getMatchs, changeModalReserver, dateChanged, showModalReserver, messageReserverChanged, envoyerMatchForReserver, hideModalChargement })(ReserverStade);
