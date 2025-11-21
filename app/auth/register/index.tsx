import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import React from "react";
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View, } from 'react-native';

const RegisterScreen = () => {

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* si queremos usar esto debemos envolver el _layout principal con un gesturehandlerrootview */}
      <ScrollView style={{paddingHorizontal: 40, backgroundColor: backgroundColor}}>

        {/* titulo */}
        <View style={{
          paddingTop: height * 0.35,
        }}>

          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{color:'grey'}}>Por favor crea una cuenta para continuar</ThemedText>
        </View>

        {/* email, name and password */}
        <View style={{marginTop: 20}}>
          <ThemedTextInput
            placeholder="Nombre Completo" 
            keyboardType="default" 
            autoCapitalize="words" 
            icon="person-outline"
          />
          <ThemedTextInput
            placeholder="Correo Electrónico" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            icon="mail-outline"
          />
          <ThemedTextInput 
            placeholder="Contraseña" 
            autoCapitalize="none" 
            secureTextEntry
            icon="lock-closed-outline"
          />
          {/* //todo: implementar validación de contraseña */}
          <ThemedTextInput
            placeholder="Confirmar Contraseña" 
            autoCapitalize="none" 
            secureTextEntry
            icon="lock-closed-outline"
          />
        </View>

        {/* espacio */}
        <View style={{marginTop:15}} />

        {/* boton ingresar */}
        <ThemedButton icon="arrow-forward-outline">Crear Cuenta</ThemedButton>
        
        {/* espacio */}
        <View style={{marginTop:30}} />

        {/* enlace a registro */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThemedText>¿Ya tienes una cuenta? </ThemedText>
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Iniciar Sesión
          </ThemedLink>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
