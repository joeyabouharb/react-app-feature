import validate from 'validate.js';
import { IsAlphaNumeric, IsPassword } from './customValidations';

validate.validators.IsAlphaNumeric = IsAlphaNumeric;
validate.validators.IsPassword = IsPassword;

const Validate = (data, constraints) => {
  const cleanedData = Object.entries(data).reduce((obj, [key, value]) => {
    return { ...obj, [key]: value.trim() };
  }, {});
  return validate.async(cleanedData, constraints);
};

export default Validate;
