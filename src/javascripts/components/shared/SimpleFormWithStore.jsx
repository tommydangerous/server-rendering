const SimpleForm = require('./SimpleForm');

module.exports = function(singularResource, action, store) {
  class SimpleFormWithStore extends SimpleForm {
    static getPropsFromStores() {
      return store.getState()[singularResource];
    }

    static getStores() {
      return [store];
    }

    onChangeInput(e) {
      const hash = {};
      hash[e.target.name] = e.target.value;
      action.updateAttributes(hash);
    }

    submitFormPayload() {
      const _this = this;
      const payload = {};
      this.props.fields.forEach(function(hash) {
        payload[hash.name] = _this.props[hash.name];
      });
      return payload;
    }
  };
  return SimpleFormWithStore;
}
