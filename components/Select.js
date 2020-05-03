import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { argonTheme } from '../constants';

import { Icon } from './'

const { height, width } = Dimensions.get('window');

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    }
  }

  render() {
    const { onSelect, iconName, iconFamily, iconSize, iconColor, color, textStyle, style, ...props } = this.props;

    return (
      <RNPickerSelect
        onValueChange={value => {
          this.setState({
            value: value
          });
        }}
        {...props}
        value={this.props.value}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon = {() => (
          <Icon
            size={16}
            style={{ position: 'absolute', top: -8, left: ((width * 0.753) * -1), zIndex: 99999 }}
            color={argonTheme.COLORS.ICON}
            name="user"
            family="Entypo"
          />
        )}
      />
    )
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    color: argonTheme.COLORS.DEFAULT,
    paddingVertical: 13,
    paddingHorizontal: 10,
    zIndex: 1,
    width: width * 0.8,
  },
  inputAndroid: {
    fontSize: 14,
    color: argonTheme.COLORS.DEFAULT,
    paddingVertical: 7,
    paddingHorizontal: 10,
    zIndex: 1,
    width: width * 0.8,
  },
  inputIOSContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: argonTheme.COLORS.BORDER,
    borderRadius: 0,
    borderWidth: 0.8,
    width: width * 0.8,
    top: 5,
    paddingLeft: 75
  },
  inputAndroidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: argonTheme.COLORS.BORDER,
    borderRadius: 0,
    borderWidth: 0.8,
    width: width * 0.8,
    top: 5,
    paddingLeft: 75
  },
  placeholder: {
    color: argonTheme.COLORS.MUTED,
    fontSize: 14
  }
});

export default DropDown;
