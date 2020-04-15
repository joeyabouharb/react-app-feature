import validate from 'validate.js';
import { IsAlphaNumeric, IsPassword, IsValidBucketName } from './customValidations';

validate.validators.IsAlphaNumeric = IsAlphaNumeric;
validate.validators.IsPassword = IsPassword;
validate.validators.IsValidBucketName = IsValidBucketName;

const Validate = Object.freeze((data, constraints) => {
  const cleanedData = Object.entries(data).reduce((obj, [key, value]) => ({
    ...obj, [key]: value.trim(),
  }), {});
  return validate.async(cleanedData, constraints);
});

export default Validate;
