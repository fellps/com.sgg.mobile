import React from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import { get } from '../screens/reducers/notifications/actions';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation, notifications}) => {
  let showNotify = false
  if (notifications && notifications.length > 0) {
    notifications.map((item, index) => {
      showNotify = showNotify || item.Accepted === null
    })
  }
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Notifications')}>
      <Icon
        family="ArgonExtra"
        size={16}
        name="bell"
        color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      />
      { showNotify ? <Block middle style={styles.notify} /> : <Block/> }
    </TouchableOpacity>)
};

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NotificationDetails')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('NotificationDetails')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }

  async componentDidMount() {
    const { dispatchGet } = this.props;
    const { value: { data: notifications } } = await dispatchGet();
    this.setState({ notifications: notifications.data });
  }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = (notifications) => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    if (title === 'Title') {
      return [
        <BellButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (routeName) {
      case 'Home':
        return ([
          <BellButton key='chat-home' navigation={navigation} isWhite={white} notifications={notifications} />
        ]);
      case 'Deals':
        return ([
          <BellButton key='chat-categories' navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />
        ]);
      case 'Schedule':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Checkin':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Pesquisar por uma oportunidade"
        placeholderTextColor={'#8898AA'}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('NotificationDetails')}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('NotificationDetails')}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { notifications } = this.state;
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight(notifications)}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'nav-left' : "menu-8"} family="ArgonExtra" 
              size={20} onPress={this.handleLeftPress} 
              color={iconColor || argonTheme.COLORS.ICON}/>
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          onLeftPress={this.handleLeftPress} 
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.05,
    paddingTop: iPhoneX() ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 0,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

const mapStateToProps = state => ({
  isLoading: state.isLoading[get]
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchGet: params => dispatch(get(params))
})

export default withNavigation(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Header))