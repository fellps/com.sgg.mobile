import React from "react";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import { AsyncStorage } from 'react-native';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

import _ from 'lodash';

import Constants from 'expo-constants';

class Onboarding extends React.Component {
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return;
    }
    
    let token = await Notifications.getExpoPushTokenAsync();
    if (token) {
      AsyncStorage.setItem('pushToken', token)
    }
  }

  registerCameraRollAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return;
    }
  }

  registerCameraAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.CAMERA
    );

    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return;
    }
  }
  
  async componentDidMount() {
    const { navigation } = this.props;

    if (Constants.isDevice) await this.registerForPushNotificationsAsync();
    await this.registerCameraRollAsync();
    await this.registerCameraAsync();
    
    Notifications.addListener(this._handleNotification);

    const loggedUserCookie = await AsyncStorage.getItem('loggedUser')
    const welcome = await AsyncStorage.getItem('welcome')

    const loggedUser = JSON.parse(loggedUserCookie)

    if (!_.isEmpty(loggedUser) && !_.isEmpty(loggedUser.token)) {
      if (loggedUser.user.data.IdUserStatus === 5) {
        navigation.navigate("UploadDocuments");
      } else if (loggedUser.user.data.IdUserStatus === 1) {
        navigation.navigate("Home");
      }
    } else if (welcome === "clicked") {
      navigation.navigate("Login");
    }
  }

  _handleNotification = (notification) => {
    const { navigation } = this.props;
    navigation.navigate("NotificationDetails", { job: notification.data });
  };

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
              source={Images.Onboarding}
              style={{ height, width, zIndex: 1 }}
            />
        </Block>
        <Block center>
          <Image source={Images.LogoOnboarding} style={styles.logo} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.title}>
                <Block>
                  <Text color="white" size={45}>
                    Sistema de
                  </Text>
                </Block>
                <Block>
                  <Text color="white" size={45}>
                    Gestão de Pessoas
                  </Text>
                </Block>
                <Block style={styles.subTitle}>
                  <Text color="white" size={16}>
                    Seja bem vindo(a), vamos começar?
                  </Text>
                </Block>
              </Block>
              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => { 
                    AsyncStorage.setItem('welcome', 'clicked');
                    navigation.navigate("Login");
                  }}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
                >
                  Vamos lá!
                </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 0
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: 'relative',
    marginTop: '-60%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
