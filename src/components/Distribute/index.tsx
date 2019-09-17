import React from 'react';

import classname from 'classnames';
import style from './index.module.css';

/**
 * Container to distribute children horizontally (suggest to use `DistributeEl` element for children)
 */
export function Distribute(props: { children: React.ReactNode }) {
  return <div className={style.distribute}>
    <div data-note="flex-container">
      {props.children}
    </div>
  </div>;
}

/**
 * Distribute child element
 */
export function DistributeEl(props: { center?: boolean, grow?: boolean, children?: React.ReactNode }) {
  const classes = classname(style['distribute-element'], { center: props.center }, { grow: props.grow });
  return <div className={classes}>{props.children}</div>;
}
