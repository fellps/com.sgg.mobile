import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
  Button,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { HelperText } from 'react-native-paper';
import { Block, Text, theme } from "galio-framework";
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';

import * as Validator from "../helpers/validators";
import * as Formatter from "../helpers/formatter";

import { connect } from 'react-redux';

import { Select, Icon, Input, Root, Popup } from "../components";
import LoadingScreen from '../components/Loading'
import { Images, argonTheme } from "../constants";

import { set, register as registerAction } from './reducers/register/actions';

import * as address from '../api/externals/address'

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      //step 0
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthdate: '',
      sex: '',
      //step 1
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      address: '',
      number: '',
      complement: '',
      //step 2
      position: '',
      description: '',
      //step 3
      instagram: '',
      photos: [],
      //step 4
      password: '',
      //helpers
      imageBrowserOpen: false,
      cameraIsOpen: false,
      type: Camera.Constants.Type.back,
      errors: false,
      isLoading: false,
      inputErrors: {},
      step: 0
    }
  }

  camera = null;

  loadInternalAddress = async cep => {
    this.setState({ cep: Formatter.Cep(cep) })

    if (cep.length === 9) {
      this.setState({ isLoading: true })
      try {
        const data = await address.getAddressFromCep({ cep })
        this.setState({ state: data.state })
        this.setState({ city: data.city })
        this.setState({ neighborhood: data.bairro })
        this.setState({ address: data.address })
      } catch (err) {}
    }

    this.setState({ isLoading: false })
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      let arrPhotos = this.state.photos
      arrPhotos = [...arrPhotos, ...photos]
      this.setState({
        imageBrowserOpen: false,
        photos: arrPhotos
      })
    }).catch((e) => console.log(e))
  }

  renderEmpty = () => {
    // return (
    //   <View style={styles.emptyContent}>
    //     <Text style={{color: argonTheme.COLORS.PLACEHOLDER}}>Nenhuma imagem selecionada</Text>
    //   </View>
    // )
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
        //ListEmptyComponent={this.renderEmpty}
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

  onSubmit = async () => {
    const { dispatchRegister } = this.props;

    if (this.state.password.length < 6) {
      this.setState({ inputErrors: {password: true}})
      return
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

    const { value: { data: result } } = await dispatchRegister({ 
      Photos: photos, 
      Data: { 
        Name: this.state.name, 
        Email: this.state.email.trim(), 
        BirthDate: this.state.birthdate, 
        Sex: this.state.sex, 
        Description: this.state.description, 
        Document: this.state.cpf, 
        PhoneNumber: this.state.phone, 
        PostalCode: this.state.cep,
        State: this.state.state, 
        City: this.state.city, 
        Neighborhood: this.state.neighborhood, 
        Street: this.state.address, 
        Number: this.state.number,
        Complement: this.state.complement,
        IdPosition: this.state.position,
        Instagram: this.state.instagram,
        Password: this.state.password
      }
    });

    if (!result.data.error) {
      Popup.show({
        type: 'Success',
        title: 'Parabéns :)',
        button: true,
        textBody: 'Recebemos o seu cadastro! Em breve entraremos em contato com você!',
        buttonText: 'Ok',
        callback: async () => {
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

  onNextStep = () => {
    if (!this.validateForm(this.state.step)) {
      this.setState({ errors: true });
    } else {
      const step = ++this.state.step
      this.setState({ errors: false });
      this.setState({ step })
    }
  }

  onPreviousStep = () => {
    const step = --this.state.step
    this.setState({ errors: false });
    this.setState({ step })
  }

  validateForm = (step) => {
    this.setState({ inputErrors: {} })
    if (step === 0) {
      if (!Validator.Email(this.state.email.trim())) {
        this.setState({ inputErrors: {email: true}})
      } else if (!Validator.Phone(this.state.phone)) {
        this.setState({ inputErrors: {phone: true}})
      } else if (!Validator.CPF(this.state.cpf)) {
        this.setState({ inputErrors: {cpf: true}})
      } else if (!Validator.Birthdate(this.state.birthdate)) {
        this.setState({ inputErrors: {birthdate: true}})
      } else if (this.state.sex === '') {
        this.setState({ inputErrors: {sex: true}})
      } else {
        return true
      }
    }
    if (step === 1) {
      if (this.state.cep <= 8) {
        this.setState({ inputErrors: {cep: true}})
      } else if (this.state.state.length <= 0) {
        this.setState({ inputErrors: {state: true}})
      } else if (this.state.city.length <= 0) {
        this.setState({ inputErrors: {city: true}})
      } else if (this.state.neighborhood.length <= 0) {
        this.setState({ inputErrors: {neighborhood: true}})
      } else if (this.state.address.length <= 0) {
        this.setState({ inputErrors: {address: true}})
      } else if (this.state.number.length <= 0) {
        this.setState({ inputErrors: {number: true}})
      } else {
        return true
      }
    }
    if (step === 2) {
      if (this.state.position === '') {
        this.setState({ inputErrors: {position: true}})
      } else if (this.state.description.length < 50) {
        this.setState({ inputErrors: {description: true}})
      } else {
        return true
      }
    }

    if (step === 3) {
      if (this.state.photos.length < 3) {
        this.setState({ inputErrors: {photos: true}})
      } else {
        return true
      }
    }

    return false
  }

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
        max={3}
        headerCloseText={'Fechar'}
        headerDoneText={'Selecionar'}
        headerButtonColor={'#5E72E4'}
        headerSelectText={'Selecionado'}
        badgeColor={'#5E72E4'}
        emptyText={'Nenhuma imagem selecionada'}
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
                            <Block flex center>
                              <ProgressSteps activeStep={this.state.step}>
                                <ProgressStep 
                                    label="Info" 
                                    nextBtnText={'Próximo'} 
                                    onNext={this.onNextStep}
                                    onPrevious={this.onPreviousStep}
                                    errors={this.state.errors}
                                    nextBtnTextStyle={styles.nextBtnTextStyle}>
                                    <Block flex center width={width * 0.8}>
                                        <Input
                                          maxLength={250}
                                          value={this.state.name}
                                          onChangeText={name => this.setState({ name })}
                                          // error={this.state.inputErrors.name}
                                          placeholder="Nome"
                                          iconContent={
                                            <Icon
                                              name="user"
                                              family="Entypo"
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              style={styles.inputIcons}
                                            />
                                          } />
                                        <Input
                                          maxLength={150}
                                          value={this.state.email}
                                          onChangeText={email => this.setState({ email })}
                                          error={this.state.inputErrors.email}
                                          placeholder="Email"
                                          iconContent={
                                            <Icon
                                              name="email"
                                              family="MaterialIcons"
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              style={styles.inputIcons}
                                            />
                                          } />
                                        <Input
                                          maxLength={15}
                                          value={this.state.phone}
                                          onChangeText={phone => this.setState({ phone: Formatter.Phone(phone) })}
                                          
                                          keyboardType={'numeric'}
                                          placeholder="Telefone"
                                          iconContent={
                                            <Icon
                                              name="phone"
                                              family="MaterialIcons"
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              style={styles.inputIcons}
                                            />
                                          } />
                                        <Input
                                          maxLength={14}
                                          value={this.state.cpf}
                                          onChangeText={cpf => this.setState({ cpf: Formatter.CPF(cpf) })}
                                          error={this.state.inputErrors.cpf}
                                          keyboardType={'numeric'}
                                          placeholder="CPF"
                                          iconContent={
                                            <Icon
                                              name="text-document-inverted"
                                              family="Entypo"
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              style={styles.inputIcons}
                                            />
                                          } />
                                        <Input
                                          maxLength={10}
                                          value={this.state.birthdate}
                                          onChangeText={birthdate => this.setState({ birthdate: Formatter.Date(birthdate) })}
                                          error={this.state.inputErrors.birthdate}
                                          keyboardType={'numeric'}
                                          placeholder="Data de nascimento"
                                          iconContent={
                                            <Icon
                                              name="calendar"
                                              family="Entypo"
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              style={styles.inputIcons}
                                            />
                                          } />
                                        <Select
                                          value={this.state.sex}
                                          onValueChange={sex => this.setState({ sex })}
                                          placeholder={{
                                            label: 'Selecione o seu sexo',
                                            value: null
                                          }}
                                          items={[
                                            { label: 'Masculino', value: 'M' },
                                            { label: 'Feminino', value: 'F' }
                                          ]}
                                        />
                                        <HelperText type="error" visible={this.state.inputErrors.sex === true}>
                                          Selecione o seu sexo!
                                        </HelperText>
                                    </Block>
                                </ProgressStep>
                                <ProgressStep 
                                    label='Endereço'
                                    nextBtnText={'Próximo'} 
                                    previousBtnText={'Anterior'}
                                    onNext={this.onNextStep}
                                    onPrevious={this.onPreviousStep}
                                    nextBtnTextStyle={styles.nextBtnTextStyle} 
                                    previousBtnTextStyle={styles.previousBtnTextStyle}
                                    errors={this.state.errors}>
                                    <Block flex center width={width * 0.8}>
                                      <Input
                                        maxLength={9}
                                        value={this.state.cep}
                                        onChangeText={this.loadInternalAddress}
                                        error={this.state.inputErrors.cep}
                                        keyboardType={'numeric'}
                                        placeholder="CEP"
                                        iconContent={
                                          <Icon
                                            name="location-pin"
                                            family="Entypo"
                                            size={16}
                                            color={argonTheme.COLORS.ICON}
                                            style={styles.inputIcons}
                                          />
                                        } />
                                      <Input
                                        editable={false}
                                        maxLength={100}
                                        value={this.state.state}
                                        onChangeText={state => this.setState({ state })}
                                        error={this.state.inputErrors.state}
                                        placeholder="Estado" />
                                      <Input
                                        editable={false}
                                        maxLength={100}
                                        value={this.state.city}
                                        onChangeText={city => this.setState({ city })}
                                        error={this.state.inputErrors.city}
                                        placeholder="Cidade" />
                                      <Input
                                        editable={false}
                                        maxLength={100}
                                        value={this.state.neighborhood}
                                        onChangeText={neighborhood => this.setState({ neighborhood })}
                                        error={this.state.inputErrors.neighborhood}
                                        placeholder="Bairro" />
                                      <Input
                                        maxLength={150}
                                        value={this.state.address}
                                        onChangeText={address => this.setState({ address })}
                                        error={this.state.inputErrors.address}
                                        placeholder="Endereço" />
                                      <Input
                                        maxLength={5}
                                        value={this.state.number}
                                        onChangeText={number => this.setState({ number })}
                                        error={this.state.inputErrors.number}
                                        keyboardType={'numeric'}
                                        placeholder="Número" />
                                      <Input
                                        maxLength={200}
                                        value={this.state.complement}
                                        onChangeText={complement => this.setState({ complement })}
                                        placeholder="Complemento" />
                                    </Block>
                                </ProgressStep>
                                <ProgressStep 
                                    label='Sobre' 
                                    nextBtnText={'Próximo'} 
                                    previousBtnText={'Anterior'}
                                    onNext={this.onNextStep}
                                    onPrevious={this.onPreviousStep}
                                    nextBtnTextStyle={styles.nextBtnTextStyle} 
                                    previousBtnTextStyle={styles.previousBtnTextStyle}
                                    errors={this.state.errors}>
                                    <Block flex center width={width * 0.8}>
                                      <Select
                                        value={this.state.position}
                                        onValueChange={position => this.setState({ position })} 
                                        placeholder={{
                                          label: 'Escolha um cargo',
                                          value: null
                                        }}
                                        items={[
                                          { label: 'Bardenter', value: '1' },
                                          { label: 'Garçom', value: '2' },
                                          { label: 'Caixa', value: '3' },
                                        ]}
                                      />
                                      <HelperText type="error" visible={this.state.inputErrors.position === true}>
                                        Selecione um cargo!
                                      </HelperText>
                                      <View>
                                        <TextInput 
                                          value={this.state.description}
                                          onChangeText={description => this.setState({ description })}
                                          maxLength={60000}
                                          multiline={true}
                                          numberOfLines={8}
                                          placeholder="Descreva um pouco de sua experiência na vaga escolhida, apontando desde quando trabalha na área, trabalhos já realizados e referências.." 
                                          style={styles.textArea}
                                        />
                                        <HelperText type="error" visible={this.state.inputErrors.description === true}>
                                          Escreva um pouco mais sobre você!
                                        </HelperText>
                                      </View>
                                      <Text>Caracteres restantes: {
                                        this.state.description.length < 50 ? Math.abs(this.state.description.length - 50) : 0
                                      }</Text>
                                    </Block>
                                </ProgressStep>
                                <ProgressStep 
                                    label='Mídias' 
                                    nextBtnText={'Próximo'} 
                                    previousBtnText={'Anterior'}
                                    onNext={this.onNextStep}
                                    onPrevious={this.onPreviousStep}
                                    nextBtnTextStyle={styles.nextBtnTextStyle} 
                                    previousBtnTextStyle={styles.previousBtnTextStyle}
                                    errors={this.state.errors}>
                                    <Block flex center width={width * 0.8} style={{ marginBottom: 15, marginTop: 20 }}>
                                      <Input
                                        maxLength={50}
                                        value={this.state.instagram}
                                        onChangeText={instagram => this.setState({ instagram })}
                                        placeholder="Instagram"
                                        iconContent={
                                          <Icon
                                            name="at-sign"
                                            family="Feather"
                                            size={16}
                                            color={argonTheme.COLORS.ICON}
                                            style={styles.inputIcons}
                                          />
                                        } />
                                        <Text
                                          style={{color: argonTheme.COLORS.DEFAULT, marginBottom: 20, marginTop: 20}}>
                                            Selecione três imagens para o seu perfil
                                        </Text>
                                        <Button
                                          title='Selecionar imagens'
                                          onPress={() => this.setState({ imageBrowserOpen: true })}
                                        />
                                        <View style={styles.emptyContent}>
                                          <Text style={{color: argonTheme.COLORS.PLACEHOLDER}}>ou</Text>
                                        </View>
                                        <Button
                                          title='Tirar foto'
                                          onPress={() => this.setState({ cameraIsOpen: true })}
                                        />
                                        {this.renderImage(this.state.photos)}
                                        <HelperText type="error" visible={this.state.inputErrors.photos === true}>
                                          Selecione três imagens para finalizar o cadastro!
                                        </HelperText>
                                    </Block>
                                </ProgressStep>
                                <ProgressStep 
                                      label='Senha'
                                      nextBtnText={'Próximo'} 
                                      previousBtnText={'Anterior'}
                                      finishBtnText={'Cadastrar'}
                                      onSubmit={this.onSubmit}
                                      onNext={this.onNextStep}
                                      onPrevious={this.onPreviousStep}
                                      nextBtnTextStyle={styles.nextBtnTextStyle} 
                                      previousBtnTextStyle={styles.previousBtnTextStyle}
                                      errors={this.state.errors}>
                                      <Block flex center width={width * 0.8} style={{ marginBottom: 15, marginTop: 20 }}>
                                        <Input
                                          password
                                          maxLength={50}
                                          value={this.state.password}
                                          onChangeText={password => this.setState({ password })}
                                          placeholder="Senha de acesso"
                                          iconContent={
                                            <Icon
                                              size={16}
                                              color={argonTheme.COLORS.ICON}
                                              name="padlock-unlocked"
                                              family="ArgonExtra"
                                              style={styles.inputIcons}
                                            />
                                          } />
                                          <HelperText type="error" visible={this.state.inputErrors.password === true}>
                                            A sua senha deve possuir pelo menos 6 caracteres!
                                          </HelperText>
                                      </Block>
                                  </ProgressStep>
                              </ProgressSteps>
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
  emptyContent: {
    marginTop: 5,
    marginBottom: 5
  },
  registerContainer: {
    flex: 0,
    marginTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    marginBottom: 35,
    width: width * 0.95,
    height: height * 0.95,
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
  data: state.register.data,
  response: state.register.response,
  isLoading: state.isLoading[registerAction]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  set: params => dispatch(set(params)),
  dispatchRegister: params => dispatch(registerAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
