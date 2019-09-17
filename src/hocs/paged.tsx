import React, { ElementType } from 'react';

import { Navbar } from '../components/Navbar';
import { useStore } from '../hooks/use-store';
import { PageProps } from '../types/pages';

export function Paged(WrappedComponent: ElementType) {
  /**
   * A full page, with navbar and everything you'd expect
   */
  function InnerPage({ children }: { children?: React.ReactNode }) {
    const isConnected = useStore('isConnected');

    return <>
      <header>
        <Navbar connection={isConnected}/>
      </header>
      {children}
    </>;
  }

  return (props: PageProps) => <InnerPage><WrappedComponent {...props}/></InnerPage>;
}
