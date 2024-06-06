import { TextField } from '@mui/material';
import React from 'react';

export default function TextInput({ 
  id, 
  label, 
  type = '', 
  placeholder = '', 
  className = 'w-100', 
  name, 
  readonly, 
  value, 
  disabled, 
  onChange = () => {},
  ...rest 
}) {
  return (
    <>
      <input id={id} type={type} value={value} onChange={onChange} name={name} {...rest} className={`${className} theme--input text-capitalize`} placeholder={placeholder} />
    </>
  );
}
