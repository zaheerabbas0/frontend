import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { DarkColor } from '../styledComponents/CustomColors';

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MoreItems = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: ${DarkColor};
`;

const ShowMoreItems = ({
  items,
  maxVisible = 3,
  moreLabel = '+{remaining} more',
}) => {
  const visibleItems = items.slice(0, maxVisible);
  const remainingItems = items.length - maxVisible;

  const getTooltipContent = () => {
    return items.slice(maxVisible).join(', ');
  };

  return (
    <ItemList>
      {visibleItems.map((item, index) => (
        <div key={index}>
          {item}
          {index < visibleItems.length - 1 && ', '}
        </div>
      ))}
      {remainingItems > 0 && (
        <Tooltip title={getTooltipContent()}>
          <MoreItems>
            {moreLabel.replace('{remaining}', remainingItems)}
          </MoreItems>
        </Tooltip>
      )}
    </ItemList>
  );
};

export default ShowMoreItems;
