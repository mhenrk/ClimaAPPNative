import { Text, View } from "react-native";

const previsaoFutura = () => {
  return (
    <View
      style={{
        flex: 1,        
        width: "100%",
        alignItems: "center",
        marginTop: 10,        
        gap: 8,
        padding: 8,
      }}
    >
      {/* Cartões para o clima de cada dia */}
      {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{day}</Text>
          <View>
            <Text>Máx: 36º</Text>
            <Text>Min: 22º</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default previsaoFutura;
