import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import theme from '../../theme';

const CustomButton = ({ variant, style, ...props }) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    style,
  ];
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} {...props}>
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  container: {
    marginHorizontal: 5,
  },
  primary: {
    backgroundColor: theme.colors.appBar,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomButton;
