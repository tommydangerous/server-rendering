"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  objects: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
  renderTableRow: _react2.default.PropTypes.func.isRequired,
  tableHeaders: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string).isRequired
};

var SimpleTable = function (_Component) {
  _inherits(SimpleTable, _Component);

  function SimpleTable() {
    _classCallCheck(this, SimpleTable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTable).apply(this, arguments));
  }

  _createClass(SimpleTable, [{
    key: "renderRows",
    value: function renderRows() {
      var _this2 = this;

      return this.props.objects.map(function (object) {
        return _this2.props.renderTableRow(object);
      });
    }
  }, {
    key: "renderHeaders",
    value: function renderHeaders() {
      return this.props.tableHeaders.map(function (header) {
        return _react2.default.createElement(
          "th",
          { key: header },
          header
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "table",
        { className: "table table-bordered table-striped" },
        _react2.default.createElement(
          "thead",
          null,
          _react2.default.createElement(
            "tr",
            null,
            this.renderHeaders()
          )
        ),
        _react2.default.createElement(
          "tbody",
          null,
          this.renderRows()
        )
      );
    }
  }]);

  return SimpleTable;
}(_react.Component);

;

SimpleTable.propTypes = propTypes;

exports.default = SimpleTable;