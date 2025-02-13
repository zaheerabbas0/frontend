import React from 'react';
import { Tag } from 'antd';
import BackIcon from '../../../../assets/BackIcon.svg';
import '../TicketDetail.css';

const TicketDetailsHeader = ({ ticket, navigate }) => (
  <div className="ticket-detail-pading">
    <div className="left-top">
      <div className="ticket-detail-align">
        <img
          style={{ cursor: 'pointer' }}
          alt=""
          src={BackIcon}
          onClick={() => navigate(-1, { state: null })}
        />
        <span>
          <h2 className="subject-text">{ticket.subject}</h2>
        </span>
      </div>
      <Tag className="detail-id-tag">ID # {ticket.id}</Tag>
    </div>
  </div>
);

export default TicketDetailsHeader;
