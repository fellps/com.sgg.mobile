import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Início":
        return (
          <Icon
            name="home"
            family="AntDesign"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
      case "Perfil":
        return (
          <Icon
            name="user"
            family="AntDesign"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
      case "Minha agenda":
        return (
          <Icon
            name="calendar"
            family="AntDesign"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.INFO}
          />
        );
      case "Checkin":
        return (
          <Icon
            name="qrcode"
            family="AntDesign"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Sair":
        return (
          <Icon
            name="logout"
            family="AntDesign"
            size={16}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            size={15}
            bold={focused ? true : false}
            color={focused ? "white" : "rgba(0,0,0,0.5)"}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
