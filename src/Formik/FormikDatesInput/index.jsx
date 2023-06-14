import DateInput from './DateInput';
import PeriodInput from './PeriodInput';

const FormikDatesInput = ({ name, ...props }) => {
  const dateType =
    name === 'date' ? (
      <DateInput name={name} {...props} />
    ) : (
      <PeriodInput name={name} {...props} />
    );
  return dateType;
};

export default FormikDatesInput;
