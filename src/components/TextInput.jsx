import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
