import { Row } from 'antd';
import React from 'react';
import BoardCard from './BoardCard';
import CustomBoard from '../../styledComponents/CustomBoard';
import './TicketsBoard.css';
import { KeyToStatusMap } from '../../constants/FieldOptionConstants';

const Board = ({
  data,
  statusKey,
  titleKey,
  navigatePath,
  renderDetail,
  cardStyles,
  onDetailClick,
}) => {
  const predefinedStatuses = [
    { status: 'Open', title: KeyToStatusMap['Open'] },
    { status: 'On Hold', title: 'On Hold' },
    { status: 'Resolved', title: 'Resolved' },
    { status: 'Overdue', title: 'Overdue' },
  ];

  const groupedData = predefinedStatuses.reduce((acc, { status, title }) => {
    acc[status] = {
      status,
      title,
      details: [],
    };
    return acc;
  }, {});

  data.forEach((item) => {
    const status = item[statusKey];
    if (groupedData[status]) {
      groupedData[status].details.push(item);
    }
  });

  return (
    <Row style={{ width: '100%', flexWrap: 'nowrap' }}>
      <CustomBoard>
        {Object.values(groupedData).map((item, index) => (
          <BoardCard
            key={index}
            {...item}
            navigatePath={navigatePath}
            renderDetail={renderDetail}
            cardStyles={cardStyles}
            onDetailClick={onDetailClick}
          />
        ))}
      </CustomBoard>
    </Row>
  );
};

export default Board;
