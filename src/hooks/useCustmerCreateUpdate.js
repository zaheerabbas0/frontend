import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { handleCustomerForm } from '../utils/CustomerUtils';
import { convertImageToBase64 } from '../utils/Utils';
import { useNavigate } from 'react-router-dom';
import {
  EDIT_CUSTOMER,
  PROJECT_BASE_URL,
} from '../pages/projects/createProject/CreateProject';
import { fetchProjects } from '../reduxToolkit/features/ProjectSlice';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';

// const dummyPassword = 'dummyPass@123';
const useCustomerCreateUpdate = ({
  skipStep,
  id,
  NewProjectId,
  customerForm,
  customer,
  setLoading,
  setFileList,
  setBase64Image,
  base64Image,
  mode,
  projectId,
  setValues,
}) => {
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;

  useEffect(() => {
    if (id && mode === EDIT_CUSTOMER && customer) {
      setCountry(customer?.country);
      setCity(customer?.city);
      setState(customer?.state);
      GetState(customer?.country?.id).then((result) => {
        setStateList(result);
      });

      GetCity(customer?.country?.id, customer?.state?.id).then((result) => {
        setCityList(result);
      });

      customerForm.setFieldsValue({
        ...customer,
        country: customer?.country?.id,
        state: customer?.state?.id,
        city: customer?.city?.id,
        // password: dummyPassword,
      });

      if (customer.image_base64) {
        setFileList([{ url: customer.image_base64 }]);
        convertImageToBase64(customer.image_base64)
          .then((base64) => {
            setBase64Image(base64);
          })
          .catch((error) => {
            console.error('Error converting image to base64:', error);
          });
      }
      let valuesForUpdateChecking = {
        city: customer.city?.id,
        country: customer.country?.id,
        email: customer.email,
        name: customer.name,
        image_base64: customer.image_base64,
        phone: customer.phone,
        state: customer.state?.id,
        status: customer.status,
      };
      setValues(valuesForUpdateChecking);
    }
  }, [id, customer, dispatch, customerForm, setFileList, setBase64Image]);

  const onCustomerFinish = async (values) => {
    setLoading(true);
    try {
      if (!currentUserId) {
        throw new Error('Current user ID is not available.');
      }
      const formData = {
        ...values,
        // city: { id: values?.city?.id, name: values?.city?.name },
        // state: { id: values?.state?.id, name: values?.state?.name },
        // country: { id: values?.country?.id, name: values?.country?.name },
        country: {
          id: country?.id ?? null,
          name: country?.name ?? null,
        },
        city: {
          id: city?.id ?? null,
          name: city?.name ?? null,
        },
        state: {
          id: state?.id ?? null,
          name: state?.name ?? null,
        },
        created_by_id: currentUserId,
        image_base64: base64Image ? base64Image : null,
        // password: dummyPassword,
      };
      if (!id) {
        formData.project_ids = Array.isArray(NewProjectId.current)
          ? NewProjectId.current.map((id) => parseInt(id))
          : [parseInt(NewProjectId.current)];
      }
      await handleCustomerForm(formData, id, dispatch, navigate);
      dispatch(fetchProjects());
      !mode
        ? skipStep()
        : navigate(`${PROJECT_BASE_URL}${parseInt(projectId)}`);
    } catch (error) {
      message.error(
        `Error submitting form: ${error.message || error.response}`
      );
    } finally {
      setLoading(false);
    }
  };

  // const onCustomerFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     if (!currentUserId) {
  //       throw new Error("Current user ID is not available.");
  //     }
  //     const formData = {
  //       ...values,
  //       created_by_id: currentUserId,
  //       customer_image_url: base64Image ? base64Image : null,
  //       project_ids: NewProjectId.current,
  //     };
  //     await handleCustomerForm(formData, id, dispatch, navigate);
  //     dispatch(fetchProjects());
  //     !mode
  //       ? skipStep()
  //       : navigate(`${PROJECT_BASE_URL}${parseInt(projectId)}`);
  //   } catch (error) {
  //     message.error(
  //       `Error submitting form: ${error.message || error.response}`
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    onCustomerFinish,
    countriesList,
    stateList,
    setStateList,
    cityList,
    setCityList,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
  };
};

export default useCustomerCreateUpdate;
