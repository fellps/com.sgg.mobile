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

import { Button, Icon, Input, Root, Popup } from "../components";
import LoadingScreen from '../components/Loading'
import { Images, argonTheme } from "../constants";

import { set, recoverPassword as recoverPasswordAction } from './reducers/recoverPassword/actions';

import * as Validator from "../helpers/validators";

import _ from 'lodash';

const { width, height } = Dimensions.get("screen");

class RecoverPassword extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: null,
      inputErrors: {}
    }
  }
  
  _submit = async event => {
    event.preventDefault();

    const { dispatchRecoverPassword, navigation } = this.props;
    const { email } = this.state;

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
                        Informe o seu email de acesso
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
                            onChangeText={email => this.setState({ email })}
                            error={this.state.inputErrors.email}
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
                          <HelperText style={{ marginTop: -10, marginLeft: -10 }} type="error" visible={this.state.inputErrors.recoverPassword === true}>
                            Preencha o campo email corretamente!
                          </HelperText>
                        </Block>
                        <Block middle style={{ marginTop: -10 }}>
                          <Button 
                            color="primary" 
                            style={styles.createButton}
                            onPress={this._submit}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                              ENVIAR
                            </Text>
                          </Button>
                        </Block>
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
  registerContainer: {
    width: width * 0.9,
    height: height * 0.4,
    marginTop: -120,
    backgroundColor: "#F4F5F7",
    borderRadius: 0,
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
  createButton: {
    borderRadius: 0,
    width: width * 0.5,
    marginTop: 25
  },
  logo: {
    width: 200,
    height: 60,
    position: 'relative',
    marginTop: '10%'
  }
});

const mapStateToProps = state => ({
  data: state.recoverPassword.data,
  response: state.recoverPassword.response,
  isLoading: state.isLoading[recoverPasswordAction]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  set: params => dispatch(set(params)),
  dispatchRecoverPassword: params => dispatch(recoverPasswordAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
