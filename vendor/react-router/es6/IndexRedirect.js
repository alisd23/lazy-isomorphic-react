'use strict';

import React from 'react';
import warning from './warning';
import invariant from 'invariant';
import Redirect from './Redirect';
import { falsy } from './PropTypes';

var _React$PropTypes = React.PropTypes;
var string = _React$PropTypes.string;
var object = _React$PropTypes.object;

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */
var IndexRedirect = React.createClass({
  displayName: 'IndexRedirect',

  statics: {

    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
      /* istanbul ignore else: sanity check */
      if (parentRoute) {
        parentRoute.indexRoute = Redirect.createRouteFromReactElement(element);
      } else {
        process.env.NODE_ENV !== 'production' ? warning(false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
      }
    }

  },

  propTypes: {
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: falsy,
    children: falsy
  },

  /* istanbul ignore next: sanity check */
  render: function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : invariant(false) : undefined;
  }

});

export default IndexRedirect;