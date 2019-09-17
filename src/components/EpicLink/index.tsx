import classnames from 'classnames';
import React from 'react';

import style from './index.module.css';

export function EpicLink(props: { children: React.ReactNode; className?: string; }) {
  return <p className={classnames(style['epic-link'], props.className)}>{props.children}</p>;
}
