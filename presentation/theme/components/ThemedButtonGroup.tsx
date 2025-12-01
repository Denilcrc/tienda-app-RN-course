import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/use-theme-color";

interface Props {
  options: string[];
  selectedOption: string[];

  onSelectOption: (option: string) => void;
}

const ThemeButtonGroup = ({
  options,
  selectedOption,
  onSelectOption,
}: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelectOption(option)}
          style={[
            styles.button,
            selectedOption.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              styles.buttonText,
              selectedOption.includes(option) && styles.selectedOption,
            ]}
          >{option[0].toLocaleUpperCase() + option.slice(1)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemeButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedOption: {
    color: "#fff",
  },
});
