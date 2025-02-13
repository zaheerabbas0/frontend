import React from 'react';
import { Card } from 'antd';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import { CardTitle } from '../ui/typography';
import styles from './DetailsPage.module.css';

const TicketsSummary = ({
  title = 'Tickets Summary',
  tickets = [],
  onCardClick,
  renderStatusTag,
  renderIdTag,
  renderPriorityTag,
}) => {
  return (
    <Card className={styles.ticket_summary}>
      <CardTitle>{title}</CardTitle>
      {tickets.length ? (
        <div className={styles.ticket_scrollable}>
          {tickets.map((ticket) => (
            <Card
              className={styles.ticket_detail}
              key={ticket.id}
              onClick={() => onCardClick(ticket.id)}
            >
              <div className={styles.ticket_info}>
                <h4>{ticket?.subject || ''}</h4>
                <div className={styles.id_status}>
                  {ticket?.status ? renderStatusTag(ticket.status) : ''}
                  {ticket?.id ? renderIdTag(ticket.id) : ''}
                </div>
              </div>
              <div className={styles.ticket_description}>
                {ticket?.description || ''}
              </div>
              <div className={styles.ticket_footer}>
                <div className={styles.priority_tag}>
                  <div>
                    {ticket?.priority ? renderPriorityTag(ticket.priority) : ''}
                  </div>
                  <div>{ticket?.sla?.name || ''}</div>
                  <div>{ticket?.category?.name || ''}</div>
                </div>
                <div className={styles.ticket_collab}>
                  {ticket?.assignees?.map((assignee, index) => {
                    const { name, image_url } = assignee;
                    return (
                      <CustomAvatar
                        key={index}
                        name={name}
                        image_url={image_url}
                        size="small"
                        showTooltip
                      />
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.no_summary}>No tickets found</div>
      )}
    </Card>
  );
};

export default TicketsSummary;
