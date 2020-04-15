
import validator from 'validator';
import Regex from './regex';

function isAlphanumeric(value, option, key) {
  const test = option
    ? { condition: !validator.isAlphanumeric(value), msg: 'must' }
    : { condition: validator.isAlphanumeric(value), msg: 'mustn\'t' };
  if (test.condition) {
    return `${key} ${test.msg} be alphanumeric!`;
  }
  return null;
}

function validBucketName(value, options, key) {
  if (key) {
    const pattern = '[a-z0-9-]+';
    return !validator.matches(value, Regex(pattern))
      ? 'must be alphanumeric (lowercase only!)'
      : null;
  }
  return null;
}

function isPassword(value, options, key) {
  const passwordPattern = `
    ^(?=.{12,})
    (?=.*[a-zA-Z])
    (?=.*[0-9]) 
    (?=.*[@_^!#$%&? "-]).*$
  `;
  if (!validator.matches(value, Regex(passwordPattern))) {
    return `${key} must be 12 characters long and have at least 1 alphabetic, numeric and special characters (@_^!#$%&? "-)`;
  }
  return null;
}

export const IsPassword = Object.freeze(isPassword);
export const IsAlphaNumeric = Object.freeze(isAlphanumeric);
export const IsValidBucketName = Object.freeze(validBucketName);
