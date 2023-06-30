import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

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

export const LegendText = ({ ...props }) => {
  return <Text allowFontScaling={false} style={styles.legendText} {...props} />;
};

export const DatesText = ({ ...props }) => {
  return <Text style={styles.datesText} {...props} />;
};

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
  datesText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
  legendText: {
    color: theme.colors.labels,
    fontFamily: theme.fonts.secondary,
    fontSize: theme.fontSizes.labels,
    textAlign: 'center',
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

export default Text;
