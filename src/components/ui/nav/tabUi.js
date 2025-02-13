const TabUI = ({ icon, text, altText, iconStyle = {}, tabClassName = '' }) => (
  <span
    style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
    className={tabClassName}
  >
    <img src={icon} alt={altText} style={iconStyle} />
    <p>{text}</p>
  </span>
);

export default TabUI;
