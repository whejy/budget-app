import { SelectInput } from './Inputs';
import { useField } from 'formik';
import { ErrorText } from '../components/Text';

const FormikSelectInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const handleChange = (value) => {
    props.setDropdownCategory && props.setDropdownCategory(value);
    helpers.setValue(value);
  };

  return (
    <>
      <SelectInput
        onValueChange={handleChange}
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
