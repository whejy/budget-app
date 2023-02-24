import { View, Text, Button } from 'react-native';

const Prompt = ({ handleYes, handleNo, message }) => {
  return (
    <View>
      <Text>{message}</Text>
      <Button title="Yes" onPress={handleYes} />
      <Button title="Cancel" onPress={handleNo} />
    </View>
  );
};

export default Prompt;
