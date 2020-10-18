const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export default function useServerError(error) {
  const hasServerError = () => hasOwnProperty(error, 'response');

  const isValidationError = () => hasServerError
    && hasOwnProperty(error.response, 'status')
    && error.response.status === 422;

  const isThrottleError = () => hasServerError
    && hasOwnProperty(error.response, 'status')
    && error.response.status === 429;

  const hasErrorMessage = () => hasServerError
    && hasOwnProperty(error.response, 'data')
    && hasOwnProperty(error.response.data, 'message');

  const hasErrors = () => hasServerError
    && hasOwnProperty(error.response, 'data')
    && hasOwnProperty(error.response.data, 'errors')
    && Object.keys(error.response.data.errors).length > 0;

  const hasError = (key) => {
    if (!hasErrors) {
      return false;
    }

    return hasOwnProperty(error.response.data.errors, key);
  };

  const getErrorMessage = () => {
    if (!hasErrorMessage) {
      return '';
    }

    return error.response.data.message;
  };

  const getErrors = () => {
    if (
      !hasErrors()
    ) {
      return {};
    }

    return error.response.data.errors;
  };

  const getFirstErrors = () => {
    const errors = getErrors();
    return Object.keys(errors).reduce((carry, field) => ({
      ...carry,
      [field]: errors[field][0],
    }), {});
  };

  return {
    hasServerError,
    isValidationError,
    isThrottleError,
    hasErrorMessage,
    hasErrors,
    hasError,
    getErrorMessage,
    getErrors,
    getFirstErrors,
  };
}
