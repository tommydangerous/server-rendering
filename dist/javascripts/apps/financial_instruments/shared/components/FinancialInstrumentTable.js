'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connectToStores = require('alt/utils/connectToStores');
var cx = require('classnames');
var React = require('react');

var financialInstrumentActions = require('../../shared/actions/FinancialInstrumentActions');
var financialInstrumentStore = require('../../shared/stores/FinancialInstrumentStore');

var SimpleTable = require('../../../../components/shared/SimpleTable');

var propTypes = {
  showFlashMessage: React.PropTypes.func
};

var FinancialInstrumentTable = function (_React$Component) {
  _inherits(FinancialInstrumentTable, _React$Component);

  _createClass(FinancialInstrumentTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      financialInstrumentActions.index();
    }
  }], [{
    key: 'getPropsFromStores',
    value: function getPropsFromStores() {
      return financialInstrumentStore.getState();
    }
  }, {
    key: 'getStores',
    value: function getStores() {
      return [financialInstrumentStore];
    }
  }]);

  function FinancialInstrumentTable() {
    _classCallCheck(this, FinancialInstrumentTable);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FinancialInstrumentTable).call(this));

    _this2.onClickDelete = _this2.onClickDelete.bind(_this2);
    _this2.renderTableRow = _this2.renderTableRow.bind(_this2);
    return _this2;
  }

  _createClass(FinancialInstrumentTable, [{
    key: 'onClickDelete',
    value: function onClickDelete(object, e) {
      e.preventDefault();
      var _this = this;
      financialInstrumentActions.delete({
        object: object
      }).then(function (response) {
        _this.props.showFlashMessage({
          message: 'Financial instrument successfully deleted.',
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
          object.instrument_type
        ),
        React.createElement(
          'td',
          null,
          object.default ? "Default" : "Not default"
        ),
        React.createElement(
          'td',
          null,
          object.status ? object.status : "pending"
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { href: '#', onClick: _this.onClickDelete.bind(this, object) },
            "Delete"
          ),
          !object.default && object.status == 'verified' ? React.createElement(
            'a',
            { className: 'space-left-2', href: '#' },
            "Make default"
          ) : null
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
          objects: this.props.financial_instruments,
          renderTableRow: this.renderTableRow,
          tableHeaders: ["Method", "Details", "Status", "Actions"]
        })
      );
    }
  }]);

  return FinancialInstrumentTable;
}(React.Component);

FinancialInstrumentTable.propTypes = propTypes;

module.exports = connectToStores(FinancialInstrumentTable);
module.exports.FinancialInstrumentTable = FinancialInstrumentTable;