import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import { Block, Text } from "galio-framework";

import { connect } from 'react-redux';

import { AsyncStorage } from 'react-native';

import { Button, Icon, Input } from "../components";
import LoadingScreen from '../components/Loading'
import { Images, argonTheme } from "../constants";

import { set, login as loginAction } from './reducers/login/actions';

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      login: null,
      password: null
    }
  }

  _submit = async event => {
    event.preventDefault();

    const { dispatchLogin, navigation } = this.props;
    const { login, password } = this.state;

    const params = {
      Login: login,
      Password: password
    }

    try {
      const { value: { data: loggedUser } } = await dispatchLogin(params);
      await AsyncStorage.setItem('loggedUser', JSON.stringify('{}'));
      await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser.data));
      navigation.navigate("Home");
    } catch (err) {
      console.log('err', err);
    }
  }

  render() {
    return (
      <LoadingScreen visible={this.props.isLoading}>
        <Block flex center>
          <StatusBar hidden />
          <ImageBackground
            source={Images.Onboarding}
            style={{ width, height, zIndex: 1 }}
          >
            <Block center>
              <Image source={Images.LogoOnboarding} style={styles.logo} />
            </Block>
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex>
                  <Block flex={0.17} middle>
                    <Text color="#8898AA" size={12}>
                      Informe os seus dados de acesso
                    </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginBottom: 15, marginTop: 20 }}>
                        <Input
                          borderless
                          placeholder="Email"
                          onChangeText={login => this.setState({ login })}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          placeholder="Senha"
                          onChangeText={password => this.setState({ password })}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="padlock-unlocked"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block middle>
                        <Button 
                          color="primary" 
                          style={styles.createButton}
                          onPress={this._submit}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            ENTRAR
                          </Text>
                        </Button>
                      </Block>
                      <Block row style={styles.linksContainer}>
                        <Block flex left>
                          <Text 
                            style={styles.textLink}
                            color={argonTheme.COLORS.DEFAULT}
                            onPress={() => Linking.openURL('http://sgg-site.s3-website-sa-east-1.amazonaws.com/')}
                          >
                            Cadastrar
                          </Text>
                        </Block>
                        <Block flex={1.25} right>
                          <Text 
                            style={styles.textLink}
                            color={argonTheme.COLORS.DEFAULT}
                          >
                            Esqueci minha senha
                          </Text>
                        </Block>
                      </Block>
                    </KeyboardAvoidingView>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </LoadingScreen>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.55,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  },
  textLink: {
    marginTop: 15,
    marginBottom: 10
  },
  linksContainer: {
    marginTop: 30
  },
  logo: {
    width: 200,
    height: 60,
    position: 'relative',
    marginTop: '23%'
  }
});

const mapStateToProps = state => ({
  data: state.login.data,
  response: state.login.response,
  isLoading: state.isLoading[loginAction]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  set: params => dispatch(set(params)),
  dispatchLogin: params => dispatch(loginAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
