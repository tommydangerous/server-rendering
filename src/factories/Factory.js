// Libs
import React from 'react';

// Config
import Config from '../config/Config';

export default (name) => {
  let component = require(`${Config.componentDirPath}/${name}`);
  if (component.default) {
    component = component.default;
  }
  return React.createFactory(component);
}
