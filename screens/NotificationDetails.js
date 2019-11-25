import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Root, Popup } from "../components";
import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class NotificationDetails extends React.Component {
  state = {
    textShown: false,
    show: false,
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in odio id libero rutrum dictum. Praesent in fermentum urna, sit amet viverra lorem. Nam sodales, ligula efficitur bibendum convallis, quam dui facilisis enim, eu iaculis nibh tellus eget nunc.'
  };

  handleBack = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  }

  handleAccept = () => {
    Popup.show({
      type: 'Success',
      title: 'Parabéns :)',
      button: true,
      textBody: 'Você aceitou o convite para trabalhar como Bartender!',
      buttonText: 'Ver minha agenda',
      callback: () => {
        this.props.navigation.navigate('Home');
        this.props.navigation.navigate('Schedule');
      }
    })
  }

  handleReject = () => {
    Popup.show({
      type: 'Danger',
      title: 'Que pena :(',
      button: true,
      textBody: 'Você recusou este trabalho!',
      buttonText: 'Ok',
      callback: () => this.props.navigation.navigate('Home')
    })
  }

  render() {
    const { navigation } = this.props;

    let buttons;

    if (navigation.getParam('job')) {
      buttons = 
        <Block row space="evenly" style={styles.blockButtons}>
          <Block flex left>
            <Button 
              color="warning" 
              style={styles.optionsButton}
              onPress={this.handleReject}>
              RECUSAR
            </Button>
          </Block>
          <Block flex right>
            <Button 
              color="success" 
              style={styles.optionsButton} 
              onPress={this.handleAccept}>
              ACEITAR
            </Button>
          </Block>
        </Block>
    }

    return (
      <Root>
        <Block flex style={styles.profile}>
          <StatusBar barStyle="light-content" />
          <Block flex>
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width, marginTop: '25%' }}
              >
                <Block flex style={styles.profileCard}>
                  <Block middle style={styles.avatarContainer}>
                    <Text
                      bold
                      size={25}
                      color="#FFFFFF"
                      style={{ marginBottom: 4 }}
                    >
                      Oportunidade para você
                    </Text>
                  </Block>
                  <Block flex>
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={28} color="#32325D">
                        Bartender
                      </Text>
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        Data: 27/11/2019 às 16:00h
                      </Text>
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        Local: Estádio Mané Garrincha, Brasília, DF
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: "center" }}
                      >
                        {this.state.longText}
                      </Text>
                      {buttons}
                    </Block>
                  </Block>
                </Block>
              </ScrollView>
            </ImageBackground>
          </Block>
        </Block>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  invitesButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  blockButtons: {
    marginTop: 50
  },
  optionsButton: {
    width: width * 0.4,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
});

export default NotificationDetails;
