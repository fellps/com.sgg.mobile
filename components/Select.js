import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
            style={{ position: 'absolute', top: -8, left: ((width * 0.76) * -1), zIndex: 99999 }}
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
    fontSize: 25,
    borderRadius: 0,
    borderColor: argonTheme.COLORS.BORDER,
    borderWidth: 0.8,
    color: argonTheme.COLORS.DEFAULT,
    paddingVertical: 7,
    paddingHorizontal: 10,
    zIndex: 1,
    width: width * 0.8,
  },
  inputAndroid: {
    fontSize: 25,
    borderRadius: 0,
    borderColor: argonTheme.COLORS.BORDER,
    borderWidth: 0.8,
    color: argonTheme.COLORS.DEFAULT,
    paddingVertical: 7,
    paddingHorizontal: 10,
    zIndex: 1,
    width: width * 0.8,
  },
  inputAndroidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: width * 0.8,
    top: 5
  },
  placeholder: {
    color: argonTheme.COLORS.MUTED,
    paddingLeft: 47,
    fontSize: 13
  }
});

export default DropDown;
