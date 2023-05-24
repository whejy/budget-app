import * as yup from 'yup';

export const getInitialValues = (pie = null) => {
  const initialValues = {
    income: (pie && String(pie.income)) || '',
    dates: pie?.dates || { startDate: '', endDate: '' },
  };
  return initialValues;
};

export const getValidationSchema = (totalExpenses = null) => {
  return yup.object().shape({
    income: yup
      .number()
      .typeError('Income must be a number')
      .required('Income is required')
      .positive()
      .min(
        totalExpenses && totalExpenses,
        `Income must be greater than ${totalExpenses}`
      ),
    dates: yup.object().shape({
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string().required('End date is required'),
    }),
  });
};
