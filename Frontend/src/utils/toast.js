import React from 'react';
import toast from 'react-hot-toast';

/**
 * Show success toast notification
 * @param {string} message - Toast message
 * @param {object} options - Toast options
 */
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    duration: 1000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Show error toast notification
 * @param {string} message - Toast message
 * @param {object} options - Toast options
 */
export const showError = (message, options = {}) => {
  toast.error(message || 'Something went wrong!', {
    duration: 1000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Show loading toast notification
 * @param {string} message - Toast message
 * @param {object} options - Toast options
 * @returns {string} Toast ID for updating later
 */
export const showLoading = (message = 'Loading...', options = {}) => {
  return toast.loading(message, {
    position: 'top-right',
    ...options,
  });
};

/**
 * Update an existing toast
 * @param {string} id - Toast ID
 * @param {string} message - New message
 * @param {string} type - Toast type (success, error, loading)
 */
export const updateToast = (id, message, type = 'success', options = {}) => {
  const resolveAfter = type === 'loading' ? undefined : 1000;
  // Use React.createElement to avoid JSX parsing issues in .js files
  toast.custom(
    () => React.createElement('div', { className: `toast toast-${type}` }, message),
    {
      id,
      duration: resolveAfter,
      ...options,
    }
  );
};

/**
 * Show info toast notification
 * @param {string} message - Toast message
 * @param {object} options - Toast options
 */
export const showInfo = (message, options = {}) => {
  toast(message, {
    duration: 1000,
    position: 'top-right',
    icon: 'ℹ️',
    ...options,
  });
};

/**
 * Show warning toast notification
 * @param {string} message - Toast message
 * @param {object} options - Toast options
 */
export const showWarning = (message, options = {}) => {
  toast(message, {
    duration: 1000,
    position: 'top-right',
    icon: '⚠️',
    ...options,
  });
};

/**
 * Dismiss specific or all toasts
 * @param {string} id - Toast ID (optional)
 */
export const dismissToast = (id) => {
  if (id) {
    toast.dismiss(id);
  } else {
    toast.dismiss();
  }
};
