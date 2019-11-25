import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { Block, Text, theme } from "galio-framework";

import { StyleSheet } from 'react-native';

import { argonTheme } from "../constants/";
 
export default class Checkin extends Component {
  state = {
    text: 'e10adc3949ba59abbe56e057f20f883e',
  };
 
  render() {
    return (
      <Block flex middle>
        <Block flex style={styles.qrcode}>
          <Text bold size={16} style={styles.title}>
            Leia esse QRCode para fazer o checkin :)
          </Text>
          <QRCode
            value={this.state.text}
            size={300}
            fgColor='white'/>
        </Block>
      </Block>
    );
  };
}
 
const styles = StyleSheet.create({
    qrcode: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    title: {
        paddingBottom: 50,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 5,
        color: argonTheme.COLORS.HEADER
    }
});