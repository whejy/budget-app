import { View, Text, Button, StyleSheet } from 'react-native';
import MyModal from './Modal';

const Prompt = ({ modalOpen, onClose, handleYes, message }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttons}>
        <Button title="Delete" onPress={handleYes} color="red" />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </MyModal>
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
