import React from 'react';

import classnames from 'classnames';
import style from './index.module.css';

export function IssueNumber(props: { children: React.ReactNode; className?: string }) {
  return <h2 className={classnames(style['issue-number'], props.className)}>{props.children}</h2>;
}
