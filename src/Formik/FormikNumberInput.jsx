import { useField } from 'formik';
import { TextInput } from './Inputs';
import { ErrorText } from '../components/Text';

const FormikNumberInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const errorToShow = showError && 'Cost must be a number';

  // const onChange = (value) => {
  //   const numeric = /^[0-9\b]+$/;

  //   if (value === '' || numeric.test(value)) {
  //     helpers.setValue(value);
  //   }
  // };

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
      {showError && <ErrorText>{errorToShow}</ErrorText>}
    </>
  );
};

export default FormikNumberInput;
