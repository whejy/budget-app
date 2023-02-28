import { View, Text, Button, StyleSheet } from 'react-native';

const Prompt = ({ handleYes, handleNo, message }) => {
  return (
    <View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttons}>
        <Button title="Yes" onPress={handleYes} />
        <Button title="Cancel" onPress={handleNo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Prompt;
