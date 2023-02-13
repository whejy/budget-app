import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

const FormToggle = ({ children, buttonText }) => {
  const [form, setForm] = useState(false);

  const content = form ? 'Cancel' : buttonText;

  return (
    <View>
      <Pressable onPress={() => setForm(!form)}>
        <Text>{content}</Text>
      </Pressable>
      {form && children}
    </View>
  );
};

export default FormToggle;
