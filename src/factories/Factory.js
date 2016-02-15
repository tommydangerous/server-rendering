// Libs
import React from 'react';

export default (name) => {
  let component = require(`../components/${name}`);
  if (component.default) {
    component = component.default;
  }
  return React.createFactory(component);
}
