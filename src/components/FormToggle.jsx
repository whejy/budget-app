import AddExpense from './AddExpense';
import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

const FormToggle = () => {
  const [form, setForm] = useState(false);

  const content = form ? 'Cancel' : 'Add Expense';

  return (
    <View>
      <Pressable onPress={() => setForm(!form)}>
        <Text>{content}</Text>
      </Pressable>
      {form && <AddExpense />}
    </View>
  );
};

export default FormToggle;
