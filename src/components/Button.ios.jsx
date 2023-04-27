import { Button, StyleSheet } from 'react-native';

const CustomButton = ({ variant, style, ...props }) => {
  const buttonStyle = [variant === 'secondary' && styles.secondary, style];
  return <Button style={buttonStyle} color={buttonStyle[0].color} {...props} />;
};

const styles = StyleSheet.create({
  secondary: {
    color: 'red',
  },
});

export default CustomButton;
