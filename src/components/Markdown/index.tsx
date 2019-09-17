import React from 'react';
import { Converter } from 'showdown';

const converter = new Converter();

export function Markdown(props: { text: string }) {
  return <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.text) }}/>;
}
