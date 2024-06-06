import React from 'react';
import { Button } from 'react-bootstrap';

export default function ThemeButton(props) {
  const { size, variant, children, className = '', ...rest } = props;

  return (
    <Button size={size} variant={variant} className={`d-block text-capitalize dynamic--button ${className}`} {...rest}>
      {children}
    </Button>
  );
}
