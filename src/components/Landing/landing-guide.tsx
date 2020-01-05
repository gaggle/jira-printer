import React from 'react';

export function LandingGuide() {
  return <section className="bg-white py-8">
    <div className="container mx-auto m-8">
      <h1 className="hidden md:block w-full landing-title">
        Step-by-step guide
      </h1>
      <h1 className="md:hidden w-full landing-title">
        Guide
      </h1>

      <div className="w-full mb-4">
        <div className="landing-divider gradient"/>
      </div>

      <ol className="w-full list-reset list-none md:list-decimal text-3xl text-gray-800 flex flex-col lg:flex-row omt-10 lg:omt-0">
        <li className="lg:w-1/3 mx-auto mx-0 md:mx-8">
          <ConnectCard/>
        </li>
        <li className="lg:w-1/3 mx-auto mx-0 md:mx-8">
          <FindCard/>
        </li>
        <li className="lg:w-1/3 mx-auto mx-0 md:mx-8">
          <PrintCard/>
        </li>
      </ol>
    </div>
  </section>;
}

function ConnectCard() {
  return (
    <div className="rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="text-3xl text-gray-800 font-bold leading-none mb-3">
          Connect to your server
        </div>
        <p className="text-gray-700 text-base">
          Click "Connect" to establish a connection to the Jira server,
          all you need to fill out is which Jira server to connect to,
          your username,
          and an access token that's easy to create by following the on-screen guide.
        </p>
      </div>
    </div>
  );
}

function FindCard() {
  return (
    <div className="rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="text-3xl text-gray-800 font-bold leading-none mb-3">
          Find your issues
        </div>
        <p className="text-gray-700 text-base">
          After connecting you can search for one or more issues.
          They all get rendered in a print-friendly format,
          and you can refine your search until you have exactly the issues you want to print.
        </p>
      </div>
    </div>
  );
}

function PrintCard() {
  return (
    <div className="rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="text-3xl text-gray-800 font-bold leading-none mb-3">
          Print!
        </div>
        <p className="text-gray-800 text-base">
          Just print. Only your issues gets printed,
          all other user-interface widgets are automatically hidden.
          For best-looking prints, print using a color-printer and include background graphics.
        </p>
      </div>
    </div>
  );
}
