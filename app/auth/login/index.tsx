import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

const LoginScreen = () => {

  const {login} = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onLogin = async() => {
  
    const { email, password } = form;
    console.log({email, password});

    if(email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Ingrese su correo y contraseña');
      return;
    }

    setIsPosting(true);
    const wasSuccessfulLogin = await login( email, password );
    setIsPosting(false);

    if ( wasSuccessfulLogin ) {
      router.replace('/'); //redireccionar a home
      return; // si el login fue exitoso no mostramos alerta
    }

    Alert.alert('Login incorrecto', 'Revise sus credenciales');
  
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* si queremos usar esto debemos envolver el _layout principal con un gesturehandlerrootview */}
      <ScrollView style={{paddingHorizontal: 40, backgroundColor: backgroundColor}}>

        {/* titulo */}
        <View style={{
          paddingTop: height * 0.35,
        }}>

          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{color:'grey'}}>Por favor ingrese para continuar</ThemedText>
        </View>

        {/* email and password */}
        <View style={{marginTop: 20}}>
          <ThemedTextInput
            placeholder="Correo Electrónico" 
            keyboardType="email-address" 
            autoCapitalize="none" 
            icon="mail-outline"

            value={form.email}
            onChangeText={(text) => setForm({...form, email: text})}
          />
          <ThemedTextInput
            placeholder="Contraseña" 
            autoCapitalize="none" 
            secureTextEntry
            icon="lock-closed-outline"

            
            value={form.password}
            onChangeText={(text) => setForm({...form, password: text})}
          />
        </View>

        {/* espacio */}
        <View style={{marginTop:15}} />

        {/* boton ingresar */}
        <ThemedButton 
          icon="arrow-forward-outline"
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
        </ThemedButton>
        
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
          <ThemedText>¿No tienes una cuenta? </ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear una
          </ThemedLink>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
