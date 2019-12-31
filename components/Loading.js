import React from "react";
import { View, StyleSheet } from "react-native";
import LoadingDots from "react-native-loading-dots";

class LoadingScreen extends React.Component {
  defaultColors = [
    "#462e9b",
    "#6348b2",
    "#8e6dd3",
    "#c27cd8"
  ];

  render() {
    if (!this.props.visible) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    }
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.dotsWrapper}>
          <LoadingDots colors={this.defaultColors} />
        </View>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: "flex",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    position: 'absolute', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  dotsWrapper: {
    width: 100
  }
});

export default LoadingScreen;