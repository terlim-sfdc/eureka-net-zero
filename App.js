import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import colors from "./assets/colors/colors";

import HomeScreen from "./src/Screens/HomeScreen";
import BusinessUnitsScreen from "./src/Screens/BusinessUnitsScreen";
import GoalsScreen from "./src/Screens/GoalsScreen";
import ProfileScreen from "./src/Screens/ProfileScreen";
import AboutScreen from "./src/Screens/AboutScreen";

import * as Font from "expo-font";

import { useFonts } from "expo-font";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: styles.tabBar,
        tabBarActiveTintColor: colors.theme,
        tabBarInactiveTintColor: colors.grey,
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="face" size={32} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="BU"
        component={BusinessUnitsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="building" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="target" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info" size={32} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    /* configuration for matching screens with paths */
  },
};

const App = () => {
  // let [fontsLoaded] = useFonts({
  //   ProximaNova: require("./assets/fonts/Proxima-Nova.otf"),
  //   ProximaNovaBold: require("./assets/fonts/Proxima-Nova-Bold.otf"),
  // });

  const [fontLoaded, setFontLoaded] = useState(false);

  // load fonts
  useEffect(() => {
    const loadFonts = async () => {
      await Promise.all([
        Font.loadAsync({
          ProximaNova: require("./assets/fonts/Proxima-Nova.otf"),
          ProximaNovaBold: require("./assets/fonts/Proxima-Nova-Bold.otf"),
        }),
      ]);
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    // Hides native splash screen after 1s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 200);
  }, []);

  if (!fontLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              title: "BPI Home Screen",
              headerShown: false,
              headerStyle: {
                backgroundColor: colors.theme,
              },
              headerTitleStyle: { color: "white" },
              headerTintColor: colors.white,
            }}
          />

          <Stack.Screen
            name="ProfileScreen"
            // Default card shows first item
            initialParams={{ itemClicked: 1 }}
            component={ProfileScreen}
            options={{
              title: "Profile Screen",
              headerShown: false,
              headerStyle: {
                backgroundColor: colors.theme,
              },
              headerTitleStyle: { color: "white" },
              headerTintColor: colors.white,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.theme,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default App;
