import React from 'react';

import './index.css';

export function IssueNumber(props: { children: React.ReactNode }) {
  return <div className="issue-number">{props.children}</div>;
}
