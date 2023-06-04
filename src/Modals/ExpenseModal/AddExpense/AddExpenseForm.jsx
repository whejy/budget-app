import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import { categories } from '../../../data/categories';
import {
  addExpense,
  addIncome,
  getInitialValues,
  getExpenseValidationSchema,
  getIncomeValidationSchema,
} from '../formhelpers';

const AddExpenseForm = ({
  pie,
  savePie,
  onClose,
  remainingIncome,
  selectedCategory,
}) => {
  const [formCategory, setFormCategory] = useState(selectedCategory);

  const initialValues = getInitialValues({
    selectedCategory,
  });

  const validationSchema =
    formCategory === 'Income'
      ? getIncomeValidationSchema({ remainingIncome })
      : getExpenseValidationSchema({
          remainingIncome,
        });

  const onSubmit = (values) => {
    const updatePie = () => {
      if (values.category === 'Income') {
        const parsedData = {
          id: Math.round(1000 * Math.random()),
          pie: pie,
          amount: parseNumber(values.amount),
          item: parseString(values.item),
        };

        const updatedPie = addIncome(parsedData);
        return updatedPie;
      } else {
        const parsedData = {
          id: Math.round(1000 * Math.random()),
          item: parseString(values.item),
          amount: parseNumber(values.amount),
          category: values.category,
          pie: pie,
        };

        const updatedPie = addExpense(parsedData);
        return updatedPie;
      }
    };

    onClose();
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
            setFormCategory={setFormCategory}
            onSubmit={handleSubmit}
            onCancel={onClose}
            categories={categories}
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
