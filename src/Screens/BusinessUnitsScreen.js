import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import colors from "../../assets/colors/colors";

import { Surface, DataTable } from "react-native-paper";

// Import components and styles
import HeaderText from "../components/HeaderTextWithAvatar";
import {
  container,
  headerWithoutSearch,
  headerContainer,
  sectionSubHeadingBox,
  sectionSubHeadingText,
  summaryOverallBox,
  summaryBoxRow,
  summaryBoxTitleBox,
  summaryBoxContent,
  summaryBoxSubContent,
  summaryBoxTitle,
  summaryBoxSubContentContainer,
  verticleLine,
  horizontalLine,
} from "../styles";
import { color } from "react-native-reanimated";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { render } from "react-dom";

const CustomersScreen = ({ navigation }) => {
  if (Platform.OS == "ios") {
    StatusBar.setBarStyle("light-content", true);
  }

  const BUs = [
    {
      id: "1",
      title: "Land",
    },
    {
      id: "2",
      title: "Telco",
    },
    {
      id: "3",
      title: "Offshore & Marine",
    },
    {
      id: "4",
      title: "Telecom & Transport",
    },
    {
      id: "5",
      title: "Infrastructure",
    },
  ];

  return (
    // Overall Container Wrapper
    <ScrollView stickyHeaderIndices={[0]} bounces={false} style={container}>
      {/* Header */}
      <View style={headerWithoutSearch}>
        <View style={headerContainer}>
          <HeaderText text="Business Units" navigation={navigation} />
        </View>
      </View>

      {/* Content Body */}

      {/* Units with Highest Emissions */}
      <View
        style={[sectionSubHeadingBox, { backgroundColor: colors.background }]}
      >
        <Text style={sectionSubHeadingText}>Units with Highest Emissions</Text>
      </View>

      <DataTable>
        {/* <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header> */}

        <DataTable.Row style={{ backgroundColor: "#f6fefc" }}>
          <DataTable.Cell style={styles.tableCol1}>1.</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol2}>Land</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol3}>
            <Text style={styles.emissionChangeText}>490</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-drop-up"
                size={20}
                style={{ color: colors.red }}
              />
              <Text style={{ color: colors.red }}>22.28%</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={{ backgroundColor: "#ffffff" }}>
          <DataTable.Cell style={styles.tableCol1}>2.</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol2}>Telco</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol3}>
            <Text style={styles.emissionChangeText}>39</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-drop-up"
                size={20}
                style={{ color: colors.red }}
              />
              <Text style={{ color: colors.red }}>4.28%</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={{ backgroundColor: "#f6fefc" }}>
          <DataTable.Cell style={styles.tableCol1}>3.</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol2}>
            Offshore & Marine
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol3}>
            <Text style={styles.emissionChangeText}>8</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-drop-down"
                size={20}
                style={{ color: colors.lightGreen }}
              />
              <Text style={{ color: colors.lightGreen }}>3.28%</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={{ backgroundColor: "#ffffff" }}>
          <DataTable.Cell style={styles.tableCol1}>4.</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol2}>
            Telecom & Transport
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol3}>
            <Text style={styles.emissionChangeText}>7</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-drop-up"
                size={20}
                style={{ color: colors.red }}
              />
              <Text style={{ color: colors.red }}>3.02%</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row style={{ backgroundColor: "#f6fefc" }}>
          <DataTable.Cell style={styles.tableCol1}>5.</DataTable.Cell>
          <DataTable.Cell style={styles.tableCol2}>
            Infrastructure
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol3}>
            <Text style={styles.emissionChangeText}>5</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCol4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="arrow-drop-down"
                size={20}
                style={{ color: colors.lightGreen }}
              />
              <Text style={{ color: colors.lightGreen }}>3.28%</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      {/* Units with Highest Emissions */}
      <View
        style={[sectionSubHeadingBox, { backgroundColor: colors.background }]}
      >
        <Text style={sectionSubHeadingText}>Emissions from: Land</Text>
      </View>

      {/* Flatlist scoll for BUs */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={BUs}
        keyExtractor={(item) => item.id}
        renderItem={(bu) => {
          console.log(bu);
          return (
            <View
              style={
                bu.item.title == "Land" ? styles.BUItemActive : styles.BUItem
              }
            >
              <Text
                style={
                  bu.item.title == "Land"
                    ? styles.BUItemTextActive
                    : styles.BUItemText
                }
              >
                {bu.item.title}
              </Text>
            </View>
          );
        }}
      />

      {/* Total and Scope 3 tiles */}
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Surface style={styles.surfaceHalfTile}>
          <Text style={styles.tileTitle}>BU Total</Text>
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
                  <Text style={styles.tileDataText}>490</Text>
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
                <Text style={{ fontSize: 12 }}>Based on all current data</Text>
              </View>
            </View>
          </View>
        </Surface>
        <Surface style={styles.surfaceHalfTile}>
          <Text style={styles.tileTitle}>Scope 3</Text>
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
                  <Text style={styles.tileDataText}>460</Text>
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
                <Text style={{ fontSize: 12 }}>88% of BU Total</Text>
              </View>
            </View>
          </View>
        </Surface>
      </View>

      {/* Scope 2 and 1 tiles */}
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Surface style={styles.surfaceHalfTile}>
          <Text style={styles.tileTitle}>Scope 2</Text>
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
                  <Text style={styles.tileDataText}>27.5</Text>
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
                <Text style={{ fontSize: 12 }}>7% of BU Total</Text>
              </View>
            </View>
          </View>
        </Surface>
        <Surface style={styles.surfaceHalfTile}>
          <Text style={styles.tileTitle}>Scope 1</Text>
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
                  <Text style={styles.tileDataText}>2.5</Text>
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
                <Text style={{ fontSize: 12 }}>5% of BU Total</Text>
              </View>
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableCol1: { flex: 1, justifyContent: "flex-start" },
  tableCol2: { flex: 5, justifyContent: "flex-start" },
  tableCol3: { flex: 2, justifyContent: "flex-start" },
  tableCol4: { flex: 2, justifyContent: "flex-start" },
  emissionChangeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tileDataText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tileDataDeltaText: {
    fontSize: 15,
  },
  surfaceHalfTile: {
    borderRadius: 20,
    borderWidth: 0,
    width: "45%",
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
  BUItem: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 3,
    marginLeft: 15,
    borderRadius: 15,
    justifyContent: "space-between",
    borderWidth: 1,
  },
  BUItemActive: {
    backgroundColor: colors.theme,
    padding: 10,
    marginVertical: 3,
    marginLeft: 15,
    borderRadius: 15,
    justifyContent: "space-between",
    borderWidth: 1,
  },
  BUItemText: {
    fontSize: 15,
  },
  BUItemTextActive: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default CustomersScreen;
