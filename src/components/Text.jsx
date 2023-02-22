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
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export const Subheading = ({ ...props }) => {
  return <Text fontSize="subheading" {...props} />;
};

export const ItemStats = ({ ...props }) => {
  return <Text style={{ paddingBottom: 5 }} fontWeight="bold" {...props} />;
};

export const Dates = ({ ...props }) => {
  return <Text fontWeight="bold" fontSizeSubheading {...props} />;
};

export const ItemStatsLabel = ({ ...props }) => {
  return <Text color="textSecondary" {...props} />;
};

export default Text;
