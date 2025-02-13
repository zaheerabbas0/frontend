import React from 'react';
import RowSLA from '../../../../assets/RowSLA.svg';
import '../TicketDetail.css';
import { GrayHeading, Subtitle } from '../../../../components/ui/typography';

const SLAsSection = ({
  userType = '',
  requestType,
  category,
  timeCovered,
  timeRemaining,
}) => {
  // const [userLevel, responseTime] = userType.split(" - ");
  const extractCoveredHours = timeCovered?.split(' hours')[0];
  const extractRemaingHours = timeRemaining?.split(' hours')[0];

  return (
    <div className="ticket-detail-pading">
      <div className="ticket-detail-align">
        <img alt="" src={RowSLA} />
        <Subtitle>SLAs</Subtitle>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 25px 0px 25px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <GrayHeading>Time Covered:</GrayHeading>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bolder',
              lineHeight: '14.22px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                background: '#72D8761A',
                color: '#229849',
                padding: '5px',
                borderRadius: '10px',
              }}
            >
              {extractCoveredHours ? `${extractCoveredHours} hr` : 'N/A'}
            </span>
          </div>
          {/* <GrayHeading>Time to respond:</GrayHeading>
          <div
            style={{
              weight: "500",

              fontSize: "12px",
              lineHeight: "14.22px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {userLevel} -<GrayHeading marginbtn="0">{responseTime}</GrayHeading>
          </div> */}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <GrayHeading>Time Remaing:</GrayHeading>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 'bolder',
              lineHeight: '14.22px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                background: '#D8727D1A',
                color: '#EB5757',
                padding: '5px',
                borderRadius: '10px',
              }}
            >
              {extractRemaingHours ? `${extractRemaingHours} hr` : 'N/A'}
            </span>
          </div>
          {/* <GrayHeading>Request Type:</GrayHeading>

          <div>{requestType}</div> */}
        </div>
      </div>
      <div style={{ padding: '20px 0px 0px 25px' }}>
        {/* <GrayHeading>Category:</GrayHeading>
        <div>{category}</div> */}
      </div>
    </div>
  );
};

export default SLAsSection;
