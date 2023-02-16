import { Pressable, Text, View } from 'react-native';
import { useState, cloneElement } from 'react';

const FormToggle = ({ children, buttonText }) => {
  const [form, setForm] = useState(false);

  const content = form ? null : buttonText;

  return (
    <View>
      <Pressable onPress={() => setForm(!form)}>
        <Text>{content}</Text>
      </Pressable>
      {form && cloneElement(children, { setForm: setForm })}
    </View>
  );
};

export default FormToggle;
