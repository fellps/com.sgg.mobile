import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar
} from "react-native";
import { connect } from 'react-redux';

import { Block, Text, theme } from "galio-framework";

import { Button, Root, Popup } from "../components";
import LoadingScreen from '../components/Loading'

import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";

import { accept, cancel } from './reducers/notifications/actions';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class NotificationDetails extends React.Component {

  handleBack = () => {
    const { navigation } = this.props;
    return navigation.goBack();
  }

  handleAccept = async () => {
    const { navigation, dispatchAccept } = this.props;
    const job = navigation.getParam('job');

    const { value: { data: result } } = await dispatchAccept({ 
      IdJob: job.IdJob, 
      Accepted: true 
    })

    if (result.error) {
      Popup.show({
        type: 'Danger',
        title: 'Que pena :(',
        button: true,
        textBody: 'As vagas para este trabalho se esgotaram!',
        buttonText: 'Ok',
        callback: async () => this.props.navigation.navigate('Home')
      })
    } else {
      if (!result.extraVacancie) {
        Popup.show({
          type: 'Success',
          title: 'Parabéns :)',
          button: true,
          textBody: 'Você aceitou o convite para trabalhar como Bartender!',
          buttonText: 'Ver minha agenda',
          callback: async () => {
            this.props.navigation.navigate('Home');
            this.props.navigation.navigate('Schedule');
          }
        })
      } else {
        Popup.show({
          type: 'Warning',
          title: 'Vaga reserva',
          button: true,
          textBody: 'Você entrou para a lista de reservas dessa vaga!',
          buttonText: 'Ver minha agenda',
          callback: async () => {
            this.props.navigation.navigate('Home');
            this.props.navigation.navigate('Schedule');
          }
        })
      }
    }
  }

  handleReject = async () => {
    const { navigation, dispatchAccept } = this.props;
    const job = navigation.getParam('job');

    const { value: { data: result } } = await dispatchAccept({ 
      IdJob: job.IdJob, 
      Accepted: false 
    })

    Popup.show({
      type: 'Danger',
      title: 'Que pena :(',
      button: true,
      textBody: 'Você recusou este trabalho!',
      buttonText: 'Ok',
      callback: async () => this.props.navigation.navigate('Home')
    })
  }

  handleCancel = async () => {
    const { navigation, dispatchCancel } = this.props;
    const job = navigation.getParam('job');

    const { value: { data: result } } = await dispatchCancel({ 
      IdJob: job.IdJob
    })

    Popup.show({
      type: 'Success',
      title: 'Cancelamento realizado',
      button: true,
      textBody: 'Você cancelou esta vaga!',
      buttonText: 'Ok',
      callback: async () => this.props.navigation.navigate('Home')
    })
  }

  render() {
    const { navigation } = this.props;

    let buttons;

    const job = navigation.getParam('job')

    console.log(job)

    if (job && job.Accepted === null) {
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
    } else if (job.Accepted === true && job.DateDiff > 24) {
      buttons = 
        <Block row space="evenly" style={styles.blockButtons}>
          <Block flex center>
            <Button 
              color="warning" 
              style={styles.optionsButton}
              onPress={this.handleCancel}>
              CANCELAR VAGA
            </Button>
          </Block>
        </Block>
    } else {
      buttons = 
      <Block row space="evenly" style={styles.blockButtons}>
        <Block flex center>
          <Text bold size={16} color="#32325D" style={{ paddingTop: 10, textAlign: "center" }}>
            Para cancelar esta vaga, entre em contato com a administração!
          </Text>
        </Block>
      </Block>
    }

    return (
      <Root>
        <LoadingScreen visible={this.props.isLoading || this.props.isLoadingCancel}>
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
                          {job.Title || job.title}
                        </Text>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                          Data: {job.StartAt || job.time}
                        </Text>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                          {job.Address}
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
                          {job.Body || job.description}
                        </Text>
                        {buttons}
                      </Block>
                    </Block>
                  </Block>
                </ScrollView>
              </ImageBackground>
            </Block>
          </Block>
        </LoadingScreen>
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
  blockButtons: {
    marginTop: 50
  },
  optionsButton: {
    width: width * 0.4,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
});

const mapStateToProps = state => ({
  isLoading: state.isLoading[accept],
  isLoadingCancel: state.isLoading[cancel],
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchAccept: params => dispatch(accept(params)),
  dispatchCancel: params => dispatch(cancel(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetails);