import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import {
  FormikTextInput,
  FormikSelectInput,
  FormikNumberInput,
} from '../FormField';
import { categories } from '../../data/categories';
import { parseNumber } from '../../../utils/helpers';

const validationSchema = yup.object().shape({
  item: yup.string().required('Item is required'),
  cost: yup.number().required('Cost is required').positive(),
  category: yup.string().required('Category is required'),
});

const FormFields = ({ onSubmit, onCancel, onDelete }) => {
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
        <Button color="red" title="Delete" onPress={onDelete} />
        <Button title="Update" onPress={onSubmit} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

const EditExpenseForm = ({
  updateExpense,
  removeExpense,
  item,
  closeModal,
  category,
}) => {
  const initialValues = {
    item: item.item,
    cost: String(item.cost),
    category: category,
  };

  const onDelete = () => {
    closeModal();
    removeExpense(item);
  };

  const onSubmit = (values) => {
    const updatedItem = {
      id: item.id,
      item: values.item,
      cost: parseNumber(values.cost),
    };
    const updatedCategory = values.category;
    return updateExpense({ updatedItem, updatedCategory });
    // const parsedData = {
    //   id: Math.round(1000 * Math.random()),
    //   item: values.item,
    //   cost: parseNumber(values.cost),
    //   category: values.category,
    // };

    // const addItem = ({ id, item, cost, category }) => {
    //   Object.keys(pie.expenses).includes(category)
    //     ? pie.expenses[category].push({ id, item, cost })
    //     : (pie.expenses[category] = [{ id, item, cost }]);
    // };

    // addItem(parsedData);
    // setModalOpen(false);
    // return updatePie(pie);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields
            onSubmit={handleSubmit}
            onDelete={onDelete}
            onCancel={closeModal}
          />
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

export default EditExpenseForm;
