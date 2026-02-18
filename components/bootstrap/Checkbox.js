import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ checked, onChange, ...props }) => {
  return (
    <Form.Check
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};

export default Checkbox;