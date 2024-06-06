import React from 'react';
import Select from 'react-select';
import { isDefined } from '../Utils/HelperFunctions';

const ReactSelect = ({ label, placeholder = 'Select Option', readonly, className, value, disabled, id, options, defaultValue, isMulti = false, onChange = () => {}, name, ...rest }) => {
  let selectedValues = isDefined(options)
    ? options.find((e) => {
        return value == e.value;
      })
    : [];

  return (
    <>
      <Select
        name={name}
        defaultValue={defaultValue}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        className={className}
        value={selectedValues}
        classNamePrefix="theme--select"
        onChange={(dropdown) => {
          onChange({
            target: {
              name: name,
              value: dropdown.value,
            },
          });
        }}
        {...rest}
      />
    </>
  );
};

export default ReactSelect;
