import React from 'react';

import './index.css';

export function Card(props: { children: React.ReactNode }): JSX.Element {
  return <div className="Card">{props.children}</div>;
}
