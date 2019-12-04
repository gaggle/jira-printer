import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';

import { Card } from '../components/Card/index';
import { ContentBox } from '../components/ContentBox/index';
import { Distribute, DistributeEl } from '../components/Distribute/index';
import { EpicLink } from '../components/EpicLink/index';
import { Grid } from '../components/Grid';
import { IssueNumber } from '../components/IssueNumber/index';
import { IssueType } from '../components/IssueType/index';
import { Markdown } from '../components/Markdown/index';
import { SearchField } from '../components/SearchField/index';
import { Stack } from '../components/Stack/index';
import { StartStopBlock } from '../components/StartStopBlock/index';
import { useJsonFetch } from '../hooks/use-json-fetch';
import { Routing } from '../lib/routing';
import { EpicIssue, Issue, ResponseOk, StoryIssue } from '../types/api-get-issues';
import { PageProps } from '../types/pages';
import './Issue.css';

function EpicCard(props: { item: EpicIssue }) {
  const { type, issue } = props.item;

  return <Card className="card story">
    <Stack>
      <h1><EpicLink className="epic-short-name">{issue.epicName}</EpicLink></h1>
      <h2>{issue.summary}</h2>
      {issue.description && <ContentBox><Markdown text={issue.description}/></ContentBox>}

      <Distribute>
        <DistributeEl><IssueType className="issue-type" type={type}/></DistributeEl>
        <DistributeEl center={true}><IssueNumber className="key">{issue.key}</IssueNumber></DistributeEl>
        <DistributeEl center={true}>
          <StartStopBlock className="start-stop" style={{ paddingLeft: '1em' }}/>
        </DistributeEl>
      </Distribute>
    </Stack>
  </Card>;
}

function StoryCard(props: { item: StoryIssue }) {
  const { type, issue, epic } = props.item;
  return <Card className="card story">
    <Stack>
      <h1>{issue.summary}</h1>
      {issue.description && <ContentBox><Markdown text={issue.description}/></ContentBox>}
      {
        epic && epic.epicName &&
        <h2><EpicLink className="epic-short-name">{`${epic.key} ${epic.epicName}`}</EpicLink></h2>
      }
      <Distribute>
        <DistributeEl><IssueType className="issue-type" type={type}/></DistributeEl>
        <DistributeEl center={true}><IssueNumber className="key">{issue.key}</IssueNumber></DistributeEl>
        <DistributeEl center={true}>
          <StartStopBlock className="start-stop" style={{ paddingLeft: '1em' }}/>
        </DistributeEl>
      </Distribute>
    </Stack>
  </Card>;
}

export function Issues(props: PageProps): JSX.Element {
  const q = new URLSearchParams(props.location.search).get('q');
  if (!q) {
    return <WithSearchField/>;
  }
  const fetched = useJsonFetch<ResponseOk>(`/api/get-issues?q=${q}`);

  switch (fetched.mode) {
    case 'loading':
      return <div>Loading!</div>;
    case 'ok':
      return <Grid>
        {fetched.data.items.map((item: Issue, i) => {
          switch (item.type) {
            case 'Epic':
              return <EpicCard item={item} key={i}/>;
            case 'Story':
              return <StoryCard item={item} key={i}/>;
          }
        })}
      </Grid>;
    case 'error':
      switch (fetched.status) {
        case 401:
          return <Redirect to={Routing.login.path}/>;
        case 404:
          return <div>404 Issue not found or no permission to see it</div>;
        default:
          return <div>
            <pre>{JSON.stringify({ fetched }, null, 2)}</pre>
          </div>;
      }
  }
}

function WithSearchField() {
  const [searched, setSearched] = useState<string[]>([]);

  function onSearch(value: string) {
    const values = value.split(' ').map((e) => e.trim()).filter((e) => !!e);
    setSearched(values);
  }

  if (searched.length) {
    return <Redirect to={`${Routing.issues.path}?q=${searched.join(',')}`}/>;
  }

  return <>
    <SearchField onSearch={onSearch}/>
  </>;
}
