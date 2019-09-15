import React, { CSSProperties } from 'react';

import './index.css';

export function StartStopBlock(props: { style: CSSProperties }) {
  return <table className="start-stop" style={props.style}>
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
