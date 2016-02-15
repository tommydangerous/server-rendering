// Libs
import React from 'react';

export default (name) => {
  return React.createFactory(require(`../components/${name}`).default);
}
