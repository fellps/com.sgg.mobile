import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Timeline from 'react-native-timeline-listview'

export default class Schedule extends Component {
  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.data = [
        {time: '27/11 às 16:00', title: 'Bartender', description: `Local: Estádio Mané Garrincha\nAlguma outra observação..`, circleColor: '#009688',lineColor:'#009688'},
        {time: '28/11 às 18:00', title: 'Bartender', description: `Local: Estádio Mané Garrincha\nAlguma outra observação..`},
        {time: '29/11 às 19:00', title: 'Bartender', description: `Local: Estádio Mané Garrincha\nAlguma outra observação..`},
        {time: '05/12 às 20:00', title: 'Garçom', description: `Local: Estádio Mané Garrincha\nAlguma outra observação..`},
        {time: '06/12 às 17:00', title: 'Garçom', description: `Local: Estádio Mané Garrincha\nAlguma outra observação..`}
    ]

    this.state = {
      isRefreshing: false,      
      waiting: false,
      data: this.data
    }
  } 

  onRefresh(){
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});

        //fetch and concat data
        setTimeout(() => {

          //refresh to initial data
          var data = this.state.data.concat([
            {time: '07/12 às 17:00', title: 'Garçom', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur nisl in egestas tincidunt. '}
          ])

          this.setState({
            waiting: false,
            data: data,
          });
        }, 2000);
    }
  }

renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          style={styles.list}
          data={this.state.data}
          circleSize={20}
          circleColor='#5E72E4'
          lineColor='#5E72E4'
          timeContainerStyle={{minWidth:52, marginTop: -1}}
          timeStyle={{textAlign: 'center', backgroundColor:'#5E72E4', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5},
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached
          }}
          innerCircle={'dot'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop: 40,
  },
});