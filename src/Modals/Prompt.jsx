import { View, Text, Button, StyleSheet } from 'react-native';
import MyModal from './Modal';

const Prompt = ({ modalOpen, onClose, handleYes, message }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <View>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <Button title="Yes" onPress={handleYes} />
          <Button title="Cancel" onPress={onClose} />
        </View>
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
