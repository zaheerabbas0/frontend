import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTickets } from '../reduxToolkit/features/TicketSlice';
import { message } from 'antd';
import AxiosInstance from '../appURL/AxiosInstance';

const useIncidentApis = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createIncident = async (formData) => {
    try {
      const response = await AxiosInstance.post(
        '/api/v1/ticket/incident',
        formData
      );
      message.success('Incident created successfully');
      dispatch(fetchTickets());
      navigate('/supportx/tickets');
      return response.data;
    } catch (error) {
      message.error(
        `Error creating incident: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return {
    createIncident,
  };
};
export default useIncidentApis;
