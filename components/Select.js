import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { argonTheme } from '../constants';

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
      />
    )
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: argonTheme.COLORS.BORDER,
    color: argonTheme.COLORS.DEFAULT,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: argonTheme.COLORS.BORDER,
    color: argonTheme.COLORS.DEFAULT,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});

export default DropDown;
