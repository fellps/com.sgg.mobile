import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  StyleSheet,
  Platform
} from "react-native";
import { connect } from 'react-redux';
import { get } from './reducers/notifications/actions';
import { Truncate } from "../constants/utils";

import LoadingScreen from '../components/Loading'

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }
  
  async componentDidMount() {
    const { dispatchGet } = this.props;
    const { value: { data: notifications } } = await dispatchGet();
    this.setState({ notifications: notifications.data });
  }

  renderRow({item}) {
      let actualRowComponent =
        <View style={item.Accepted !== null ? styles.rowDisabled : styles.row} key={`notify1-${item.IdNotification}`}>
          <View style={styles.row_cell_timeplace}>
            <Text style={styles.row_place}>{item.Title}</Text>
            <Text style={styles.row_description}>{Truncate(item.Body, 70)}</Text>
            <Text style={styles.row_time}>{item.CreatedAt}</Text>
          </View>
          <Text style={styles.row_cell_value}>R$ {item.Amount}</Text>
        </View>;
    
      let touchableWrapperIos =
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'#FFFFFF00'}
          key={`notify-${item.IdNotification}`}
          onPress={
            () => {
              this._navigation.navigate("NotificationDetails", { job: item });
            }
          }
        >
          {actualRowComponent}
        </TouchableHighlight>;
    
      let touchableWrapperAndroid =
        <TouchableNativeFeedback
          useForeground={true}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          key={`notify-${item.IdNotification}`}
          onPress={
            () => {
              this._navigation.navigate("NotificationDetails", { job: item });
            }
          }
        >
          {actualRowComponent}
        </TouchableNativeFeedback>;
    
      if (Platform.OS === 'ios') {
        return touchableWrapperIos;
      }
      else return touchableWrapperAndroid;
  }

  render() {
      _navigation = this.props.navigation;

      const { notifications } = this.state;

      if (notifications.length <= 0) {
        return (
          <LoadingScreen visible={this.props.isLoading}>
            <View style={styles.v_container}>
              <StatusBar hidden />
              <Text>Você não possui nenhuma notificação..</Text>
            </View>
          </LoadingScreen>
        );
      }
      
      return (
        <LoadingScreen visible={this.props.isLoading}>
          <View style={styles.v_container}>
            <StatusBar hidden />
            <FlatList
              style={styles.container}
              data={notifications}
              renderItem={this.renderRow}
            />
          </View>
        </LoadingScreen>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        alignSelf: "stretch",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
    row: {
        elevation: 1,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 16,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 0,
        marginBottom: 6,
    },
    rowDisabled: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: '#DCDCDC',
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
  },
    row_cell_timeplace: {
        flex: 1,
        flexDirection: 'column',
    },
    row_cell_value: {
        color: '#464646',
        paddingLeft: 16,
        flex: 0,
        fontSize: 22,
    },
    row_time: {
        paddingTop: 15,
        color: '#949494',
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        fontSize: 11,
    },
    row_place: {
        color: '#464646',
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        fontSize: 20,
    },
    row_date: {
        color: '#949494',
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        fontSize: 13
    },
    row_description: {
        paddingTop: 10,
        color: '#464646',
        textAlignVertical: 'top',
        includeFontPadding: false,
        flex: 0,
        fontSize: 13
    },
    v_container: {
        flex: 1,
        padding: 8,
        flexDirection: 'column', // main axis
        justifyContent: 'center', // main axis
        alignItems: 'center', // cross axis
        backgroundColor: '#F0F0F0',
    }
});

const mapStateToProps = state => ({
  isLoading: state.isLoading[get]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchGet: params => dispatch(get(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);