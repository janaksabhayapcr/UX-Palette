import React from 'react';
import DatePicker from 'react-datepicker';

export default function ThemeDatePicker(props) {
  const { id, name, value, onChange = () => {}, className = '', placeholder = 'Select Date', ...rest } = props;

  return (
    <DatePicker
      selected={value}
      name={name}
      className={`${className} theme--datepicker text-capitalize border-0 outline-0`}
      placeholderText={placeholder}
      {...rest}
      onChange={(date) => {
        onChange({
          target: {
            name,
            value: date,
          },
        });
      }}
    />
  );
}
