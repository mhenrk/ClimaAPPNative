import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

interface ICardCidadeFavorita {
  title: string;
  maxTemp: string;
  minTemp: string;
}

const CardCidadeFavorita = ({
  title = "Título do Card",
  maxTemp,
  minTemp,
}: ICardCidadeFavorita) => {
  const { width } = Dimensions.get("window"); 

  return (
    <TouchableOpacity
      style={{
        width: width,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            color: "#333",
          }}
        >
          {title}
        </Text>
        <View style={{ paddingHorizontal: 12 }}>
          <Text>Máx: {maxTemp}º</Text>
          <Text>Min: {minTemp}º</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCidadeFavorita;
