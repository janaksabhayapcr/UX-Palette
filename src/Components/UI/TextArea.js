import React from 'react';

export default function TextArea(props) {
  const { id, label, type = 'type', placeholder = '', className = '', name, readonly, value, disabled, onChange, ...rest } = props;
  return (
    <>
      <textarea className={`${className} theme--textarea text-capitalize`} placeholder={placeholder} onChange={onChange} name={name} {...rest} />
    </>
  );
}
