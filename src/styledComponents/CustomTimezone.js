import { useTimezoneSelect, allTimezones } from 'react-timezone-select';
import CustomSelect from './CustomSelect';
import { Select } from 'antd';

const labelStyle = 'original';
const timezones = { ...allTimezones };

const CustomTimezone = ({ onChange, selectedTimezone }) => {
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle,
    timezones,
  });

  const handleChange = (value) => {
    if (value) {
      onChange(parseTimezone(value));
    }
  };

  // const defaultTimezone = options.length > 0 ? options[0].value : 'UTC';

  return (
    <CustomSelect
      value={
        selectedTimezone
        // || defaultTimezone
      }
      onChange={handleChange}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </CustomSelect>
  );
};

export default CustomTimezone;
