import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  addIncome,
  getInitialValues,
  getValidationSchema,
} from '../formhelpers';

const AddExpenseForm = ({
  pie,
  savePie,
  closeModal,
  remainingIncome,
  selectedCategory,
}) => {
  const [formCategory, setFormCategory] = useState('');

  const initialValues = getInitialValues({ selectedCategory, formCategory });
  const validationSchema = getValidationSchema({
    remainingIncome,
    formCategory,
  });

  const onSubmit = (values) => {
    const updatePie = () => {
      if (values.category === 'Income') {
        const parsedData = {
          pie: pie,
          amount: parseNumber(values.cost),
          source: parseString(values.item),
        };

        const updatedPie = addIncome(parsedData);
        return updatedPie;
      } else {
        const id = Math.round(1000 * Math.random());
        const parsedData = {
          id: id,
          item: parseString(values.item),
          cost: parseNumber(values.cost),
          category: values.category,
          pie: pie,
        };

        const updatedPie = addExpense(parsedData);
        return updatedPie;
      }
    };
    closeModal();
    const updatedPie = updatePie(values);
    return savePie(updatedPie);
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
            formCategory={formCategory}
            setFormCategory={setFormCategory}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddExpenseForm;
