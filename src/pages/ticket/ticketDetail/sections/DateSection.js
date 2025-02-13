import React from 'react';
import dayjs from 'dayjs';
import RowDate from '../../../../assets/RowDate.svg';
import '../TicketDetail.css';
import { Subtitle } from '../../../../components/ui/typography';

const DateSection = ({ creationDate, closedDate }) => {
  const formattedCreationDate = creationDate
    ? dayjs(creationDate).format('DD-MM-YYYY')
    : 'N/A';
  const formattedClosedDate = closedDate
    ? dayjs(closedDate).format('DD-MM-YYYY')
    : 'N/A';

  return (
    <div className="ticket-detail-pading">
      <div className="ticket-detail-align">
        <img alt="" src={RowDate} />
        <Subtitle>Date</Subtitle>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 35px 0px 22px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
        >
          <div>Creation Date:</div>
          <b
            style={{
              color: '#474747',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '118.5%',
            }}
          >
            {formattedCreationDate}
          </b>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
        >
          <div>Due Date:</div>
          <b
            style={{
              color: '#D95C41',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '118.5%',
            }}
          >
            {formattedClosedDate}
          </b>
        </div>
      </div>
    </div>
  );
};

export default DateSection;
