import { ParsedEpic, ParsedStory } from 'simple-jira-client/build/types/ParsedIssue';

export interface Request {
  headers: { cookie?: string; };
  query: { q: string };
}

export interface ResponseOk {
  items: Issue[];
  total: number;
}

export type Issue = EpicIssue | StoryIssue;

export interface StoryIssue {
  type: 'Story';
  issue: ParsedStory;
  epic?: ParsedEpic;
}

export interface EpicIssue {
  type: 'Epic';
  issue: ParsedEpic;
  stories?: ParsedStory[];
}
