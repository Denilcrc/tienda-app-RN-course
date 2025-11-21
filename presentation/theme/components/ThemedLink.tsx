import { Link, LinkProps } from 'expo-router';
import { useThemeColor } from '../hooks/use-theme-color';

interface props extends LinkProps{}

const ThemedLink = ({style, ...rest}:props) => {

    const primaryColor = useThemeColor({}, 'primary');

  return (
    <Link
        style={[
            { color: primaryColor },
            style,
        ]}
        {...rest}
    />
  )
}

export default ThemedLink