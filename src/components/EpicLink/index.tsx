import React from 'react';

import './index.css';

export function EpicLink(props: { children: React.ReactNode }) {

  return <div className="epic-link">{props.children}</div>;
}
