import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

export default function ThemeRadioGroup({ name, value, options, onChange }) {
  return (
    <div className='dynamic--radio'>
      <RadioGroup row aria-label="position" name={name} value={value} onChange={onChange}>
        {options.map((option, i) => (
          <FormControlLabel
            key={i}
            value={option.value}
            label={option.label}
            labelPlacement={option.labelPlacement || 'start'}
            sx={{ color: '#202020' }}
            control={<Radio color={option.color} sx={{ padding: '5px', color: '#202020' }} />}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
