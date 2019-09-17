import classnames from 'classnames';
import React from 'react';
import { Issue } from '../../types/api-get-issues';
import epicImg from './epic.svg';
import style from './index.module.css';
import storyImg from './story.svg';

export function IssueType(props: { type: Issue['type']; className?: string }) {
  function getIssueTypeData(type: typeof props.type): { src: string, title: string } {
    switch (type) {
      case 'Epic':
        return { src: epicImg, title: 'Epic' };
      case 'Story':
        return { src: storyImg, title: 'Story' };
    }
  }

  const { src, title } = getIssueTypeData(props.type);
  return <img
    alt={`Issue type: ${title}`}
    className={classnames(style['issue-icon'], props.className)}
    src={src}
    title={title}
  />;
}
