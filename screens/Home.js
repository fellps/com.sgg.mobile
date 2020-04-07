import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { argonTheme } from "../constants/";
import { Truncate } from "../constants/utils";
import { Card } from "../components/";

import { get, updatePushToken } from './reducers/home/actions'

import LoadingScreen from '../components/Loading'

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlights: [], 
      events: []
    };
  }

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`event-${item.IdEvent}`}
        onPress={() => navigation.navigate("EventDetails", { event: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.Image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {Truncate(item.Description, 60)}
            </Text>
            <Text 
              center 
              size={30}
              style={styles.productTitle}>
              {item.Name}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  async componentDidMount() {
    const { dispatchGet, dispatchUpdatePushToken, navigation } = this.props;
    try {
      const PushToken = await AsyncStorage.getItem('pushToken')
      await dispatchUpdatePushToken({ PushToken })

      console.log('PushToken', PushToken)

      const totalHighlights = 5
      const { value: { data: highlights } } = await dispatchGet({ limit: totalHighlights, offset: 0 });
      const { value: { data: events } } = await dispatchGet({ limit: 50, offset: totalHighlights });

      this.setState({ highlights: highlights.data })
      this.setState({ events: events.data })
    } catch (err) {
      if (err.message === 'Request failed with status code 403') {
        await AsyncStorage.setItem('loggedUser', JSON.stringify('{}'));
        navigation.navigate("Login");
      }
    }
  }

  renderCards = (highlights, events) => {
    let keys = []

    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Destaques
        </Text>
        <Block flex>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {highlights && highlights.map((item, index) =>
                this.renderProduct(item, index)
              )}
            </ScrollView>
          </Block>
          {events && events.length > 0 &&           
            <Text bold size={16} style={styles.title}>
              Mais eventos
            </Text>
          }
          {events && events.length > 0 && events.map((item, index) => {
            let card = <React.Fragment/>
            const sort = Math.floor(Math.random() * 2)
            if (!keys.includes(index)) {
              card = <Card item={item} full={ sort ? true : false } horizontal={ sort ? false : true }  />
              keys.push(index);
              if (index > 0 && index % 1 === 0 && events.hasOwnProperty(index + 1)) {
                keys.push(index + 1);
                card = 
                  <Block flex row>
                    <Card
                      item={item}
                      style={{ marginRight: theme.SIZES.BASE }}
                    />
                    <Card item={events[index + 1]} />
                  </Block>
              }
            }
            return (
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                {card}
              </Block>)
          })}
        </Block>
      </Block>
    );
  };

  render() {
    const { highlights, events } = this.state;

    return (
      <LoadingScreen visible={this.props.isLoading}>
        <Block flex>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {this.renderCards(highlights, events)}
          </ScrollView>
        </Block>
      </LoadingScreen>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 8,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 5,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 0,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 0
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 0
  },
  productTitle: {
    paddingBottom: theme.SIZES.BASE * 2
  },
  productPrice: {
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
  }
});

const mapStateToProps = state => ({
  events: state.home.events,
  isLoading: state.isLoading[get]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchGet: params => dispatch(get(params)),
  dispatchUpdatePushToken: params => dispatch(updatePushToken(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);