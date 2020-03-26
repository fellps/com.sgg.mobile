import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Root } from "../components";
import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class EventDetails extends React.Component {
  render() {
    const { navigation } = this.props;

    const event = navigation.getParam('event');
    console.log(event)

    return (
      <Root>
        <Block flex style={styles.profile}>
          <StatusBar barStyle="light-content" />
          <Block flex>
            <ImageBackground
              source={Images.Onboarding}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width, marginTop: '25%' }}
              >
                <Block center>
                  <Block flex style={styles.profileCard}>
                    <Block middle style={styles.avatarContainer}>
                      <Text
                        bold
                        size={22}
                        color="#FFFFFF"
                        style={{ marginBottom: 4 }}
                      >
                        {event.Name}
                      </Text>
                    </Block>
                    <Block flex>
                      <Block middle style={styles.nameInfo}>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                          Data: {event.StartAt}
                        </Text>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                          {event.Address}
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
                          {event.Description}
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                  <Image
                    resizeMode="cover"
                    style={styles.productImage}
                    source={{ uri: event.Image }}
                  />
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
    height: height
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
  productImage: {
    width: cardWidth,
    height: cardWidth - theme.SIZES.BASE,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 65
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

export default EventDetails;
