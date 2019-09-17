import React from 'react';

interface TextFieldProps {
  id: string;
  title: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  disabled?: boolean;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export function TextField(props: TextFieldProps) {
  return <div className={props.className}>
    <label htmlFor={props.id}>
      <span>{props.title}</span>
      <small>{props.description}</small>
    </label>
    <input
      id={props.id}
      disabled={props.disabled}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value || ''}
      type="text"
    />
  </div>;
}
