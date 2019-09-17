import * as React from 'react';

interface IfProps {
  condition: (() => boolean) | boolean;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export function If(props: IfProps) {
  const res = (props.condition instanceof Function) ? props.condition() : props.condition;
  if (res) {return <>{props.children}</>; }
  if (props.fallback) { return <>{props.fallback}</>; }
  return null;
}
