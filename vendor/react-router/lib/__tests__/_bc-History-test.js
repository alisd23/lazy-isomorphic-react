'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _History = require('../History');

var _History2 = _interopRequireDefault(_History);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _Route = require('../Route');

var _Route2 = _interopRequireDefault(_Route);

var _historyLibCreateMemoryHistory = require('history/lib/createMemoryHistory');

var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

// skipping to remove warnings, and we don't intent to update this mixin
// keeping tests here just in-case
describe('v1 History Mixin', function () {

  var node = undefined;
  beforeEach(function () {
    node = document.createElement('div');
  });

  afterEach(function () {
    _reactDom.unmountComponentAtNode(node);
  });

  it('assigns the history to the component instance', function (done) {
    var history = _historyLibCreateMemoryHistory2['default']('/');

    var Component = _react2['default'].createClass({
      displayName: 'Component',

      mixins: [_History2['default']],
      componentWillMount: function componentWillMount() {
        _expect2['default'](this.history).toExist();
      },
      render: function render() {
        return null;
      }
    });

    _reactDom.render(_react2['default'].createElement(
      _Router2['default'],
      { history: history },
      _react2['default'].createElement(_Route2['default'], { path: '/', component: Component })
    ), node, done);
  });
});