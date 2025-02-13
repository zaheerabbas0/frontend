const AddNewCustomOption = ({ text, onClick = () => {} }) => {
  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      style={{ padding: '8px' }}
      onClick={onClick}
    >
      <span className="custom-option" style={{ cursor: 'pointer' }}>
        {text}
      </span>
    </div>
  );
};

export default AddNewCustomOption;
