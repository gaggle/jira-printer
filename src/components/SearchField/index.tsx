import React, { ChangeEvent as ReactChangeEvent, FormEvent as ReactFormEvent, useState } from 'react';

import style from './index.module.css';
import { SearchIcon } from './search-icon';

interface SearchFieldProps {
  onChange?: (value: string, prev: string, event: ReactChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string, event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  searchText?: string;
}

export function SearchField(props: SearchFieldProps) {
  props = { placeholder: 'Search', ...props };
  const [state, setState] = useState({ value: props.searchText || '' });

  function handleClick(event: ReactFormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (props.onSearch) {
      props.onSearch(state.value, event);
    }
  }

  return (
    <form onSubmit={handleClick}>
      <div>
        <input
          className={style['search-field']}
          onChange={(event) => {
            setState({ value: event.target.value });
            if (props.onChange) {
              props.onChange(event.target.value, state.value, event);
            }
          }}
          placeholder={props.placeholder}
          type="text"
          value={state.value}
        />
        <button>
          <SearchIcon/>
        </button>
      </div>
    </form>
  );
}
