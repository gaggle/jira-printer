import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routing } from '../../lib/routing';

import { Switcher } from '../Switcher';
import style from './index.module.css';

export interface NavbarProps {
  connection: boolean;
}

export function Navbar(props: NavbarProps) {
  const connection = props.connection ? <div>Connection: ✅</div> : <div>Connection: ❌</div>;
  return <nav className={style.navbar} role="navigation" aria-label="main navigation">
    <Switcher>
      <NavLink exact={true} to={Routing.issues.path} activeClassName={style.active}>Issues</NavLink>
      {connection}
    </Switcher>
  </nav>;
}
