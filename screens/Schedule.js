import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import LoadingScreen from '../components/Loading'

import Timeline from 'react-native-timeline-listview';

import { getSchedule } from './reducers/notifications/actions';

import _ from 'lodash';

class Schedule extends Component {
  constructor(){
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    this.state = {
      isRefreshing: false,      
      waiting: false,
      data: []
    }
  }

  async componentDidMount() {
    this.getJobs()
  }

  async getJobs(){
    const { dispatchGetSchedule } = this.props;
    const { value: { data: schedule } } = await dispatchGetSchedule();

    if (schedule.data.length > 0) {
      schedule.data[0].circleColor = '#009688';
      schedule.data[0].lineColor ='#009688';
    }

    this.setState({ data: schedule.data });
  }

  async onRefresh(){
    this.setState({isRefreshing: true});
    await this.getJobs();
    this.setState({isRefreshing: false});
  }

  onEndReached() {
    if (!this.state.waiting) {
      this.setState({waiting: false});
    }
  }

renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    }
  }

  render() {
    const { navigation } = this.props;

    if (this.state.data.length <= 0) {
      return (
        <LoadingScreen visible={this.props.isLoading}>
          <View style={styles.v_container}>
            <Text>Sua agenda está vazia</Text>
          </View>
        </LoadingScreen>
      );
    }

    return (
      <LoadingScreen visible={this.props.isLoading}>
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
            onEventPress={(e) => { 
              const job = _.find(this.state.data, { title: e.title, time: e.time })
              job.Accepted = true
              navigation.navigate("NotificationDetails", { job })
            }}
            innerCircle={'dot'}
          />
        </View>
      </LoadingScreen>
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
  isLoading: state.isLoading[getSchedule]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchGetSchedule: params => dispatch(getSchedule(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);