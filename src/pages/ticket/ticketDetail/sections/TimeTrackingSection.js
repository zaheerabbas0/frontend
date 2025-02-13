import React from 'react';
import TimeTracking from '../../../../assets/RowTimeTracking.svg';
import { Subtitle } from '../../../../components/ui/typography';

const TimeTrackingSection = ({ estimated, remaining }) => (
  <div className="ticket-detail-pading">
    <div className="ticket-detail-align">
      <img alt="" src={TimeTracking} />
      <Subtitle>Time Tracking</Subtitle>
    </div>
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 0px 0px 20px',
          marginBottom: '20px',
        }}
      >
        <div>Estimated:</div>
        <div
          style={{
            background: 'red',
            margin: '0px 10px',
            height: '5px',
            flexGrow: 0.5,
          }}
        />
        <p>2w</p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '3px 0px 0px 20px',
        }}
      >
        <div>Remaining:</div>
        <div
          style={{
            background: '#F2C94C',
            margin: '0px 6px',
            height: '5px',
            flexGrow: 0.5,
          }}
        />
        <p style={{ marginLeft: '5px' }}>6d</p>
      </div>
    </div>
  </div>
);

export default TimeTrackingSection;
