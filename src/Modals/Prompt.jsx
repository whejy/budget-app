import { View, Text, StyleSheet, Platform } from 'react-native';
import { SecondaryButton, CancelButton } from '../components/Button';
import MyModal from './Modal';

const Prompt = ({ modalOpen, onClose, handleYes, message }) => {
  return (
    <MyModal animation="fade" modalOpen={modalOpen} onClose={onClose}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttons}>
        <SecondaryButton title="Delete" onPress={handleYes} />
        {Platform.OS === 'android' && <View style={{ paddingHorizontal: 5 }} />}
        <CancelButton title="Cancel" onPress={onClose} />
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
