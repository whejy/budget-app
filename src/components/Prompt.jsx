import { View, Text, Button } from 'react-native';

const Prompt = ({ handleYes, setModalOpen, promptMessage }) => {
  return (
    <View>
      <Text>{promptMessage}</Text>
      <Button title="Yes" onPress={handleYes} />
      <Button title="Cancel" onPress={() => setModalOpen(false)} />
    </View>
  );
};

export default Prompt;
