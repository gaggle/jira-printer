import React from 'react';
import { LandingFooter } from '../components/Landing/landing-footer';
import { LandingGuide } from '../components/Landing/landing-guide';
import { LandingHeader } from '../components/Landing/landing-header';
import { LandingIntro } from '../components/Landing/landing-intro';

import { PageProps } from '../types/pages';
import './Landing.css';

export function Landing(props: PageProps) {
  return (
    <div className="leading-normal tracking-normal text-white gradient flex flex-col h-screen">
      <LandingHeader/>
      <LandingIntro/>
      <LandingGuide/>
      <div className="flex flex-grow bg-white"/>
      <LandingFooter/>
    </div>
  );
}