import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import { Input } from "galio-framework";

import { argonTheme } from "../constants";

class ArInput extends React.Component {
  render() {
    const { shadowless, success, error } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      {...this.props.style}
    ];

    return (
      <Input
        placeholder=""
        placeholderTextColor={argonTheme.COLORS.MUTED}
        style={inputStyles}
        color={argonTheme.COLORS.HEADER}
        {...this.props}
      />
    );
  }
}

ArInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false
};

ArInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderColor: argonTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: argonTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: argonTheme.COLORS.ERROR,
  },
  shadow: {
    // shadowColor: argonTheme.COLORS.BLACK,
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 0,
    // shadowOpacity: 0.05,
    // elevation: 2,
  }
});

export default ArInput;
