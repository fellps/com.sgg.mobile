import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { Block, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import { argonTheme } from "../constants/";

import { loggedUser } from '../api'
 
class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }
  
  async componentDidMount() {
    const { user: { data: { QrCode } } } = await loggedUser();
    this.setState({ code: QrCode });
  }
 
  render() {
    return (
      <Block flex middle enableEmptySections={true}>
        <Block flex style={styles.qrcode}>
          <Text bold size={16} style={styles.title}>
            Leia esse QRCode para fazer o checkin :)
          </Text>
          <QRCode
            value='xxx'
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);