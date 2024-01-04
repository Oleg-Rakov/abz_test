export const validateName = (value) => value.length >= 2 && value.length <= 60;

export const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validatePhone = (value) => /^\+380\d{9}$/.test(value);

export const validatePositionId = (value) => !!value;

export const handleChange = (event, setter, errorSetter, validationFn) => {
  const value = event.target.value;
  setter(value);

  const error = validationFn(value);
  errorSetter(error);
};
