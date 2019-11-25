import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { jobs, argonTheme } from "../constants/";
import { Card } from "../components/";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Home extends React.Component {
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("NotificationDetails", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text 
              center 
              size={30}
              style={styles.productTitle}>
              {item.title}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Meus convites
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {jobs && jobs.map((item, index) =>
            <Card item={item} horizontal />
          )}
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
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
    borderRadius: 4,
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
    borderRadius: 4
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
    borderRadius: 3
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

export default Home;
