import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from 'react-native';

// ? este layout se encargara de verificar si el usuario esta autenticado o no
const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");

  //? para verificar el estado de autenticacion al cargar este layout
  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    // todo: guardar la ruta a la que se queria acceder para redirigir luego de loguearse
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: backgroundColor },
        contentStyle: { backgroundColor: backgroundColor },
      }}
    >
        <Stack.Screen 
            name="(home)/index"
            options={{
              title: "Productos",
              headerLeft: () => <LogoutIconButton />,
            }}
        />

    </Stack>
  );

};

export default CheckAuthenticationLayout;
