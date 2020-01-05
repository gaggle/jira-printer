import classnames from 'classnames';
import React from 'react';
import { If } from '../If/index';

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
  return <div className="mb-4">
    <label className="block font-extrabold mb-2" htmlFor={props.id}>
      {props.title}
      <If condition={!!props.required}>
        <span className="text-red-700">*</span>
      </If>
    </label>
    <input
      className={classnames('text-input focus:outline-none focus:shadow-outline', { 'bg-gray-500': props.disabled })}
      id={props.id}
      disabled={props.disabled}
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value || ''}
      required={props.required}
      type="text"
    />
    <p className="text-gray-700"><span className="italic">{props.description}</span>
    </p>
  </div>;
}
