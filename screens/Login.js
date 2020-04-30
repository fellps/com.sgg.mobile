import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Block, Text } from "galio-framework";

import { connect } from 'react-redux';
import { HelperText } from 'react-native-paper';

import { AsyncStorage } from 'react-native';

import { Button, Icon, Input, Root, Popup } from "../components";
import LoadingScreen from '../components/Loading'
import { Images, argonTheme } from "../constants";

import { set, login as loginAction } from './reducers/login/actions';

import * as Validator from "../helpers/validators";

import _ from 'lodash';

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      login: null,
      password: null,
      inputErrors: {}
    }
  }
  
  async componentDidMount() {
    const { navigation } = this.props;

    const loggedUserCookie = await AsyncStorage.getItem('loggedUser')

    if (!_.isEmpty(JSON.parse(loggedUserCookie))) {
      if (loggedUserCookie.data.user.data.IdUserStatus === 5) {
        navigation.navigate("UploadDocuments");
      } else {
        navigation.navigate("Home");
      }
    }
  }

  _submit = async event => {
    event.preventDefault();

    const { dispatchLogin, navigation } = this.props;
    const { login, password } = this.state;

    this.setState({ inputErrors: {} })

    if (!Validator.Email(login.trim())) {
      this.setState({ inputErrors: {login: true}});
      return;
    } else if (password.length < 6) {
      this.setState({ inputErrors: {password: true}});
      return;
    }

    const params = {
      Login: login.trim(),
      Password: password
    }

    try {
      const { value: { data: loggedUser } } = await dispatchLogin(params);

      if (!loggedUser.data.error) {
        await AsyncStorage.setItem('loggedUser', JSON.stringify('{}'));
        await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser.data));

        if (loggedUser.data.user.data.IdUserStatus === 5) {
          navigation.navigate("UploadDocuments");
        } else {
          navigation.navigate("Home");
        }
      }
    } catch (err) {
      Popup.show({
        type: 'Danger',
        title: 'Ops :(',
        button: true,
        textBody: 'Email ou senha inválidos!',
        buttonText: 'Ok',
        callback: async () => Popup.hide()
      })
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Root>
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
                            placeholder="Email"
                            onChangeText={login => this.setState({ login })}
                            error={this.state.inputErrors.login}
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
                          <HelperText style={{ marginTop: -10, marginLeft: -10 }} type="error" visible={this.state.inputErrors.login === true}>
                            Preencha o campo email corretamente!
                          </HelperText>
                        </Block>
                        <Block width={width * 0.8} style={{ marginTop: -25 }}>
                          <Input
                            password
                            placeholder="Senha"
                            onChangeText={password => this.setState({ password })}
                            error={this.state.inputErrors.password}
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
                          <HelperText style={{ marginTop: -10, marginLeft: -10 }} type="error" visible={this.state.inputErrors.password === true}>
                            Preencha o campo senha corretamente!
                          </HelperText>
                        </Block>
                        <Block middle style={{ marginTop: -10 }}>
                          <Button 
                            color="primary" 
                            style={styles.createButton}
                            onPress={this._submit}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                              ENTRAR
                            </Text>
                          </Button>
                        </Block>
                        <View style={{flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                          <View>
                            <Text 
                              style={styles.textLink}
                              color={argonTheme.COLORS.DEFAULT}
                              onPress={() => navigation.navigate("Register")}
                            >
                              Criar cadastro
                            </Text>
                          </View>
                          <View style={{ marginLeft: 10, marginRight: 10 }}>
                            <Text 
                              style={styles.textLink}
                              color={argonTheme.COLORS.DEFAULT}
                            >
                              |
                            </Text>
                          </View >
                          <View>
                            <Text 
                              style={styles.textLink}
                              color={argonTheme.COLORS.DEFAULT}
                              onPress={() => navigation.navigate("RecoverPassword")}
                            >
                              Recuperar senha
                            </Text>
                          </View >
                        </View>
                      </KeyboardAvoidingView>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
          </Block>
        </LoadingScreen>
      </Root>
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
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
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
    borderRadius: 0,
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
