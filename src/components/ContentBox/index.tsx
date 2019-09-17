import React from 'react';

import style from './index.module.css';

export function ContentBox(props: { children: React.ReactNode }) {
  return <div className={style.description}>{props.children}</div>;
}
