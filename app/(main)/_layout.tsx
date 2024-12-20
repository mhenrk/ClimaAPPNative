import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="previsaoAtual">
      <Stack.Screen name="previsaoAtual" options={{ title: 'Previsão do Tempo Hoje', headerShown: false }} />
      <Stack.Screen name="previsaoFutura" options={{ title: 'Previsão Completa' }} />
      <Stack.Screen name="pesquisarCidade" options={{ title: 'Pesquisar Cidade' }} />
      <Stack.Screen name="previsoesFavoritas" options={{ title: 'Previsões Favoritas' }} />
    </Stack>
  );
}
