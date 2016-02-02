
/// <reference path="./react.d.ts" />

declare module ReactHelmet {
  export interface ReactHelmetInterface {
    rewind(): any;
  }
}

// declare var reactHelmet: ReactHelmet.ReactHelmetInterface;
declare var reactHelmet: any;

declare module 'react-helmet' {
  export default reactHelmet;
}
