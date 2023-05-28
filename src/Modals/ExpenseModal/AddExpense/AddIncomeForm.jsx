import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { categories } from '../../../data/categories';
import FormFields from '../FormFields';
import { parseNumber } from '../../../../utils/helpers';
import { getInitialValues, getValidationSchema } from '../formhelpers';

const AddIncomeForm = ({
  pie,
  savePie,
  closeModal,
  remainingIncome,
  selectedCategory,
  dropdownCategory,
  setDropdownCategory,
}) => {
  const initialValues = getInitialValues(
    selectedCategory,
    null,
    dropdownCategory
  );

  const validationSchema = getValidationSchema(
    remainingIncome,
    null,
    dropdownCategory
  );

  const onSubmit = (values) => {
    const updatedIncome = (pie.income += parseNumber(values.amount));

    const updatedPie = {
      ...pie,
      income: updatedIncome,
    };

    closeModal();
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
            setDropdownCategory={setDropdownCategory}
            dropdownCategory={dropdownCategory}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            categories={categories}
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

export default AddIncomeForm;
