import React from 'react';
import style from './index.module.css';

export interface CheckboxFieldProps {
  id: string;
  title: React.ReactNode;
  checked?: boolean;
  // className?: string;
  description?: React.ReactNode;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  required?: boolean;
}

export function CheckboxField(props: CheckboxFieldProps) {
  return <div className={style.field}>
    <label htmlFor="save">
      <span>{props.title}</span>
      <span className={style['checkmark-group']}>
          <input
            checked={props.checked}
            id={props.id}
            name={props.id}
            onChange={props.onChange}
            required={props.required}
            type="checkbox"
          />
          <span className={style.checkmark} tabIndex={0}/>
        </span>
      <small>{props.description}</small>
    </label>
  </div>;
}
