import { useField } from 'formik';
import { TextInput } from './Inputs';
import { ErrorText } from '../components/Text';

const FormikNumberInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const errorToShow = showError
    ? showError.includes('NaN') && 'Cost must be a number'
    : null;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        keyboardType="numeric"
        {...props}
      />
      {showError && <ErrorText>{errorToShow || meta.error}</ErrorText>}
    </>
  );
};

export default FormikNumberInput;
