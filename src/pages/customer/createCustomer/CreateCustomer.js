import React, { useEffect, useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../reduxToolkit/features/CustomerSlice';
import 'sweetalert2/dist/sweetalert2.min.css';
import CustomForm from '../../../styledComponents/CustomForm';
import { handleCustomerForm } from '../../../utils/CustomerUtils';
import CustomSpin from '../../../styledComponents/CustomSpin';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import CustomerFormFields from './CustomerFieldConfigurations';
import { convertImageToBase64 } from '../../../utils/Utils';
import FormHeader from '../../../components/ui/Form/FormHeader';
import StyledCard from '../../../styledComponents/StyledCard';
import styles from './CreateCustomer.module.css';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import { Customer_Entity_Name } from '../../../constants/customer/TitleRoutesConstants';

const CreateCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [customerForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);

  const customer = useSelector((state) =>
    state.customer.customers.find((customer) => customer.id === parseInt(id))
  );

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (id && customer) {
      GetState(customer?.country?.id).then((result) => {
        setStateList(result);
      });

      GetCity(customer?.country?.id, customer?.state?.id).then((result) => {
        setCityList(result);
      });

      setCountry(customer?.country);

      customerForm.setFieldsValue({
        ...customer,
        country: customer?.country?.name,
        state: customer?.state?.name,
        city: customer?.city?.name,
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
    } else if (id && !customer) {
      dispatch(fetchCustomers());
    }
  }, [id, customer, dispatch, customerForm]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const currentUserId = userData?.id;
      if (!currentUserId) {
        return;
      }
      const formData = {
        ...values,
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
      };
      if (id) {
        await handleCustomerForm({ id, ...formData }, id, dispatch, navigate);
      } else {
        await handleCustomerForm(formData, id, dispatch, navigate);
      }
    } catch (error) {
      message.error(`Error submitting form ${error.response}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '1vw' }}>
      <StyledCard styles={{ minHeight: '38vh' }}>
        <CustomSpin spinning={loading}>
          <Row className={styles.create_customer}>
            <FormHeader
              title={
                id
                  ? `Update ${Customer_Entity_Name}`
                  : `Create ${Customer_Entity_Name}`
              }
              id={id}
              renderChildrenOnLeft
            >
              <span style={{ marginLeft: 'auto' }} />
            </FormHeader>
            <Col span={18}>
              <CustomForm
                layout="vertical"
                form={customerForm}
                onFinish={onFinish}
              >
                <Row gutter={[35, 0]}>
                  <CustomerFormFields
                    countriesList={countriesList}
                    fileList={fileList}
                    setFileList={setFileList}
                    setBase64Image={setBase64Image}
                    GetState={GetState}
                    stateList={stateList}
                    setStateList={setStateList}
                    GetCity={GetCity}
                    cityList={cityList}
                    setCityList={setCityList}
                    country={country}
                    setCountry={setCountry}
                    state={state}
                    setState={setState}
                    city={city}
                    setCity={setCity}
                  />
                </Row>

                <CenteredButtonContainer margin="5.6vw 0px 0px 0px">
                  <CustomButton
                    variant="default"
                    width="120px"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    width="120px"
                    marginLeft="35px"
                    htmlType="submit"
                  >
                    {id ? 'Update' : 'Create'}
                  </CustomButton>
                </CenteredButtonContainer>
              </CustomForm>
            </Col>
          </Row>
        </CustomSpin>
      </StyledCard>
    </div>
  );
};
export default CreateCustomer;
