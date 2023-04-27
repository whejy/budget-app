import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import MyModal from './Modal';

const Prompt = ({ modalOpen, onClose, handleYes, message }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttons}>
        <Button title="Delete" variant="secondary" onPress={handleYes} />
        <Button title="Cancel" variant="primary" onPress={onClose} />
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
