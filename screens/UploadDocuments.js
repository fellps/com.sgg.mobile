import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  Button,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import { HelperText } from 'react-native-paper';
import { Block, Text, theme } from "galio-framework";
import { ImageBrowser } from 'expo-multiple-media-imagepicker';

import { connect } from 'react-redux';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';

import { Root, Popup, Button as ButtonComponent } from "../components";
import LoadingScreen from '../components/Loading'
import { Images, argonTheme } from "../constants";


import { set, registerDocuments as registerDocumentsAction } from './reducers/uploadDocuments/actions';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class UploadDocuments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      photos: [],
      cameraIsOpen: false,
      inputErrors: {},
    }
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderEmpty = () => {
    return (
      <View style={styles.emptyContent}>
        <Text style={{color: argonTheme.COLORS.PLACEHOLDER}}>Nenhum documento selecionado</Text>
      </View>
    )
  }

  getItemLayout = (data, index) => {
    let length = width / 4
    return { length, offset: length * index, index }
  }

  renderImage (photos) {
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={photos}
        numColumns={3}
        renderItem={this.renderImageTile}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={this.renderEmpty}
        initialNumToRender={6}
        getItemLayout={this.getItemLayout}
        style={{marginTop: 20}}
      />
    )
  }

  renderImageTile = ({ item, index }) => {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={index}
      />
    )
  }

  onSubmit = async event => {
    event.preventDefault();

    const { dispatchRegisterDocuments } = this.props;

    if (this.state.photos.length < 3) {
      this.setState({ inputErrors: {photos: true}});
      return;
    }

    const photos = []

    for (const [index, photo] of this.state.photos.entries()) {
      let result = await ImageManipulator.manipulateAsync(
        photo.localUri || photo.uri,
        [],
        { compress: 0.85, format: ImageManipulator.SaveFormat.JPG }
      );
      result.filename = photo.filename
      photos.push(result)
    }

    const { value: { data: result } } = await dispatchRegisterDocuments({ 
      Documents: photos,
      Data: {
        x: 0
      }
    });

    if (!result.error) {
      Popup.show({
        type: 'Success',
        title: 'Parabéns :)',
        button: true,
        textBody: 'Recebemos os seus documentos! Em breve entraremos em contato!',
        buttonText: 'Ok',
        callback: async () => {
          await AsyncStorage.setItem('loggedUser', JSON.stringify('{}'));
          this.props.navigation.navigate('Login');
        }
      })
    } else {
      Popup.show({
        type: 'Danger',
        title: 'Ops :(',
        button: true,
        textBody: 'Aconteceu algum erro! Verifique sua conexão e tente novamente.',
        buttonText: 'Ok',
        callback: async () => Popup.hide()
      })
    }
  }

  camera = null;
  
  capture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync({ skipProcessing: true }).then((photo) => {
        const photos = this.state.photos
        if (photos.length >= 3) {
          photos.pop()
        }
        photos.push(photo)
        this.setState({ photos })
        this.setState({ cameraIsOpen: false })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  render() {
    if (this.state.imageBrowserOpen) {
      return (<ImageBrowser
        max={6}
        headerCloseText={'Fechar'}
        headerDoneText={'Selecionar'}
        headerButtonColor={'#5E72E4'}
        headerSelectText={'Selecionado'}
        badgeColor={'#5E72E4'}
        emptyText={'Nenhum documento selecionado'}
        callback={this.imageBrowserCallback}
      />)
    }
    if (this.state.cameraIsOpen) {
      return (
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.333,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => this.setState({ cameraIsOpen: false })}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Cancelar </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.333,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                if (this.state.type === Camera.Constants.Type.back) {
                  this.setState({ type: Camera.Constants.Type.front })
                } else {
                  this.setState({ type: Camera.Constants.Type.back })
                }
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Girar </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.333,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => this.capture()}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capturar </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )
    }
    return (
      <Root>
        <LoadingScreen visible={this.props.isLoading || this.state.isLoading}>
          <ScrollView>
              <Block flex center>
                  <StatusBar hidden />
                  <ImageBackground
                      source={Images.Onboarding}
                      style={{ width, height, zIndex: 1 }}
                  >
                      <Block flex middle>
                          <Block style={styles.registerContainer}>
                              <Block flex middle>
                                  <Block flex={0.1} middle>
                                      <Text color="#8898AA" size={12}>
                                          Você está na segunda fase da seleção!
                                      </Text>
                                  </Block>
                                  <Block flex center width={width * 0.8} style={{ marginBottom: 15, marginTop: 20 }}>
                                    <Text style={{color: argonTheme.COLORS.DEFAULT, marginBottom: 20, marginTop: 20, textAlign: "center" }}>
                                        Verifique o seu email e envie todos os documentos solicitados
                                    </Text>
                                    <Button
                                        title='Selecionar documentos'
                                        onPress={() => this.setState({ imageBrowserOpen: true })}
                                    />
                                    <View style={styles.emptyContent}>
                                      <Text style={{color: argonTheme.COLORS.PLACEHOLDER}}>ou</Text>
                                    </View>
                                    <Button
                                      title='Tirar foto'
                                      onPress={() => this.setState({ cameraIsOpen: true })}
                                    />
                                    <HelperText type="error" visible={this.state.inputErrors.photos === true}>
                                        Você deve selecionar no mínimo três documentos!
                                    </HelperText>
                                    {this.renderImage(this.state.photos)}
                                    <Block middle>
                                        <ButtonComponent 
                                            color="primary" 
                                            //style={styles.createButton}
                                            onPress={this.onSubmit}>
                                            <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                                                ENVIAR
                                            </Text>
                                        </ButtonComponent>
                                    </Block>
                                  </Block>
                              </Block>
                          </Block>
                      </Block>
                  </ImageBackground>
              </Block>
          </ScrollView>
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
    flex: 0,
    marginTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    marginBottom: 75,
    width: width * 0.95,
    height: height * 0.8,
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
  },
  nextBtnTextStyle: {
    color: '#fff',
    backgroundColor: '#5E72E4',
    elevation: 2,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: -45
  },
  previousBtnTextStyle: {
    color: '#fff',
    backgroundColor: '#5E72E4',
    elevation: 2,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: -45
  },
  textArea: {
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: argonTheme.COLORS.BORDER,
    color: argonTheme.COLORS.DEFAULT,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
  }
});

const mapStateToProps = state => ({
  data: state.uploadDocuments.data,
  response: state.uploadDocuments.response,
  isLoading: state.isLoading[registerDocumentsAction]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  set: params => dispatch(set(params)),
  dispatchRegisterDocuments: params => dispatch(registerDocumentsAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocuments);
