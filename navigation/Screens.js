import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import TermsOfUse from "../screens/TermsOfUse";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Checkin from "../screens/Checkin";
import Login from "../screens/Login";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Notifications from "../screens/Notifications";
import NotificationDetails from "../screens/NotificationDetails";
import EventDetails from "../screens/EventDetails";
import Schedule from "../screens/Schedule";
import Register from "../screens/Register";
import UploadDocuments from "../screens/UploadDocuments";
import RecoverPassword from '../screens/RecoverPassword';

// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Perfil" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const CheckinStack = createStackNavigator(
  {
    Checkin: {
      screen: Checkin,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Checkin" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const ScheduleStack = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Minha agenda" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Início" navigation={navigation} />
      })
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Pro" navigation={navigation} />
      })
    },
    Notifications: {
      screen: Notifications,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Notificações" navigation={navigation} />
      })
    },
    NotificationDetails: {
      screen: NotificationDetails,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Mais detalhes" navigation={navigation} />
      })
    },
    EventDetails: {
      screen: EventDetails,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Mais detalhes" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Criar cadastro" navigation={navigation} />
      })
    },
    UploadDocuments: {
      screen: UploadDocuments,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Segunda Seleção" navigation={navigation} />
      })
    },
    RecoverPassword: {
      screen: RecoverPassword,
      navigationOptions: ({ navigation }) => ({
        header: <Header back title="Recuperar senha" navigation={navigation} />
      })
    }
  }
)

const AppStack = createDrawerNavigator(
  {
    TermsOfUse: {
      screen: TermsOfUse,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Home" title="Início" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Perfil" />
        )
      })
    },
    Schedule: {
      screen: ScheduleStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Schedule" title="Minha agenda" />
        )
      })
    },
    Checkin: {
      screen: CheckinStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Checkin" title="Checkin" />
        )
      })
    },
    Auth: {
      screen: AuthStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Login" title="Sair" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
