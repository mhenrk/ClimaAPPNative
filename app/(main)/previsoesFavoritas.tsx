import React from "react";
import CardCidadeFavorita from "@/components/cardCidadeFavorita";
import { Text, View } from "react-native";

interface IPrevisoesFavoritas {
  cidade: string;
  tempMaxima: string;
  tempMinima: string;
}

const PrevisoesFavoritas = () => {
  const cidades = [
    {
      cidade: "Ubatuba",
      tempMaxima: "34",
      tempMinima: "20",
    },
    {
      cidade: "São Paulo",
      tempMaxima: "28",
      tempMinima: "18",
    },
    {
      cidade: "Rio de Janeiro",
      tempMaxima: "36",
      tempMinima: "22",
    },
    {
      cidade: "Curitiba",
      tempMaxima: "25",
      tempMinima: "15",
    },
    {
      cidade: "Porto Alegre",
      tempMaxima: "30",
      tempMinima: "17",
    },
    {
      cidade: "Salvador",
      tempMaxima: "33",
      tempMinima: "24",
    },
  ];

  return (
    <View style={{ flex: 1, gap: 8 }}>
      {cidades.length > 0 ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10, 
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              Cidades Favoritas Encontradas:
            </Text>
            <Text>{cidades.length}</Text>
          </View>
          {cidades.map((cidade, index) => (
            <CardCidadeFavorita
              key={index} 
              title={cidade.cidade} 
              maxTemp={cidade.tempMaxima} 
              minTemp={cidade.tempMinima} 
            />
          ))}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "#c3c3c3" }}>
            Nenhuma cidade encontrada
          </Text>
        </View>
      )}
    </View>
  );
};

export default PrevisoesFavoritas;
