'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var cx = require('classnames');
var React = require('react');

var agentClientActions = require('../actions/AgentClientActions');
var agentClientStore = require('../stores/AgentClientStore');

var SimpleTable = require('../../../../components/shared/SimpleTable');

var propTypes = {
  showFlashMessage: React.PropTypes.func
};

var AgentClientTable = function (_React$Component) {
  _inherits(AgentClientTable, _React$Component);

  _createClass(AgentClientTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      agentClientActions.index();
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return agentClientStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [agentClientStore];
    }
  }]);

  function AgentClientTable() {
    _classCallCheck(this, AgentClientTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AgentClientTable).call(this));

    _this2.onClickDelete = _this2.onClickDelete.bind(_this2);
    _this2.renderTableRow = _this2.renderTableRow.bind(_this2);
    return _this2;
  }

  _createClass(AgentClientTable, [{
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      e.preventDefault();
      var _this = this;
      agentClientActions.delete({
        object: object
      }).then(function (response) {
        _this.props.showFlashMessage({
          message: 'Client successfully deleted.',
          status: 'success'
        });
      }, function (xhr) {
        _this.props.showFlashMessage({
          message: xhr.responseJSON.error_message,
          status: 'error'
        });
      });
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(object) {
      var _this = this;
      return React.createElement(
        'tr',
        { key: object.id },
        React.createElement(
          'td',
          null,
          object.id
        ),
        React.createElement(
          'td',
          null,
          object.name
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { href: '#', onClick: _this.onClickDelete.bind(this, object) },
            "Delete"
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: cx({ loading: this.props.requestLoading }) },
        React.createElement(SimpleTable, {
          objects: this.props.agent_clients,
          renderTableRow: this.renderTableRow,
          tableHeaders: ["ID", "Name", "Actions"]
        })
      );
    }
  }]);

  return AgentClientTable;
}(React.Component);

;

AgentClientTable.propTypes = propTypes;

module.exports = connectToStores(AgentClientTable);
module.exports.AgentClientTable = AgentClientTable;