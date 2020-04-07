import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { connect } from 'react-redux';

import { Block, Text, theme } from "galio-framework";

import { Button } from "../components";
import { Images } from "../constants";
import LoadingScreen from '../components/Loading'

import { HeaderHeight } from "../constants/utils";

import { get } from './reducers/users/actions';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textShown: false,
      user: {
        Name: '',
        ProfileImages: [{
          Url: ''
        }]
      }
    };
  }
  
  async componentDidMount() {
    const { dispatchGet } = this.props;
    const { value: { data: user } } = await dispatchGet();
    this.setState({ user: user.data });
  }

  toggleNumberOfLines = () => {
    this.setState({
      textShown: !this.state.textShown
    });
  };

  render() {
    const { user } = this.state;
    
    return (
      <LoadingScreen visible={this.props.isLoading}>
        <Block flex style={styles.profile}>
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
                    <Image
                      source={{ uri: user.ProfileImages[0].Url }}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={styles.info}>
                    <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                      <Button 
                        style={styles.invitesButton}
                        onPress={() => this.props.navigation.navigate('Notifications')}>
                        VER MEUS CONVITES
                      </Button>
                    </Block>
                  </Block>
                  <Block flex>
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={28} color="#32325D">
                        {user.Name.split(' ').slice(0,2).join(' ')}, {user.Age}
                      </Text>
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        {user.City}, {user.State}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <Text
                        numberOfLines={this.state.textShown ? undefined : 2}
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: "center" }}
                      >
                        {user.Description}
                      </Text>
                      <Button
                        onPress={() => this.toggleNumberOfLines()}
                        style={{ marginTop: 10 }}
                        color="transparent"
                        textStyle={{
                          color: "#233DD2",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                      >
                        {!this.state.textShown ? 'Mostrar mais' : 'Mostrar menos'}
                      </Button>
                    </Block>
                    <Block
                      row
                      style={{ paddingVertical: 14, alignItems: "baseline" }}
                    >
                      <Text bold size={16} color="#525F7F">
                        Fotos
                      </Text>
                    </Block>
                    <Block style={{ paddingBottom: HeaderHeight }}>
                      <Block row space="between" style={{ flexWrap: "wrap" }}>
                        {user.ProfileImages.map((img, imgIndex) => (
                          <Image
                            source={{ uri: img.Url }}
                            key={`viewed-${img.Url}`}
                            resizeMode="cover"
                            style={styles.thumb}
                          />
                        ))}
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </ScrollView>
            </ImageBackground>
          </Block>
        </Block>
      </LoadingScreen>
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
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
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
    borderRadius: 0,
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
    borderRadius: 0,
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
});

const mapStateToProps = state => ({
  isLoading: state.isLoading[get]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchGet: params => dispatch(get(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);