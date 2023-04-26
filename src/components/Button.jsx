import { Button, StyleSheet, Platform } from 'react-native';
import theme from '../../theme';

const AndroidButton = ({ style, ...props }) => {
  const ButtonStyle = [styles.AndroidButton, style];
  return <Button style={ButtonStyle} {...props} />;
};

export const PrimaryButton = ({ ...props }) => {
  return <AndroidButton {...styles.primary} {...props} />;
};

export const SecondaryButton = ({ ...props }) => {
  return <AndroidButton {...styles.secondary} {...props} />;
};

export const CancelButton = ({ ...props }) => {
  return <AndroidButton {...styles.cancel} {...props} />;
};

const styles = StyleSheet.create({
  primary: {
    color: Platform.select({
      android: theme.colors.primary,
    }),
  },
  secondary: {
    color: Platform.select({
      ios: 'red',
      android: theme.colors.secondary,
    }),
  },
  cancel: {
    color: Platform.select({
      android: theme.colors.appBar,
    }),
  },
});

export default AndroidButton;
