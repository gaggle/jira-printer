import React from 'react';

import './index.css';

export function Description(props: { children: React.ReactNode }) {
  return <div className="description">{props.children}</div>;
}
