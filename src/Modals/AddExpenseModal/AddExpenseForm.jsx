import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { categories } from '../../data/categories';
import { parseNumber } from '../../../utils/helpers';
import {
  FormikTextInput,
  FormikSelectInput,
  FormikNumberInput,
} from '../FormField';

const validationSchema = (remainingIncome) => {
  return yup.object().shape({
    item: yup.string().required('Item is required'),
    cost: yup
      .number()
      .required('Cost is required')
      .positive()
      .max(remainingIncome),
    category: yup.string().required('Category is required'),
  });
};

const FormFields = ({ onSubmit, onCancel }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="item" placeholder="Item" />
      <FormikNumberInput name="cost" placeholder="Cost" />
      <FormikSelectInput name="category">
        {categories.map((category, i) => (
          <Picker.Item key={i} label={category} value={category} />
        ))}
      </FormikSelectInput>
      <View style={styles.buttons}>
        <Button title="Add Expense" onPress={onSubmit} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

const AddExpenseForm = ({
  pie,
  updatePie,
  closeModal,
  remainingIncome,
  selectedCategory,
}) => {
  const initialValues = {
    item: '',
    cost: '',
    category: (selectedCategory !== 'Income' && selectedCategory) || 'Shopping',
  };

  const onSubmit = (values) => {
    const parsedData = {
      id: Math.round(1000 * Math.random()),
      item: values.item,
      cost: parseNumber(values.cost),
      category: values.category,
    };

    const addItem = ({ id, item, cost, category }) => {
      Object.keys(pie.expenses).includes(category)
        ? pie.expenses[category].push({ id, item, cost })
        : (pie.expenses[category] = [{ id, item, cost }]);
    };

    closeModal();
    addItem(parsedData);
    return updatePie(pie);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={() => validationSchema(remainingIncome)}
      >
        {({ handleSubmit }) => (
          <FormFields onSubmit={handleSubmit} onCancel={closeModal} />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 15,
  },
});

export default AddExpenseForm;
