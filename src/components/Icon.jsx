import { StyleSheet } from 'react-native';
import { Icon as ThemedIcon } from '@rneui/themed';

import theme from '../../theme';

const styles = StyleSheet.create({
  primary: {
    color: theme.colors.primary,
    size: 30,
  },
  secondary: {
    color: theme.colors.secondary,
    size: 30,
  },
});

const Icon = ({ style, ...props }) => {
  const iconStyle = [styles.button, style];

  return <ThemedIcon style={iconStyle} {...props} />;
};

export const PrimaryIcon = ({ ...props }) => {
  return <Icon {...styles.primary} {...props} />;
};

export const SecondaryIcon = ({ ...props }) => {
  return <Icon {...styles.secondary} {...props} />;
};

export default Icon;
