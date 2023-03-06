import { SelectInput } from './Inputs';
import { useField } from 'formik';
import { ErrorText } from '../components/Text';

const FormikSelectInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <SelectInput
        onValueChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        selectedValue={field.value}
        error={showError}
        borderWidth={0}
        style={{ borderWidth: 0 }}
        {...props}
      />
      {showError && <ErrorText>{meta.error}</ErrorText>}
    </>
  );
};

export default FormikSelectInput;
