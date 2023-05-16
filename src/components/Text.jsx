import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
  },
  textDates: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
  heading: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    color: 'white',
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  errorText: {
    marginTop: 5,
  },
});

const Text = ({ variant, style, ...props }) => {
  const textStyle = [
    styles.text,
    variant === 'category' && styles.subheading,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const Heading = ({ ...props }) => {
  return <Text style={styles.heading} {...props} />;
};

export const Subheading = ({ ...props }) => {
  return <Text variant="category" {...props} />;
};

export const ErrorText = ({ ...props }) => {
  return <Text style={styles.errorText} {...props} />;
};

export const DatesText = ({ ...props }) => {
  return <Text style={styles.textDates} {...props} />;
};

export default Text;
