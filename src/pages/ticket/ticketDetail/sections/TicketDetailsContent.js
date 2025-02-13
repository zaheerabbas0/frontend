import React from 'react';
import RowDetail from '../../../../assets/RowDetail.svg';
import RowDescription from '../../../../assets/RowDescription.svg';
import '../TicketDetail.css';
import { Paragraph, Subtitle } from '../../../../components/ui/typography';
import { renderStatusTag, renderTag } from '../../../../utils/Utils';
import ContentWrapper from '../../../../components/contentWrapper';
import { Escalated_Key } from '../../../../constants/FieldOptionConstants';
import {
  Address_Field_Name,
  Region_Field_Name,
} from '../../../../constants/ticket/FieldsLabelsConstants';

const TicketDetailsContent = ({ ticket }) => (
  <div style={{ marginTop: '05px' }}>
    <div className="ticket-detail-align">
      <img alt="" src={RowDetail} />
      <Subtitle>Details</Subtitle>
    </div>
    <div
      style={{
        display: 'flex',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '20px',
        }}
      >
        <div>Priority: {renderTag(ticket?.sla)}</div>
        <div>
          {' '}
          {`${Address_Field_Name}:`} {ticket?.ticket_address || 'N/A'}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '20px',
        }}
      >
        <div>
          Status:{' '}
          {ticket?.is_escalated
            ? renderStatusTag(Escalated_Key)
            : renderStatusTag(ticket.status)}
        </div>
        <div>City: {ticket.city || 'N/A'}</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '20px',
        }}
      >
        <div>
          Tags:
          {ticket?.tags?.length > 0 ? (
            ticket.tags.map((tag, index) => renderTag(tag))
          ) : (
            <span style={{ marginLeft: '5px' }}>N/A</span>
          )}
        </div>
        <div>
          {`${Region_Field_Name}:`} {ticket.region || 'N/A'}
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '20px',
      }}
    >
      <div>Timezone: {ticket.time_zone || 'N/A'}</div>
    </div>
    <div className="ticket-detail-pading" style={{ margin: '20px 0px' }}>
      <div className="ticket-detail-pading">
        <div style={{ paddingBottom: '4px' }} className="ticket-detail-align">
          <img alt="" src={RowDescription} />
          <Subtitle>Description</Subtitle>
        </div>
        <ContentWrapper contentLength={ticket.description.length}>
          <Paragraph>{ticket.description}</Paragraph>
        </ContentWrapper>
      </div>
    </div>
  </div>
);

export default TicketDetailsContent;
