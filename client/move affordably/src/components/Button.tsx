import React, { useState } from 'react';

export enum Color {
  'primary',
  'secondary',
  'success',
  'danger',
}

interface Props {
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'light';
  children: string;
  onClick: () => void
}

const Button = ({ color = 'primary', children, onClick }: Props) => {
  const [buttonType, setButtonType] = useState();
  return (
    <div>
      <button
        type="button"
        className={'btn btn-' + color}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
