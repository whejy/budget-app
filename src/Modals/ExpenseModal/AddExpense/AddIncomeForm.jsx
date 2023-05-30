import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { IncomeFormFields } from '../FormFields';
import { parseNumber, parseString } from '../../../../utils/helpers';
import {
  addIncome,
  getIncomeInitialValues,
  getIncomeValidationSchema,
} from '../formhelpers';

const AddIncomeForm = ({
  pie,
  savePie,
  onClose,
  formCategory,
  setFormCategory,
}) => {
  const initialValues = getIncomeInitialValues();
  const validationSchema = getIncomeValidationSchema({
    formCategory,
  });

  const onSubmit = (values) => {
    const parsedData = {
      pie: pie,
      amount: parseNumber(values.cost),
      source: parseString(values.item),
    };

    onClose();
    const updatedPie = addIncome(parsedData);
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
          <IncomeFormFields
            onSubmit={handleSubmit}
            onCancel={onClose}
            formCategory={formCategory}
            setFormCategory={setFormCategory}
          />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddIncomeForm;
