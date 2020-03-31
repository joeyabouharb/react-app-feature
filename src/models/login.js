const ValidLogin = {
  credential: {
    presence: true,
    length: {
      minimum: 1,
      tooShort: 'was not entered',
      maximum: 100,
      tooLong: 'was too long',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 1,
      tooShort: 'was not entered',
      maximum: 100,
      tooLong: 'was too long?',
    },
  },
};

export default ValidLogin;
