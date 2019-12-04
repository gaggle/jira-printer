import { MockedParsedJiraBasicAuth, ParsedJiraBasicAuth } from 'simple-jira-client';
import {
  ParsedEpic as JiraEpic,
  ParsedIssue as JiraIssue,
  ParsedStory as JiraStory,
} from 'simple-jira-client/build/types/ParsedIssue';
import { Pingable, SimpleJiraClient } from 'simple-jira-client/src/types/index';
import { Issue } from '../types/api-get-issues';

let client: SimpleJiraClient<JiraIssue, void> & Pingable | null;

export function init(url: string, user: string, token: string, debug: boolean = false) {
  if (debug) {
    console.log(`Mock Jira inited for '${url}' using credentials: ${user}/${token}`);
  }
  const JiraClientClass = debug ? MockedParsedJiraBasicAuth : ParsedJiraBasicAuth;
  client = new JiraClientClass(url, { user, token });
}

export async function getIssues(issueKeys: string[]): Promise<Issue[]> {
  if (!client) {
    throw new Error('Must init first');
  }

  const result: Issue[] = [];
  for (const key of issueKeys) {
    console.log('Getting Jira issue', key);
    const issue: JiraIssue = await client.getIssue(key);
    switch (issue.issuetype.name) {
      case 'Epic':
        result.push({ type: 'Epic', issue: issue as JiraEpic });
        break;
      case 'Story':
        const epic = issue.epicKey ? await client.getIssue(issue.epicKey) as JiraEpic : undefined;
        result.push({ type: 'Story', issue: issue as JiraStory, epic });
        break;
    }
  }
  return result;
}

export async function ping(): Promise<boolean> {
  if (!client) {
    throw new Error('Must init first');
  }
  return client.ping();
}
