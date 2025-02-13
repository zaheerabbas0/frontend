import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivityHistoryIcon from '../../../../assets/ActivityHistoryIcon.svg';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import dayjs from 'dayjs';
import { renderStatusTag } from '../../../../utils/Utils';
import CustomSpin from '../../../../styledComponents/CustomSpin';

const TicketActivity = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activityHistory, setActivityHistory] = useState([]);

  useEffect(() => {
    if (id) {
      AxiosInstance.get(`/api/v1/ticket/get-ticket-with-history/${id}`)
        .then((response) => {
          setActivityHistory(response?.data?.history || []);
        })
        .catch((error) => {
          console.error('Error fetching activity:', error);
          setActivityHistory([]);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <CustomSpin spinning={loading}>
      <div style={{ maxHeight: '20vw', overflowY: 'auto' }}>
        {activityHistory.length > 0 ? (
          activityHistory.map((activity, index) => (
            <div style={{ display: 'flex', marginBottom: '16px' }} key={index}>
              <div>
                <img src={ActivityHistoryIcon} alt="Activity Icon" />
              </div>
              <div style={{ marginLeft: '8px' }}>
                <div>
                  {activity.days_ago} on{' '}
                  {dayjs(activity.update_time).format('DD/MM/YYYY')}
                </div>
                <div>{dayjs(activity.update_time).format('HH:mm A')}</div>
                <div>Status: {renderStatusTag(activity.status)}</div>
                <div>Assignee: {activity.updated_by}</div>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '10px',
            }}
          >
            No activity yet
          </div>
        )}
      </div>
    </CustomSpin>
  );
};

export default TicketActivity;
