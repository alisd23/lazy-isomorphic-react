// declare function require(module: string): any;
// declare function require.ensure(module: string): any;

interface requireFn {
  (module: string): any;
  ensure(deps: string[], cb: Function): any;
  include: Function;
}

declare var require: requireFn;

declare module "require" {
	export = require;
}
