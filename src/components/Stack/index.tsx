import React from 'react';

import style from './index.module.css';

export function Stack(props: { children?: React.ReactNode }) {
  return <div className={style.stack}>
    {props.children}
  </div>;
}
