import { View } from 'react-native';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';
import FormFields from '../FormFields';
import { getValidationSchema, getInitialValues } from '../formhelpers';
import { parseNumber } from '../../../../utils/helpers';

const validationSchema = getValidationSchema();
const initialValues = getInitialValues();

const AddPieForm = ({ updateList, closeModal }) => {
  const onSubmit = (values) => {
    class Pie {
      constructor({ dates, income }) {
        this.id = uuid.v4();
        this.dates = dates;
        this.income = income;
        this.expenses = {};
      }
    }

    const parsedData = {
      dates: values.dates,
      income: parseNumber(values.income),
    };

    closeModal();
    return updateList(new Pie(parsedData));
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormFields onCancel={closeModal} onSubmit={handleSubmit} />
        )}
      </Formik>
    </View>
  );
};

export default AddPieForm;
