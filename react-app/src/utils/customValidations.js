
import validator from 'validator';

export function IsAlphaNumeric(value, option, key) {
  const test = option
    ? { condition: !validator.isAlphanumeric(value), msg: 'must' }
    : { condition: validator.isAlphanumeric(value), msg: 'mustn\'t' };
  if (test.condition) {
    return `${key} ${test.msg} be alphanumeric!`;
  }
  return null;
}

export function IsPassword(value, options, key) {
  if (!validator.matches(value, /^(?=.{12,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "-]).*$/)) {
    return `${key} must be 12 characters long and have at least 1 alphabetic, numeric and special character`;
  }
  return null;
}
