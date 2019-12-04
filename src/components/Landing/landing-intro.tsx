import * as React from 'react';
import { Link } from 'react-router-dom';
import { Routing } from '../../lib/routing';

export function LandingIntro(): JSX.Element {
  return <>
    <div className="container pt-16 px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div className="flex flex-col w-full justify-center items-start text-center md:text-left md:ml-10 z-20">
        <h1 className="my-4 text-5xl md:text-7xl font-bold leading-tight">Jira Printer</h1>
        <p
          id="landing-intro"
          className="leading-normal text-2xl -my-5 mb-8"
        >
          Print your issues
        </p>
        <Link
          to={Routing.login.path}
          className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mb-10 md:mb-2 py-4 px-8 shadow-lg"
        >
          Connect
        </Link>
      </div>
    </div>
    <Wave/>
  </>;
}

function Wave() {
  return <div className="relative -mt-12 lg:-mt-24">
    <svg
      viewBox="0 0 1428 174"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-2, 44)" fill="#FFFFFF" fillRule="nonzero">
          <path
            d="M0,0 C90,0.9 147,27 291,59 C387,81 543,89 759,82 C469,156 216,153 0,74"
            opacity="0.1"
          />
          <path
            d="M100,104 C277,72 426,52 546,45 C666,38 810,41 979,55 C931,56 810,74 616,111 C423,147 250,145 100,104 Z"
            opacity="0.1"
          />
          <path
            d="M1046,51 C1130,29 1279,17 1439,40 L1439,120 C1271,77 1140,55 1046,51 Z"
            opacity="0.2"
          />
        </g>
        <g transform="translate(-4, 76)" fill="#FFFFFF" fillRule="nonzero">
          <path
            d="M0,34 C57,53 98,65 123,71 C181,85 234,90 272,93 C311,96 396,95 461,91 C486,90 518,86 556,80 C595,74 622,70 636,66 C663,61 712,49 727,46 C780,34 818,22 856,15 C922,4 955,2 1011,0 C1060,1 1097,3 1121,5 C1161,9 1208,17 1235,22 C1285,30 1354,47 1440,72 L1441,104 L1,104 L0,34 Z"
          />
        </g>
      </g>
    </svg>
  </div>;
}
