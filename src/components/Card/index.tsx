import classnames from 'classnames';
import React from 'react';
import style from './index.module.css';

export function Card(props: { children?: React.ReactNode; className?: string; }): JSX.Element {
  return <div className={classnames(style.Card, props.className)}>{props.children}</div>;
}
