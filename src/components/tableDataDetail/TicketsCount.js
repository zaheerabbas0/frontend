import React from 'react';
import { Card } from 'antd';
import styles from './DetailsPage.module.css';

const TicketsCount = ({ data, cardConfigurations }) => {
  const cardData = cardConfigurations.map((config) => ({
    title: config.title,
    value: config.calculateValue(data),
  }));

  return (
    <div className={styles.tickets_count}>
      {cardData.map((card, index) => (
        <Card key={index} className={styles.count_card}>
          <p>{card.title}</p>
          <span className={styles.count_value}>{card.value}</span>
        </Card>
      ))}
    </div>
  );
};

export default TicketsCount;
