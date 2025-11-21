import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, ...rest }: props) => {

    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef<TextInput>(null); //para mejorar la sensacion de performance al enfocar el input

  return (
    <View
        style={{
            ...styles.border,
            borderColor: isActive ? primaryColor : '#ccc', // cambiar color del border si esta activo
        }}    
        onTouchStart={() => inputRef.current?.focus()} // al tocar todo el view se enfoca el input
    >

        { icon && (
            <Ionicons 
                name={ icon }
                size={20}
                color={ textColor }
                style={{ marginRight: 5 , marginLeft: 3}}
            />
        )}

      <TextInput
        ref={ inputRef }
        placeholderTextColor='#5c5c5c'
        onFocus={ () => setIsActive(true) }
        onBlur={ () => setIsActive(false) }
        style={{
            marginRight: 10,
            color: textColor,
            flex: 1,
        }}
        {...rest}
       />
    </View>
  )
}

export default ThemedTextInput


const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

