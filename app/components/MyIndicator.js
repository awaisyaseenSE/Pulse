import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import colors from "../config/colors";

export default function MyIndicator({
  visible,
  style,
  color = colors.primaryLight,
  size = "large",
  backgroundColor = colors.black,
  isLoaderShow = false,
}) {
  if (!visible) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,

        {
          opacity: 0.6,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      {isLoaderShow && (
        <ActivityIndicator
          style={{ width: 100, height: 100 }}
          size={size}
          color={color}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
