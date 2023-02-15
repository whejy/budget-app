import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
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

export const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export const SelectInput = ({ style, error, ...props }) => {
  const selectInputStyle = [styles.input, error && styles.error, style];

  return <Picker style={selectInputStyle} {...props} />;
};

export const DateInput = ({ style, error, ...props }) => {
  const dateInputStyle = [styles.input, error && styles.error, style];

  return <Calendar style={dateInputStyle} {...props} />;
};
