import * as React from 'react';

import './index.css';

export function Stack(props: { children?: React.ReactNode }) {
  return <div className="stack">
    {props.children}
  </div>;
}
