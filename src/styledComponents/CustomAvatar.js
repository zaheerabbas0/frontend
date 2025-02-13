import React from 'react';
import styled from 'styled-components';
import { Avatar as AntAvatar, Tooltip } from 'antd';
import { capitalizeInitials, userNameBgColor } from '../utils/Utils';

const StyledAvatar = styled(AntAvatar)`
  &&& {
    background-color: ${(props) =>
      props.name ? userNameBgColor(props.name) : undefined};
    color: #fff;
    margin-right: 2px;
    border: ${(props) => (props.image_url ? '2px solid #379B47' : undefined)};
  }
`;

const getInitials = (name) => {
  if (!name) return '';
  const formattedName = capitalizeInitials(name);
  return formattedName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};
const CustomAvatar = ({
  name,
  image_url,
  size,
  showTooltip = true,
  fontSize = '14px',
  ...rest
}) =>
  showTooltip ? (
    <Tooltip title={name}>
      {image_url ? (
        <StyledAvatar
          style={{ borderColor: 'green' }}
          size={size}
          src={image_url}
          alt={name}
          {...rest}
        />
      ) : (
        <StyledAvatar
          size={size}
          style={{
            backgroundColor: userNameBgColor(name),
            color: '#fff',
            fontSize: fontSize,
          }}
          {...rest}
        >
          {getInitials(name)}
        </StyledAvatar>
      )}
    </Tooltip>
  ) : image_url ? (
    <StyledAvatar size={size} src={image_url} alt={name} {...rest} />
  ) : (
    <StyledAvatar
      size={size}
      style={{
        backgroundColor: userNameBgColor(name),
        color: '#fff',
        fontSize: fontSize,
      }}
      {...rest}
    >
      {getInitials(name)}
    </StyledAvatar>
  );

export default CustomAvatar;
