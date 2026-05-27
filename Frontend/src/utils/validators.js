/**
 * Form validation rules and helpers
 */

export const validators = {
  email: (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain number';
    return null;
  },

  confirmPassword: (value, password) => {
    if (!value) return 'Confirm password is required';
    if (value !== password) return 'Passwords do not match';
    return null;
  },

  name: (value) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    if (value.length > 100) return 'Name must be less than 100 characters';
    return null;
  },

  phone: (value) => {
    if (!value) return 'Phone number is required';
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value.replace(/\D/g, ''))
      ? null
      : 'Phone must be 10 digits';
  },

  address: (value) => {
    if (!value) return 'Address is required';
    if (value.length < 5) return 'Address must be at least 5 characters';
    if (value.length > 500) return 'Address must be less than 500 characters';
    return null;
  },

  pincode: (value) => {
    if (!value) return 'Pincode is required';
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(value) ? null : 'Pincode must be 6 digits';
  },

  city: (value) => {
    if (!value) return 'City is required';
    if (value.length < 2) return 'City must be at least 2 characters';
    return null;
  },

  state: (value) => {
    if (!value) return 'State is required';
    if (value.length < 2) return 'State must be at least 2 characters';
    return null;
  },

  cardNumber: (value) => {
    if (!value) return 'Card number is required';
    const cardRegex = /^[0-9]{13,19}$/;
    return cardRegex.test(value.replace(/\s/g, ''))
      ? null
      : 'Invalid card number';
  },

  cvv: (value) => {
    if (!value) return 'CVV is required';
    const cvvRegex = /^[0-9]{3,4}$/;
    return cvvRegex.test(value) ? null : 'CVV must be 3 or 4 digits';
  },

  minPrice: (value, maxPrice) => {
    if (!value) return null;
    if (isNaN(value)) return 'Must be a number';
    if (maxPrice && Number(value) > Number(maxPrice))
      return 'Min price cannot be greater than max price';
    return null;
  },

  maxPrice: (value, minPrice) => {
    if (!value) return null;
    if (isNaN(value)) return 'Must be a number';
    if (minPrice && Number(value) < Number(minPrice))
      return 'Max price cannot be less than min price';
    return null;
  },

  quantity: (value) => {
    if (!value) return 'Quantity is required';
    if (isNaN(value) || Number(value) < 1)
      return 'Quantity must be at least 1';
    if (!Number.isInteger(Number(value))) return 'Quantity must be whole number';
    return null;
  },

  rating: (value) => {
    if (!value) return null;
    if (isNaN(value) || Number(value) < 0 || Number(value) > 5)
      return 'Rating must be between 0 and 5';
    return null;
  },

  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },
};

/**
 * Validate form field
 * @param {string} fieldName - Field name to validate
 * @param {*} value - Field value
 * @param {*} relatedValue - Related value (for password confirmation, etc)
 * @returns {string|null} Error message or null
 */
export const validateField = (fieldName, value, relatedValue) => {
  const validator = validators[fieldName];
  if (validator) {
    return validator(value, relatedValue);
  }
  return null;
};

/**
 * Validate all form fields
 * @param {object} formData - Form data object
 * @param {object} schema - Validation schema
 * @returns {object} Errors object
 */
export const validateForm = (formData, schema) => {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const error = validators[schema[field]](
      formData[field],
      formData
    );
    if (error) errors[field] = error;
  });
  return errors;
};
