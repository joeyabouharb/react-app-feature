const ValidRegister = {
  username: {
    presence: true,
    length: {
      maximum: 100,
      tooLong: 'was too long?',
    },
    IsAlphaNumeric: true,
  },
  password: {
    presence: true,
    IsPassword: true,
    length: {
      maximum: 100,
      tooLong: 'was too long?',
    },
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
    length: {
      minimum: 1,
      tooShort: 'was not entered',
      maximum: 100,
      tooLong: 'was too long?',
    },
  },
  email: {
    presence: true,
    email: true,
    length: {
      maximum: 100,
      tooLong: 'was too long?',
    },
  },
  bucket: {
    presence: true,
    IsAlphaNumeric: true,
    length: {
      maximum: 100,
      tooLong: 'name was too long?',
    },
  },
};

export default ValidRegister;
