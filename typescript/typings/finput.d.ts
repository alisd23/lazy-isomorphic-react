
/*
* @param {Options.scale} maximum number of decimal digits
* @param {Options.range} Whether number can take any value or must be positive
* @param {Options.fixed} After focus is lost - value is formatted to *scale* number of decimal places
* @param {Options.thousands} Character to use for the thousands separator
* @param {Options.decimal} Character to use for the decimal point
* @param {Options.shortcuts} Object map of shortcut characters to multiplier (e.g. { k: 1000 })
*/

interface shortcutsType {
  [name: string]: number;
}

interface Options {
  scale?: number;
  range?: number;
  fixed?: boolean;
  thousands?: string;
  decimal?: string;
  shortcuts?: shortcutsType;
}

interface finputFn {
	(element: Element, options: Options): Function;
}

declare var finput: finputFn;

declare module "finput" {
	export = finput
}
