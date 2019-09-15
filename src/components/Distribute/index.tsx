import React from 'react';

import './index.css';

export function Distribute(props: { children: React.ReactNode }) {
  return <div className="distribute">
    <div data-note="intermediary wrapper">
      {props.children}
    </div>
  </div>;
}

export function DistributeEl(props: { center?: boolean, grow?: boolean, children?: React.ReactNode }) {
  const center: string = props.center ? ' center' : '';
  const grow: string = props.grow ? ' grow' : '';
  return <div className={`distribute-element${grow}${center}`}>{props.children}</div>;
}
