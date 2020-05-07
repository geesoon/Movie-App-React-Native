import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../contants/color";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>MOVIE LOOKUP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: Colors.accent,
    paddingTop: 30,
    paddingLeft: 10,
    margin: 10,
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default Header;
