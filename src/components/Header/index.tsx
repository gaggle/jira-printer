import React from 'react';
import { Link } from 'react-router-dom';
import { Routing } from '../../lib/routing';
import PrinterLogo from './logo.svg';

export function Header() {
  return <nav id="header" className="bg-black">
    <div className="container mx-auto py-2 h-12">
      <div className="float-left pl-4">
        <a
          className="text-white no-underline font-bold text-2xl lg:text-4xl"
          href={Routing.root.path}
        >
          <img className="h-8 mr-2 mb-1 lg:mb-2 inline" src={PrinterLogo} alt="Jira Printer logo"/>
          Jira Printer
        </a>
      </div>

      <div className="float-right mb-2 mt-1 lg:mt-3">
        <Link
          to={Routing.login.path}
          className="hover:underline bg-white text-gray-800 font-bold rounded-full py-2 px-8 shadow opacity-75"
        >
          Connect
        </Link>
      </div>
    </div>
    <div className="clearfix"/>
  </nav>;
}
