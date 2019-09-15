import React from 'react';

import './index.css';
import story from './story.svg';

export function IssueType(props: { type: 'story' }) {
  return <img src={story} className="issue-icon" alt={`Issue type: ${props.type}`}/>;
}
