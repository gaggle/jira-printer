import classnames from 'classnames';
import React, { CSSProperties } from 'react';
import style from './index.module.css';

export function StartStopBlock(props: { style: CSSProperties, className?: string }) {
  return <table className={classnames(style['start-stop'], props.className)} style={props.style}>
    <tbody>
    <tr>
      <td>Start</td>
      <td>/</td>
    </tr>
    <tr>
      <td>Stop</td>
      <td>/</td>
    </tr>
    </tbody>
  </table>;
}
