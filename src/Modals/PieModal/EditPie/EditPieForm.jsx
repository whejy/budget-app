import { View } from 'react-native';
import { Formik } from 'formik';
import FormFields from '../FormFields';
import { parseNumber } from '../../../../utils/helpers';
import { getInitialValues, getValidationSchema } from '../formhelpers';

const EditPieForm = ({ closeModal, savePie, pie, totalExpenses }) => {
  const validationSchema = getValidationSchema(totalExpenses);
  const initialValues = getInitialValues(pie);

  const onSubmit = (values) => {
    const parsedData = {
      dates: values.dates,
      income: parseNumber(values.income),
    };

    const updatedPie = {
      ...pie,
      dates: parsedData.dates,
      income: parsedData.income,
    };

    closeModal();
    return savePie(updatedPie);
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields onCancel={closeModal} onSubmit={handleSubmit} edit />
        )}
      </Formik>
    </View>
  );
};

export default EditPieForm;
