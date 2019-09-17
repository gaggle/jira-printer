import * as React from 'react';

import style from './index.module.css';

export function Switcher(props: { children: React.ReactNode }) {
  return <div className={style.switcher}>
    <div>
      {props.children}
    </div>
  </div>;
}
