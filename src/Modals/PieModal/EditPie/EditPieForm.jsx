import { View } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { getInitialValues, getValidationSchema } from '../formhelpers';
import { parseNumber } from '../../../../utils/helpers';

const EditPieForm = ({ closeModal, savePie, pie, totalExpenses, ...props }) => {
  const validationSchema = getValidationSchema(totalExpenses);
  const initialValues = getInitialValues(pie);

  const onSubmit = (values) => {
    if (values !== initialValues) {
      const parsedData = {
        dates: values.dates,
        income: parseNumber(values.income),
      };

      const updatedPie = {
        ...pie,
        dates: parsedData.dates,
        income: parsedData.income,
      };

      savePie(updatedPie);
    }
    closeModal();
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields
            onCancel={closeModal}
            {...props}
            onSubmit={handleSubmit}
            edit
          />
        )}
      </Formik>
    </View>
  );
};

export default EditPieForm;
