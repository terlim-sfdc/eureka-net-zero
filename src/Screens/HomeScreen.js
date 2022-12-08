import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import colors from "../../assets/colors/colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { useFonts } from "expo-font";
import { Surface } from "react-native-paper";

import axios from "axios";
import {
  totalEmissionsApiURL,
  emissionTargetsApiURL,
  apiCallHeader,
} from "../../axiosConfig";

import ProgressBar from "react-native-animated-progress";

// Import components and styles
import HeaderText from "../components/HeaderTextWithAvatar";
import {
  container,
  headerWithoutSearch,
  headerContainer,
  verticleLine,
} from "../styles";

import { color } from "react-native-reanimated";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emissionsData, setEmissionsData] = useState([]);
  const [targetsData, setTargetsData] = useState([]);

  // Fetch NZC Data from Database
  const fetchEmissionData = async () => {
    try {
      setIsLoading(true);
      const totalEmissionsResponse = await axios.get(
        totalEmissionsApiURL,
        apiCallHeader
      );
      const targetsResponse = await axios.get(
        emissionTargetsApiURL,
        apiCallHeader
      );

      if (
        totalEmissionsResponse.status === 200 &&
        targetsResponse.status === 200
      ) {
        setEmissionsData(totalEmissionsResponse.data);
        setTargetsData(targetsResponse.data);
        setIsLoading(false);
        return;
      } else {
        throw new Error("Failed to fetch NZC data");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Data fetching cancelled");
      } else {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  function percentage(partialValue, totalValue, decimal) {
    return ((100 * partialValue) / totalValue).toFixed(decimal);
  }

  const findEmissionDataByYear = (array, year) => {
    for (i = 0; i < array.length; i++) {
      if (array[i].year.includes(year)) return array[i];
    }
    return [];
  };

  const findTargetEmissionDataByYearAndDescription = (array, year, desc) => {
    for (i = 0; i < array.length; i++) {
      if (array[i].targetyear.includes(year) && array[i].name.includes(desc))
        return array[i];
    }
    return [];
  };

  const percentageChange = (previousValue, currentValue) => {
    const difference = currentValue - previousValue;
    return ((difference / previousValue) * 100).toFixed(2);
  };

  // start is larger number
  // end is smaller number
  const calculateGoalProgress = (start, end, current) => {
    if (end >= start) return 0;
    if (current > start) return 0;
    if (current < end) return 100;

    return Number((((current - start) / (end - start)) * 100).toFixed(2));
  };

  // perform calculation from data
  const currentYear = new Date().getFullYear();

  const currentYearEmissionData = findEmissionDataByYear(
    emissionsData,
    currentYear
  );

  const previousYearEmissionData = findEmissionDataByYear(
    emissionsData,
    currentYear - 1
  );

  const targetBy2050 = findTargetEmissionDataByYearAndDescription(
    targetsData,
    2050,
    "All Emissions"
  );

  const totalEmissionGoalProgress = calculateGoalProgress(
    targetBy2050.baseyearemissions,
    targetBy2050.targetyearemissions,
    currentYearEmissionData.totalemissions
  );

  if (Platform.OS == "ios") {
    StatusBar.setBarStyle("light-content", true);
  }

  // https://reactnavigation.org/docs/function-after-focusing-screen/
  // load emission data from database
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     fetchEmissionData();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

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
          <HeaderText text={"Eureka Net Zero"} navigation={navigation} />
        </View>
      </View>

      <View>
        {/* Sustainability KPI Tile */}
        <Surface style={styles.surfaceTile}>
          <Text style={styles.tileTitle}>Sustainability KPI</Text>

          {isLoading && (
            <ActivityIndicator
              size={"large"}
              color={colors.theme}
              style={styles.activityIndicator}
            ></ActivityIndicator>
          )}

          {!isLoading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <View style={styles.sustainabilityKPIItemContainer}>
                <Ionicons
                  name="water-outline"
                  style={styles.sustainabilityKPIIcon}
                />
                <Text style={styles.sustainabilityKPIType}>Water</Text>
                <Text>management</Text>
                <Text style={styles.sustainabilityKPIPercentage}>81.3%</Text>
              </View>
              <View style={verticleLine}></View>
              <View style={styles.sustainabilityKPIItemContainer}>
                <Ionicons
                  name="trash-outline"
                  style={styles.sustainabilityKPIIcon}
                />
                <Text style={styles.sustainabilityKPIType}>Waste</Text>
                <Text>management</Text>
                <Text style={styles.sustainabilityKPIPercentage}>79.3%</Text>
              </View>
              <View style={verticleLine}></View>
              <View style={styles.sustainabilityKPIItemContainer}>
                <Ionicons
                  name="ios-cloudy-outline"
                  style={styles.sustainabilityKPIIcon}
                />
                <Text style={styles.sustainabilityKPIType}>Greenhouse</Text>
                <Text>Gas Emission</Text>
                <Text style={styles.sustainabilityKPIPercentage}>46.8%</Text>
              </View>
            </View>
          )}
        </Surface>

        {/* Total Carbon Emission Tile */}
        <Surface style={styles.surfaceTile}>
          <Text style={styles.tileTitle}>Total Carbon Emission</Text>

          {isLoading && (
            <ActivityIndicator
              size={"large"}
              color={colors.theme}
              style={styles.activityIndicator}
            ></ActivityIndicator>
          )}

          {!isLoading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* MtCO2e and change view */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={styles.tileDataText}>
                      {/* {(currentYearEmissionData.totalemissions / 1000).toFixed(
                        2
                      )} */}
                      {(12000 / 1000).toFixed(2)}
                    </Text>
                    <Text>ktCO2e</Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flex: 1,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      {percentageChange(
                        previousYearEmissionData.totalemissions,
                        currentYearEmissionData.totalemissions
                      ) < 0 ? (
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={20}
                          style={{ color: colors.lightGreen }}
                        />
                      ) : (
                        <MaterialIcons
                          name="arrow-drop-up"
                          size={20}
                          style={{ color: colors.red }}
                        />
                      )}

                      {percentageChange(
                        previousYearEmissionData.totalemissions,
                        currentYearEmissionData.totalemissions
                      ) < 0 && (
                        <Text
                          style={[
                            styles.tileDataDeltaText,
                            { color: colors.lightGreen },
                          ]}
                        >
                          {Math.abs(
                            percentageChange(
                              previousYearEmissionData.totalemissions,
                              currentYearEmissionData.totalemissions
                            )
                          )}
                          %
                        </Text>
                      )}

                      {percentageChange(
                        previousYearEmissionData.totalemissions,
                        currentYearEmissionData.totalemissions
                      ) >= 0 && (
                        <Text
                          style={[
                            styles.tileDataDeltaText,
                            { color: colors.red },
                          ]}
                        >
                          {Math.abs(
                            percentageChange(
                              previousYearEmissionData.totalemissions,
                              currentYearEmissionData.totalemissions
                            )
                          )}
                          %
                        </Text>
                      )}
                    </View>
                    <Text>last year</Text>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 12 }}>
                    Based on all currenct data from Scopes 1, 2 and 3
                  </Text>
                </View>
              </View>

              <View style={verticleLine}></View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    marginBottom: 5,
                    width: "80%",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 5,
                      color: colors.lightGreen,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    {/* {totalEmissionGoalProgress}% */}
                    30%
                  </Text>

                  <ProgressBar
                    // progress={totalEmissionGoalProgress}
                    progress={30}
                    height={5}
                    backgroundColor={colors.theme}
                    trackColor={"#e5e5e5"}
                  />
                </View>

                <Text style={{ alignSelf: "center" }}>of your 2050 goal</Text>
                <Text style={{ alignSelf: "center" }}>is achieved</Text>
              </View>
            </View>
          )}
        </Surface>

        {/* Scope 3 Tile */}
        <Surface style={styles.surfaceTile}>
          <Text style={styles.tileTitle}>Scope 3</Text>

          {isLoading && (
            <ActivityIndicator
              size={"large"}
              color={colors.theme}
              style={styles.activityIndicator}
            ></ActivityIndicator>
          )}

          {!isLoading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* MtCO2e and change view */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={styles.tileDataText}>
                      {/* {(
                        currentYearEmissionData.totalscope3emissions / 1000
                      ).toFixed(2)} */}
                      {(4000 / 1000).toFixed(2)}
                    </Text>
                    <Text>ktCO2e</Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flex: 1,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcons
                        name="arrow-drop-up"
                        size={20}
                        style={{ color: colors.red }}
                      />
                      <Text
                        style={[
                          styles.tileDataDeltaText,
                          { color: colors.red },
                        ]}
                      >
                        5.30%
                      </Text>
                    </View>
                    <Text>last year</Text>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 12 }}>
                    Based on all currenct data from Scopes 1, 2 and 3
                  </Text>
                </View>
              </View>

              <View style={verticleLine}></View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="warning" size={30} color={colors.red} />
                <Text style={{ fontWeight: "500", marginTop: 5 }}>
                  83% of emissions
                </Text>
                <Text>are from suppliers</Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.theme,
                    fontWeight: "500",
                    padding: 10,
                  }}
                >
                  Find out more &gt;
                </Text>
              </View>
            </View>
          )}
        </Surface>

        {/* Scope 2 and 1 tiles */}
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Surface style={styles.surfaceHalfTile}>
            <Text style={styles.tileTitle}>Scope 2</Text>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={colors.theme}
                style={styles.activityIndicator}
              ></ActivityIndicator>
            )}

            {!isLoading && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                {/* MtCO2e and change view */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text style={styles.tileDataText}>
                        {/* {(
                          currentYearEmissionData.totalscope2emissions / 1000
                        ).toFixed(2)} */}
                        {(5000 / 1000).toFixed(2)}
                      </Text>
                      <Text>ktCO2e</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={20}
                          style={{ color: colors.lightGreen }}
                        />
                        <Text
                          style={[
                            styles.tileDataDeltaText,
                            { color: colors.lightGreen },
                          ]}
                        >
                          5.28%
                        </Text>
                      </View>
                      <Text>last month</Text>
                    </View>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 12 }}>
                      {percentage(
                        currentYearEmissionData.totalscope2emissions,
                        currentYearEmissionData.totalemissions,
                        1
                      )}
                      % of Total emissions
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Surface>
          <Surface style={styles.surfaceHalfTile}>
            <Text style={styles.tileTitle}>Scope 1</Text>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={colors.theme}
                style={styles.activityIndicator}
              ></ActivityIndicator>
            )}

            {!isLoading && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                {/* MtCO2e and change view */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center", flex: 1 }}>
                      <Text style={styles.tileDataText}>
                        {/* {(
                          currentYearEmissionData.totalscope1emissions / 1000
                        ).toFixed(2)} */}
                        {(3000 / 1000).toFixed(2)}
                      </Text>
                      <Text>ktCO2e</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={20}
                          style={{ color: colors.lightGreen }}
                        />
                        <Text
                          style={[
                            styles.tileDataDeltaText,
                            { color: colors.lightGreen },
                          ]}
                        >
                          1.75%
                        </Text>
                      </View>
                      <Text>last month</Text>
                    </View>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 12 }}>
                      {percentage(
                        currentYearEmissionData.totalscope1emissions,
                        currentYearEmissionData.totalemissions,
                        1
                      )}
                      % of Total emissions
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Surface>
        </View>

        <View>
          <TouchableOpacity>
            <Text
              style={{
                alignSelf: "center",
                color: colors.theme,
                fontWeight: "500",
                fontSize: 17,
                margin: 5,
              }}
            >
              <Entypo name="share-alternative" size={20} />
              &nbsp; Share all data in Overview
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  tileDataText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  tileDataDeltaText: {
    fontSize: 15,
  },
  surfaceTile: {
    borderRadius: 20,
    borderWidth: 0,
    width: "90%",
    alignSelf: "center",
    margin: 10,
    padding: 15,
  },
  surfaceHalfTile: {
    borderRadius: 20,
    borderWidth: 0,
    width: "44%",
    alignSelf: "center",
    padding: 15,
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  tileTitle: {
    fontSize: 25,
    color: colors.theme,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sustainabilityKPIPercentage: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 25,
    color: colors.theme,
  },
  sustainabilityKPIType: {
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.theme,
  },
  sustainabilityKPIIcon: {
    fontSize: 30,
    alignSelf: "center",
    color: colors.lightGreen,
    marginBottom: 5,
  },
  sustainabilityKPIItemContainer: {
    padding: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 105,
  },
});

export default HomeScreen;
