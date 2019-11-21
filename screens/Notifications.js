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

class Notifications extends React.Component {
    listData = [{
        key: '1',
        time: 'Hoje às 18:10',
        job: 'Bartender',
        date: 'Data: 27/11/2019',
        place: 'Estádio Mané Garrincha',
        currentTemp: 'R$ 125,00'
    }]
    renderRow({item}) {      
        let actualRowComponent =
          <View style={styles.row}>
            <View style={styles.row_cell_timeplace}>
              <Text style={styles.row_place}>{item.job}</Text>
              {/* <Text style={styles.row_date}>{item.date}</Text>
              <Text style={styles.row_date}>{item.place}</Text> */}
              <Text style={styles.row_description}>Oportunidade para trabalhar como bartender no evento Baile da Santinha..</Text>
              <Text style={styles.row_time}>{item.time}</Text>
            </View>
            <Text style={styles.row_cell_value}>{item.currentTemp}</Text>
          </View>;
      
        let touchableWrapperIos =
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={'#FFFFFF00'}
            onPress={
              () => {
                this._navigation.navigate("NotificationDetails", {...item});
              }
            }
          >
            {actualRowComponent}
          </TouchableHighlight>;
      
        let touchableWrapperAndroid =
          <TouchableNativeFeedback
            useForeground={true}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={
              () => {
                this._navigation.navigate("NotificationDetails", {...item});
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
        
        return (
          <View style={styles.v_container}>
            <StatusBar hidden />
            <FlatList
              style={styles.container}
              data={this.listData}
              renderItem={this.renderRow}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        alignSelf: "stretch",
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

export default Notifications;