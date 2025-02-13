import React, { useState } from 'react';
import { ColorPicker } from 'antd';

const CustomColorPicker = ({ defaultValue, onChange }) => {
  const [color, setColor] = useState(defaultValue);

  const handleColorChange = (value) => {
    const hexCode = value.toHexString();
    setColor(hexCode);
    if (onChange) {
      onChange(hexCode);
    }
  };

  return (
    <ColorPicker value={color} onChange={handleColorChange} format="hex" />
  );
};

export default CustomColorPicker;
