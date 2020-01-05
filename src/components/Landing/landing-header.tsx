import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Routing } from '../../lib/routing';
import PrinterLogo from './logo.svg';

export function LandingHeader() {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const button = document.getElementById('landing-intro');
    if (!button) {
      return;
    }
    const handleScroll = () => setScrolledPast(window.pageYOffset >= button!.offsetTop);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  return <nav
    id="header"
    className={classnames('fixed', 'w-full', 'z-30', 'top-0', 'anim-background', { 'bg-black': scrolledPast })}
  >
    <div className="container w-full mx-auto items-center py-2 lg:py-1 h-12">
      <div className={classnames({ invisible: !scrolledPast }, 'float-left', 'pl-4')}>
        <a
          className="text-white no-underline font-bold text-2xl lg:text-4xl"
          href="#"
        >
          <img className="h-8 mr-2 mb-1 lg:mb-2 inline" src={PrinterLogo} alt="Jira Printer logo"/>
          <span className="hidden sm:inline">Jira Printer</span>
        </a>
      </div>

      <div className="float-right z-20 mb-2 mt-1 lg:mt-3 mr-2">
        <Link
          to={Routing.login.path}
          className="hover:underline bg-white text-gray-800 font-bold rounded-full py-2 px-8 shadow opacity-75"
        >
          Connect
        </Link>
      </div>
    </div>
  </nav>;
}
