export const REGEX = {
    USER_NAME: '/^[a-zA-Z ]+$/',
    EMAIL: '/^[^\s@]+@[^\s@]+\.[^\s@]+$/',
  };
  
  export const emailValidation = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && lengthValidation(email);
  };
  
  export const phoneNumberValidation = (phoneNumber) => {
    return phoneNumber.length === 10;
  };
  export const nameValidation = (name) => {
    return /^[a-zA-Z ]+$/.test(name) && lengthValidation(name);
  };
  
  export const lengthValidation = (value) => {
    return value.length !== 0;
  };