import React from 'react';
import { Tag } from 'antd';
import { FlagOutlined, TagsOutlined } from '@ant-design/icons';
import {
  Escalated_Key,
  KeyToStatusMap,
  Pending_Approval_Key,
  // PriorityConstants,
} from '../constants/FieldOptionConstants';

export const dateFormat = 'DD-MM-YY HH:mm:ss';

export const projectColorMap = {
  'Project A': { bgColor: 'grey', textColor: 'white' },
  DCD: { bgColor: '#E9F0FE', textColor: '#3538CD' },
  MapX: { bgColor: '#ECF9F3', textColor: '#3FAE7A' },
  MonetX: { bgColor: '#EFFAE4', textColor: '#229849' },
  DCS: { bgColor: '#EFF8FF', textColor: '#175CD3' },
  SupportX: { bgColor: '#EFFAE4', textColor: '#229849' },
};

export const noWhitespaceValidator = (field) => (_, value) => {
  if (value && value.trim() === '') {
    return Promise.reject(new Error(`${field} cannot be empty.`));
  }
  return Promise.resolve();
};

export const renderProjects = (project) => {
  const projectName = typeof project === 'object' ? project.name : project;
  const { bgColor, textColor } = projectColorMap[projectName] || {
    bgColor: 'black',
    textColor: 'white',
  };

  return (
    <Tag style={{ backgroundColor: bgColor, color: textColor, border: 'none' }}>
      {projectName}
    </Tag>
  );
};

export const renderIdTag = (id) => (
  <Tag
    style={{
      background: ' #ededed',
      fontSize: '10px',
      fontWeight: 'bold',
      padding: '0px 2px ',
    }}
  >
    ID #{id}
  </Tag>
);

export const capitalizeInitials = (name) => {
  if (typeof name !== 'string' || !name.trim()) {
    return '';
  }

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const userNameBgColor = (text) => {
  if (typeof text !== 'string') {
    return '#FFFFFF';
  }

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  const brightness =
    (parseInt(color.substring(1, 3), 16) +
      parseInt(color.substring(3, 5), 16) +
      parseInt(color.substring(5, 7), 16)) /
    3;
  const threshold = 128;
  if (brightness < threshold) {
    const darkenAmount = threshold - brightness;
    color = color?.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (r, g, b) =>
        '#' +
        Math.min(255, parseInt(r, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0') +
        Math.min(255, parseInt(g, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0') +
        Math.min(255, parseInt(b, 16) + darkenAmount)
          .toString(16)
          .padStart(2, '0')
    );
  }
  return color;
};

export const convertImageToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      } catch (error) {
        reject(
          new Error('Error while processing image on canvas: ' + error.message)
        );
      }
    };

    img.onerror = (error) => {
      reject(
        new Error(
          `Failed to load image from URL: ${url}. Error: ${error.message}`
        )
      );
    };

    img.src = url;
  });
};

export const getStatusStyles = (status) => {
  switch (status) {
    case 'Active':
      return {
        color: statusColorMap['Active'],
        backgroundColor: statusBgColorMap['Active'],
        borderRadius: '4px',
      };
    case 'In Active':
      return {
        color: statusColorMap['In Active'],
        backgroundColor: statusBgColorMap['In Active'],
        borderRadius: '4px',
      };
    case 'Open':
      return {
        color: statusColorMap['Open'],
        backgroundColor: statusBgColorMap['Open'],
        borderRadius: '4px',
      };
    case 'In Progress':
      return {
        color: statusColorMap['In Progress'],
        backgroundColor: statusBgColorMap['In Progress'],
        borderRadius: '4px',
      };
    case 'Resolved':
      return {
        color: statusColorMap['Resolved'],
        backgroundColor: statusBgColorMap['Resolved'],
        borderRadius: '4px',
      };
    case 'On Hold':
      return {
        color: statusColorMap['On Hold'],
        backgroundColor: statusBgColorMap['On Hold'],
        borderRadius: '4px',
      };
    case 'Scheduled':
      return {
        color: statusColorMap['Scheduled'],
        backgroundColor: statusBgColorMap['Scheduled'],
        borderRadius: '4px',
      };

    default:
      return { color: 'gray', backgroundColor: '#F5F5F5', borderRadius: '4px' };
  }
};

export const statusBgColorMap = {
  Pending: '#EFF5FF',
  Open: '#EFF5FF',
  Active: '#E8F5E9',
  Resolved: '#E8F5E9',
  Overdue: '#FF0000',
  [Escalated_Key]: '#FCF1F2',
  [Pending_Approval_Key]: '#FCF1F2',
  Scheduled: '#FFFCD5',
  'On Hold': '#FFEDDE',
  'In Active': '#FFEBEE',
  'In Progress': '#FFFDE7',
  Violated: '#FFEBEE',
  'Non Violated': '#E8F5E9',
};

export const statusColorMap = {
  // Pending: '#5030E5',
  Open: '#5030E5',
  Active: '#008000',
  Resolved: '#008000',
  Overdue: '#FFFFFF',
  [Escalated_Key]: '#D95C41',
  [Pending_Approval_Key]: '#D95C41',
  Scheduled: '#FF9E16',
  'On Hold': '#F2994A',
  'In Active': '#FF0000',
  'In Progress': '#E1D080',
  Violated: '#FF0000',
  'Non Violated': '#008000',
};

export const renderStatusTag = (status) => {
  if (!status) {
    status = 'N/A';
  }
  const bgColor = statusBgColorMap[status];
  const textColor = statusColorMap[status];
  const border = lightenColor(textColor, 20);

  return (
    <Tag
      style={{
        border: `1px solid ${border}`,
        color: textColor,
        background: bgColor || '#fff',
        fontWeight: 'bold',
        borderRadius: '4px',
      }}
    >
      • {KeyToStatusMap[status] || status}
    </Tag>
  );
};

const lightenColor = (color, percent) => {
  const num = parseInt(color?.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export const renderTag = (tag) => {
  const defaultColor = '#185c0f';
  // const backgroundColor = lightenColor(tag?.hex_code || defaultColor, 80);
  const border = lightenColor(tag?.hex_code || defaultColor, 20);

  return (
    <Tag
      style={{
        border: `1px solid ${border}`,
        color: tag?.hex_code || defaultColor,
        fontWeight: 'bold',
      }}
    >
      <TagsOutlined /> {tag?.name || 'N/A'}
    </Tag>
  );
};

export const renderPriorityTag = (priority) => {
  const defaultColor = '#185c0f';
  // const backgroundColor = lightenColor(priority?.hex_code || defaultColor, 20);
  const border = lightenColor(priority?.hex_code || defaultColor, 20);

  return (
    <Tag
      style={{
        border: `1px solid ${border}`,
        color: priority?.hex_code || defaultColor,
        fontWeight: 'bold',
        backgroundColor: 'white !important',
      }}
    >
      <FlagOutlined /> {priority?.name || 'N/A'}
    </Tag>
  );
};

export const passwordRules = [
  { required: true, message: 'Please input Password!' },
  { min: 8, message: 'Password must be at least 8 characters long!' },
  {
    validator: (_, value) => {
      if (!value) return Promise.resolve();

      const passwordCriteria = [
        { regex: /[A-Z]/, message: 'uppercase' },
        { regex: /[a-z]/, message: 'lowercase' },
        { regex: /\d/, message: 'number' },
        { regex: /[@$!%*?&]/, message: 'special character' },
      ];

      const errors = passwordCriteria
        .filter((criterion) => !criterion.regex.test(value))
        .map((criterion) => criterion.message);

      if (errors.length > 0) {
        return Promise.reject(new Error(`At least one ${errors.join(', ')}!`));
      }

      return Promise.resolve();
    },
  },
];
