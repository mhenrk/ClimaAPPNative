import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface IFabButton {
  label?: string
  onPress: () => void
}

const FabButton = ({ onPress, label = "+" }: IFabButton) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 16,
        right: 16,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#6200EE",
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          elevation: 5, // Sombra no Android
          shadowColor: "#000", // Sombra no iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FabButton;
