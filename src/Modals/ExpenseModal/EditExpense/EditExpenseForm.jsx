import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addExpense,
  removeExpense,
  getInitialValues,
  getValidationSchema,
} from '../formhelpers';

const EditExpenseForm = ({
  item,
  initialPie,
  initialCategory,
  remainingIncome,
  savePie,
  closeModal,
}) => {
  const initialValues = getInitialValues(initialCategory, item);
  const validationSchema = getValidationSchema(remainingIncome, item.cost);

  const onDelete = () => {
    const updatedPie = removeExpense({
      item,
      pie: initialPie,
      category: initialCategory,
    });
    savePie(updatedPie);
    closeModal();
  };

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const newCategory = values.category;

      const updatedItem = {
        id: item.id,
        item: parseString(values.item),
        cost: parseNumber(values.cost),
      };

      const updatedPiePartial = removeExpense({
        item: updatedItem,
        pie: initialPie,
        category: initialCategory,
      });

      const updatedPieComplete = addExpense({
        ...updatedItem,
        updatedPiePartial,
        category: newCategory,
      });

      savePie(updatedPieComplete);
    }
    closeModal();
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
