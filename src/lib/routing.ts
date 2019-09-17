const routingByLabel: { [key: string]: Routing } = {};
const routingByPath: { [key: string]: Routing } = {};
const routingRegistry: Routing[] = [];

export class Routing {
  public static readonly home: Routing = new Routing('home', '/', 'Home');
  public static readonly issues: Routing = new Routing('issues', '/issues', 'Issues');
  public static readonly login: Routing = new Routing('login', '/login', 'Login');

  public readonly label: string;
  public readonly name: string;
  public readonly path: string;

  public static fromPath(path: string): Routing {
    return routingByPath[path];
  }

  public static fromLabel(label: string): Routing {
    return routingByLabel[label];
  }

  private static register(routing: Routing) {
    routingByLabel[routing.label] = routing;
    routingByPath[routing.path] = routing;
    routingRegistry.push(routing);
  }

  constructor(label: string, path: string, name: string) {
    this.label = label;
    this.name = name;
    this.path = path;
    Routing.register(this);
  }
}
