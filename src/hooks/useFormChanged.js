import { useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';

const useFormChanged = () => {
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const checkFormChanged = useCallback(
    (currentValues, image = null, imageKey = 'image_url') => {
      if (
        !isEqual(initialValues, currentValues) ||
        image !== initialValues[imageKey]
      ) {
        setIsFormChanged(true);
      } else {
        setIsFormChanged(false);
      }
    },

    [initialValues]
  );

  const setValues = useCallback((newInitialValues) => {
    setInitialValues(newInitialValues);
  }, []);

  return [setValues, isFormChanged, checkFormChanged, initialValues];
};

export default useFormChanged;
