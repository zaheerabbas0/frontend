import React, { useEffect, useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomForm from '../../../styledComponents/CustomForm';
import CustomSpin from '../../../styledComponents/CustomSpin';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import { convertImageToBase64 } from '../../../utils/Utils';
import FormHeader from '../../../components/ui/Form/FormHeader';
import SettingFormFields from './components/SettingFormFields';
import '../Setting.css';
import { handleSettingForm } from '../../../utils/SettingUtils';
import { fetchUserProfile } from '../../../reduxToolkit/features/SettingSlice';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';
import StyledCard from '../../../styledComponents/StyledCard';

const UpdateInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userInfoForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const user = useSelector((state) => state.setting.userInfo);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (id && user) {
      const [gmtOffset, timeZone] = user.time_zone
        ? user.time_zone.match(/\(([^)]+)\)\s(.+)/).slice(1, 3)
        : [null, null];

      GetState(user?.country?.id).then((result) => {
        setStateList(result);
      });

      GetCity(user?.country?.id, user?.state?.id).then((result) => {
        setCityList(result);
      });

      setCountry(user?.country);
      const formattedTimeZone =
        gmtOffset && timeZone
          ? { value: timeZone, label: user.time_zone }
          : undefined;

      userInfoForm.setFieldsValue({
        ...user,
        time_zone: formattedTimeZone,
        password: user.static_password,
        country: user?.country?.name,
        state: user?.state?.name,
        city: user?.city?.name,
      });

      if (user.image_url) {
        setFileList([{ url: user.image_url }]);
        convertImageToBase64(user.image_base64)
          .then((base64) => {
            setBase64Image(base64);
          })
          .catch((error) => {
            console.error('Error converting image to base64:', error);
          });
      }
    } else if (id && !user) {
      dispatch(fetchUserProfile());
    }
  }, [id, user, dispatch, userInfoForm]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
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
        phone: values.phone.toString(),
        time_zone: values?.time_zone ? values.time_zone.label : '',
        image_base64: base64Image ? base64Image : null,
      };

      await handleSettingForm(formData, id, dispatch, navigate);
    } catch (error) {
      console.log('error-->', error);

      message.error(`Error submitting form ${error.response}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSpin spinning={loading}>
      <div style={{ margin: '1vw' }}>
        <StyledCard>
          <Row className="update-info">
            <Col span={24}>
              <FormHeader
                style={{ justifyContent: 'flex-start' }}
                title="Account Settings"
                // id={id}

                showDate={false}
                renderChildrenOnLeft={true}
              />
            </Col>

            <Col span={18}>
              <CustomForm
                form={userInfoForm}
                layout="vertical"
                onFinish={onFinish}
              >
                <Row gutter={[35, 0]}>
                  <SettingFormFields
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
                <CenteredButtonContainer>
                  <CustomButton
                    variant="default"
                    width="120px"
                    type="button"
                    onClick={() => navigate('/supportx/setting')}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    width="120px"
                    marginLeft="35px"
                    htmlType="submit"
                  >
                    Update
                  </CustomButton>
                </CenteredButtonContainer>
              </CustomForm>
            </Col>
          </Row>
        </StyledCard>
      </div>
    </CustomSpin>
  );
};

export default UpdateInfo;
