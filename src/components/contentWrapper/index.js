import { useState } from 'react';
import './index.css';

const ContentWrapper = ({
  children,
  maxHeight = '50px',
  contentLength,
  threshold = 120,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const showToggleButton = contentLength > threshold;

  const toggleReadMore = () => {
    setIsCollapsed(!isCollapsed);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={isCollapsed ? { maxHeight, overflow: 'hidden' } : {}}
        className={`${isCollapsed && showToggleButton ? 'collapsed' : ''}`}
      >
        {isCollapsed
          ? truncateText(children.props.children, threshold)
          : children}
        {showToggleButton && (
          <span onClick={toggleReadMore} className="read-more-button">
            {isCollapsed ? '   Read More' : '   Read Less'}
          </span>
        )}
      </div>
    </div>
  );
};

export default ContentWrapper;
