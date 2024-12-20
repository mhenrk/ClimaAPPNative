import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@/context";

import { useRouter } from "expo-router";
import { request } from "@/api/requests";

interface IFormData {
  email: string;
  senha: string;
}

//  esquema de validação do Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("O e-mail é obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

const Login = () => {
  const [data, setData] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {      

      const { token } = await request.login({
        email: data.email,
        senha: data.senha,
      });

      if (token != "") {
        login(token);
        router.replace("/(main)/previsaoAtual");
      } else {
        setError("Ocorreu um erro ao realizar o login");
      }
    } catch (error: any) {
      console.error("Erro ao buscar o token:", error.message || error);
      return null; 
    }
  };

  const limparFormulario = () => {
    setData(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', fontSize: 36}}>ClimaAPP</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            name="senha"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.senha && (
                  <Text style={styles.error}>{errors.senha.message}</Text>
                )}
              </>
            )}
          />
          <View style={styles.btnContainer}>
            <Button title="Fazer Login" onPress={handleSubmit(onSubmit)} />                        
            {error && <Text>{JSON.stringify(error, null, 2)}</Text>}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 12
  },
  keyboardAvoiding: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  btnContainer: {
    gap: 12,
  },
});

export default Login;
