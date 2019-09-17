import React, { useState } from 'react';
import { parse } from 'url';

import { If } from '../If';
import { TextField } from '../TextField';
import style from './index.module.css';

export interface FormProps {
  onSubmit: (formInputs: FormState) => void;
  action?: string;
  errors?: string[];
  lockedState?: FormState;
}

export interface FormState {
  token?: string;
  url?: string;
  user?: string;
}

export function LoginForm(props: FormProps) {
  const [formState, setFormState] = useState<FormState>({ ...props.lockedState });

  const setToken = (event: React.ChangeEvent<HTMLInputElement>) => setFormState(
    {
      ...formState,
      token: (event.target as HTMLInputElement).value,
    });
  const setUrl = (event: React.ChangeEvent<HTMLInputElement>) => setFormState(
    {
      ...formState,
      url: (event.target as HTMLInputElement).value,
    });
  const setUser = (event: React.ChangeEvent<HTMLInputElement>) => setFormState(
    {
      ...formState,
      user: (event.target as HTMLInputElement).value,
    });

  function handleClick(event: React.ChangeEvent<HTMLFormElement>): void {
    event.preventDefault();
    props.onSubmit(formState);
  }

  const formIsValid = !!formState.token && !!formState.url && !!formState.user;

  const actionStr = props.action ? `Connect and go to ${props.action}` : 'Connect';

  return <form
    className={style['login-form']}
    onSubmit={handleClick}
  >
    <If condition={!!props.errors && props.errors.length > 0}>
      <div>Errors: {props.errors && props.errors.join(', ')}</div>
    </If>
    <TextField
      id="url"
      title="Jira URL"
      description="The URL for the Jira server you want to connect to"
      placeholder="https://jira.example.com"
      value={formState.url}
      onChange={setUrl}
      required={false}
      disabled={props.lockedState && !!props.lockedState.url}
    />
    <TextField
      id="user"
      title="User"
      description={<>
        Email you use to log onto
        {' '}
        <If condition={!formState.url}>
          your Jira server
        </If>
        <If condition={!!formState.url}>
          <a href={formState.url!}>{formState.url}</a>
        </If>
      </>}
      placeholder="john.doe@example.com"
      value={formState.user}
      onChange={setUser}
      required={false}
      disabled={props.lockedState && !!props.lockedState.user}
    />
    <TextField
      id="token"
      title="Token"
      description={<>
        24 character token associated with user.
        Generate one at <a href="https://id.atlassian.com/manage/api-tokens">
        https://id.atlassian.com/manage/api-tokens
      </a>
      </>}
      placeholder="12ABCdE3fGhij4klMnOpQ5rs"
      value={formState.token}
      onChange={setToken}
      required={false}
      disabled={props.lockedState && !!props.lockedState.token}
    />
    {/*
    <CheckboxField
      id="save"
      title="Save?"
      description="Whether to save settings as a cookie in your browser for next visit"
      checked={formState.save}
      onChange={setSave}
    />
    */}
    <button type="submit" className={formIsValid ? '' : style.invalid}>{actionStr}</button>
  </form>;
}

function stripProtocol(url: string): string {
  const uri = parse(url);
  return uri.host || url;
}
