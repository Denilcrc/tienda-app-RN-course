import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...rest }: props) => {
  
  const primaryColor = useThemeColor({}, 'primary');
  
    return (
    <Pressable style={({pressed}) => [
        {
            backgroundColor: (pressed) ? primaryColor + '90' : primaryColor,
        },
        styles.button,
        
      ]} 
      {...rest}
    >
      <Text style={{ color: 'white' }}>{children}</Text>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={'white'}
          style={{ marginRight: 5, marginLeft: 3 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
