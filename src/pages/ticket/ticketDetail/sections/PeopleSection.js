import React from 'react';
import RowPeople from '../../../../assets/RowPeople.svg';
import { GrayHeading, Subtitle } from '../../../../components/ui/typography';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';

const PeopleSection = ({ assignedBy, assignees }) => (
  <div className="ticket-detail-pading" style={{ paddingTop: '10px' }}>
    <div className="ticket-detail-align">
      <img alt="" src={RowPeople} />
      <span>
        <Subtitle>People</Subtitle>
      </span>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 45px 0px 28px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GrayHeading>Assigned By:</GrayHeading>
        <div>
          {/* {assignedBy} */}
          <CustomAvatar
            name={assignedBy}
            image_url={assignedBy?.image_url}
            size="medium"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GrayHeading>Assign To:</GrayHeading>

        <div>
          {assignees && assignees.length > 0 ? (
            assignees.map((c) => (
              <CustomAvatar
                key={c?.id}
                name={c?.name}
                image_url={c?.image_url}
                size="medium"
              />
            ))
          ) : (
            <p style={{ marginTop: '5px' }}>Not assigned yet</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default PeopleSection;
