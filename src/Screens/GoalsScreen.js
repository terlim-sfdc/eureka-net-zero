import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../assets/colors/colors";

import * as Progress from "react-native-progress";
import ProgressBar from "react-native-animated-progress";

import { Surface, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";

import indonesiaReforestation from "../../assets/images/carbon-offset-projects/indonesia.png";
import cleanCookstoves from "../../assets/images/carbon-offset-projects/cookstoves.png";
import aramco from "../../assets/images/carbon-offset-projects/aramco.png";
import solar from "../../assets/images/carbon-offset-projects/solar.png";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { WebView } from "react-native-webview";

import { useFonts } from "expo-font";

// Import components and styles
import {
  container,
  headerWithoutSearch,
  headerContainer,
  subTabText,
  activeSubTabButton,
  inactiveSubTabButton,
  summaryOverallBox,
  summaryBoxRow,
  summaryBoxTitleBox,
  summaryBoxContent,
  summaryBoxSubContent,
  summaryBoxTitle,
  horizontalLine,
  verticleLine,
  sectionSubHeadingBox,
  sectionSubHeadingText,
  summaryBoxSubContentContainer,
} from "../styles";
import HeaderText from "../components/HeaderTextWithAvatar";

/* Actual Customer Detail Screen */

const GoalsScreen = ({ route, navigation }) => {
  /* Set up state for search term */
  const [term, setTerm] = useState("");

  if (Platform.OS == "ios") {
    StatusBar.setBarStyle("light-content", true);
  }

  return (
    // Overall Container Wrapper
    <ScrollView
      style={container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      bounces={false}
    >
      {/* Header */}
      <View style={headerWithoutSearch}>
        <View style={headerContainer}>
          <HeaderText text="Goals" navigation={navigation} />
        </View>
      </View>

      {/* Content Body */}

      {/* Visit Carbon Marketplace button */}
      <TouchableOpacity>
        <Surface style={styles.surfaceMarketplaceButton}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Fontisto name="shopping-store" size={25} color={colors.theme} />
            <Text style={{ fontSize: 20 }}>Visit the Carbon Marketplace</Text>
            <MaterialCommunityIcons
              name="new-box"
              size={25}
              color={colors.lightGreen}
            />
          </View>
        </Surface>
      </TouchableOpacity>

      {/* Sustainability KPI Subsection Container */}
      <View style={styles.goalsSubsectionContainer}>
        <View>
          <Text style={styles.goalsSubsectionSubheaders}>
            Sustainability KPI
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Surface style={styles.sustainabilityKPITiles}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="water-outline"
                  size={20}
                  color={colors.lightGreen}
                />
                <Text style={{ width: "80%", padding: 3, fontSize: 12 }}>
                  Water Mgmt
                </Text>
              </View>
              <Feather
                name="check-circle"
                color={colors.lightGreen}
                size={20}
                style={{ alignSelf: "center", margin: 10 }}
              />
              <Text style={{ alignSelf: "center" }}>goal set FY22</Text>
            </Surface>
            <Surface style={styles.sustainabilityKPITiles}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.lightGreen}
                />
                <Text style={{ width: "80%", padding: 3, fontSize: 12 }}>
                  Trash Mgmt
                </Text>
              </View>
              <Feather
                name="check-circle"
                color={colors.lightGreen}
                size={20}
                style={{ alignSelf: "center", margin: 10 }}
              />
              <Text style={{ alignSelf: "center" }}>goal set FY22</Text>
            </Surface>
            <Surface style={styles.sustainabilityKPITiles}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-cloudy-outline"
                  size={20}
                  color={colors.lightGreen}
                />
                <Text style={{ width: "80%", padding: 3, fontSize: 12 }}>
                  Greenhouse Gas Emission
                </Text>
              </View>
              <Feather
                name="check-circle"
                color={colors.lightGreen}
                size={20}
                style={{ alignSelf: "center", margin: 10 }}
              />
              <Text style={{ alignSelf: "center" }}>goal set FY22</Text>
            </Surface>
          </View>
        </View>
      </View>

      {/* Current Goals Subsection Container */}
      <View style={styles.goalsSubsectionContainer}>
        <View>
          <Text style={styles.goalsSubsectionSubheaders}>Current Goals</Text>
          <View>
            {/* Carbon Goal */}
            <Surface style={{ marginBottom: 15 }}>
              <ProgressBar
                progress={12}
                height={6}
                backgroundColor={"#04e1cb"}
                trackColor={"#e5e5e5"}
                borderRadius={0}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.currentGoalsTitleText}>
                    0 Carbon goal
                  </Text>
                  <Text style={styles.currentGoalsProgressText}>
                    12% of goals achieved so far
                  </Text>
                </View>
                <View style={styles.currentGoalsTagContainer}>
                  <Text style={styles.currentGoalsTagText}>Due Jan 2050</Text>
                </View>
              </View>
            </Surface>

            {/* Carbon Goal */}
            <Surface style={{ marginBottom: 15 }}>
              <ProgressBar
                progress={35}
                height={6}
                backgroundColor={"#03b4a7"}
                trackColor={"#e5e5e5"}
                borderRadius={0}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.currentGoalsTitleText}>
                    Input all supplier data
                  </Text>
                  <Text style={styles.currentGoalsProgressText}>
                    35% of goals achieved so far
                  </Text>
                </View>
                <View style={styles.currentGoalsTagContainer}>
                  <Text style={styles.currentGoalsTagText}>Due Jan 2025</Text>
                </View>
              </View>
            </Surface>

            {/* Plant trees */}
            <Surface style={{ marginBottom: 15 }}>
              <ProgressBar
                progress={86}
                height={6}
                backgroundColor={"#0b827c"}
                trackColor={"#e5e5e5"}
                borderRadius={0}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.currentGoalsTitleText}>
                    Plant 500K trees
                  </Text>
                  <Text style={styles.currentGoalsProgressText}>
                    86% of goals achieved so far
                  </Text>
                </View>
                <View style={styles.currentGoalsTagContainer}>
                  <Text style={styles.currentGoalsTagText}>Due Jan 2023</Text>
                </View>
              </View>
            </Surface>

            {/* Archieve goals */}
            <Surface style={{ marginBottom: 15 }}>
              <ProgressBar
                progress={100}
                height={6}
                backgroundColor={"#024d4c"}
                trackColor={"#e5e5e5"}
                borderRadius={0}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.currentGoalsTitleText}>
                    Archieved 3 goals
                  </Text>
                  <Text style={styles.currentGoalsProgressText}>
                    100% of goals achieved so far
                  </Text>
                </View>
                <View style={styles.currentGoalsTagContainer}>
                  <Text style={styles.currentGoalsTagText}>Past Goals</Text>
                </View>
              </View>
            </Surface>
          </View>
        </View>
      </View>

      {/* Carbon Offset Projects Subsection Container */}
      <View style={styles.goalsSubsectionContainer}>
        <View>
          <Text style={styles.goalsSubsectionSubheaders}>
            Carbon Offset Projects
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View
              style={[
                styles.carbonOffsetProjectsIconsContainer,
                {
                  borderBottomColor: colors.lightGreen,
                  borderBottomWidth: 5,
                },
              ]}
            >
              <FontAwesome5
                name="border-all"
                size={25}
                color={colors.lightGreen}
              />
              <Text style={{ fontWeight: "bold" }}>All</Text>
            </View>
            <View style={styles.carbonOffsetProjectsIconsContainer}>
              <MaterialCommunityIcons name="tree-outline" size={25} />
              <Text>Trees</Text>
            </View>
            <View style={styles.carbonOffsetProjectsIconsContainer}>
              <Ionicons name="water-outline" size={25} />
              <Text>Water</Text>
            </View>
            <View style={styles.carbonOffsetProjectsIconsContainer}>
              <Ionicons name="trash-outline" size={25} />
              <Text>Waste</Text>
            </View>
            <View style={styles.carbonOffsetProjectsIconsContainer}>
              <Ionicons name="ios-cloudy-outline" size={25} />
              <Text>Gas</Text>
            </View>
            <View style={styles.carbonOffsetProjectsIconsContainer}>
              <Feather name="sun" size={25} />
              <Text>Solar</Text>
            </View>
          </View>

          {/* Indonesia Reforestation */}
          <Surface style={{ marginBottom: 15 }}>
            <Progress.Bar
              progress={0}
              width={null}
              color={"#04e1cb"}
              style={{ marginBottom: 0 }}
              borderWidth={0}
              unfilledColor={"#e5e5e5"}
              borderRadius={0}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={indonesiaReforestation}
                  style={styles.carbonOffsetProjectImage}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.currentGoalsTitleText}>
                  Indonesia Reforestation
                </Text>
                <Text style={styles.currentGoalsProgressText}>
                  -430ktCO2e to -970ktCO2e
                </Text>
              </View>
            </View>
          </Surface>

          {/* Clean Cookstoves Initiatives */}
          <Surface style={{ marginBottom: 15 }}>
            <Progress.Bar
              progress={0}
              width={null}
              color={"#04e1cb"}
              style={{ marginBottom: 0 }}
              borderWidth={0}
              unfilledColor={"#e5e5e5"}
              borderRadius={0}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={cleanCookstoves}
                  style={styles.carbonOffsetProjectImage}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.currentGoalsTitleText}>
                  Clean Cookstoves Initiatives
                </Text>
                <Text style={styles.currentGoalsProgressText}>
                  -430ktCO2e to -970ktCO2e
                </Text>
              </View>
            </View>
          </Surface>

          {/* Aramco Carbon Capture Rocks */}
          <Surface style={{ marginBottom: 15 }}>
            <Progress.Bar
              progress={0}
              width={null}
              color={"#04e1cb"}
              style={{ marginBottom: 0 }}
              borderWidth={0}
              unfilledColor={"#e5e5e5"}
              borderRadius={0}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={aramco}
                  style={styles.carbonOffsetProjectImage}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.currentGoalsTitleText}>
                  Aramco Carbon Capture Rocks
                </Text>
                <Text style={styles.currentGoalsProgressText}>
                  -430ktCO2e to -970ktCO2e
                </Text>
              </View>
            </View>
          </Surface>

          {/* Solar energy investment */}
          <Surface style={{ marginBottom: 15 }}>
            <Progress.Bar
              progress={0}
              width={null}
              color={"#04e1cb"}
              style={{ marginBottom: 0 }}
              borderWidth={0}
              unfilledColor={"#e5e5e5"}
              borderRadius={0}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Image source={solar} style={styles.carbonOffsetProjectImage} />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.currentGoalsTitleText}>
                  Solar energy investment
                </Text>
                <Text style={styles.currentGoalsProgressText}>
                  -430ktCO2e to -970ktCO2e
                </Text>
              </View>
            </View>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 350,
  },
  surfaceMarketplaceButton: {
    borderRadius: 20,
    borderWidth: 0,
    width: "90%",
    alignSelf: "center",
    margin: 10,
    padding: 15,
  },
  goalsSubsectionContainer: {
    width: "93%",
    padding: 5,
    alignSelf: "center",
  },
  goalsSubsectionSubheaders: {
    fontSize: 25,
    color: colors.black,
    marginVertical: 10,
  },
  sustainabilityKPITiles: {
    borderColor: colors.lightGreen,
    borderWidth: 1,
    flex: 1,
    padding: 3,
    marginTop: 8,
    marginHorizontal: 3,
  },
  currentGoalsTitleText: {
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  currentGoalsProgressText: {
    fontSize: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  currentGoalsTagText: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.white,
  },
  currentGoalsTagContainer: {
    backgroundColor: colors.lightGreen,
    height: 30,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  carbonOffsetProjectsIconsContainer: {
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
  },
  carbonOffsetProjectImage: {
    width: 80,
    height: 65,
  },
});

export default GoalsScreen;
