import { request } from "@/api/requests";
import BotaoFavorito from "@/components/botaoFavorito";
import FabButton from "@/components/fabButton";
import { useAuth } from "@/context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrevisaoAtual = () => {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
  });
  const router = useRouter();
  const { login } = useAuth();
  const handleLogout = () => {
    login("");
    router.replace("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { name, email } = await request.listarDadosUsuario();

      if (name && email) {
        setUserData({
          nome: name,
          email,
        });
      } else {
        setUserData({
          nome: "Usuario Teste",
          email: "email@email.com.br",
        });
      }
    };

    fetchData();
  }, []);

  const handlePrevisaoCincoDias = () => {
    router.navigate("/(main)/previsaoFutura");
  };

  const handlePesquisarCidades = () => {
    router.navigate("/(main)/pesquisarCidade");
  };

  const handlePrevisoesFavoritas = () => {
    router.navigate("/(main)/previsoesFavoritas");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ color: "#000", fontSize: 16 }}>
              Olá, {userData.nome} ({userData.email})
            </Text>            
          </View>
          <Pressable
            onPress={handleLogout}
            style={{
              borderColor: "#000",
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            <Text style={{ color: "#000", fontSize: 16 }}>Sair</Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: 24,
              width: "100%",
              textAlign: "center",
            }}
          >
            Previsão atual
          </Text>

          <BotaoFavorito />

          <View
            style={{
              flex: 1, 
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 10,
              gap: 24,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 36 }}>Ubatuba</Text>
              <Text style={{ fontSize: 18 }}>19/12/2024</Text>
            </View>

            <View
              style={{
                borderRadius: 8,
                padding: 8,
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 48,
                  gap: 12,
                }}
              >
                <View>
                  <Text style={{ fontSize: 36 }}>25°C</Text>
                </View>
                <View
                  style={{ width: 1, backgroundColor: "#000", height: "100%" }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Max: 30°C</Text>
                  <Text style={{ fontSize: 16 }}>Min: 20°C</Text>
                </View>
              </View>

              <View>
                <Pressable
                  onPress={handlePrevisaoCincoDias}
                  style={{
                    padding: 12,
                    backgroundColor: "#c3c3c3",
                    borderRadius: 99,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Previsão Completa</Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={handlePrevisoesFavoritas}
                  style={{
                    padding: 12,
                    backgroundColor: "#c3c3c3",
                    borderRadius: 99,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    Previsões Climáticas Favoritas
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <FabButton onPress={handlePesquisarCidades} />
      </View>
    </SafeAreaView>
  );
};

export default PrevisaoAtual;
