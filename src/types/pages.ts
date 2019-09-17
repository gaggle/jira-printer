export interface PageProps {
  location: Location;
  staticContext?: StaticContext;
}

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: undefined;
}

interface StaticContext {
  statusCode?: number;
}
