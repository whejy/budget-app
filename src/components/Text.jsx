import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorDates: {
    color: theme.colors.dateText,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  fontStyleItalic: {
    fontStyle: 'italic',
  },
  errorText: {
    marginTop: 5,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'dates' && styles.colorDates,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    fontWeight === 'italic' && styles.fontStyleItalic,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const Heading = ({ ...props }) => {
  return (
    <Text
      fontSize="heading"
      fontWeight="bold"
      style={{ color: 'white', paddingBottom: 25 }}
      {...props}
    />
  );
};

export const Subheading = ({ ...props }) => {
  return <Text fontSize="subheading" {...props} />;
};

export const ErrorText = ({ ...props }) => {
  return <Text style={styles.errorText} {...props} />;
};

export const DatesText = ({ ...props }) => {
  return <Text fontSize="subheading" color="dates" {...props} />;
};

export default Text;
