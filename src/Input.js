import React, { useState } from 'react';

function useValue(initialValue = 'initialValue') {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => { setValue(e.target.value); }
  }
}

const Input = (props) => {
  const value = useValue(props.initialValue);
  return <input {...value} />;
};

export default Input;
