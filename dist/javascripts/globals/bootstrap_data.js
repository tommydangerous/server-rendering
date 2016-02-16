'use strict';

!function (global) {
  var BootstrapData = {
    get: function get(key) {
      var id = '_bootstrap-' + key,
          el = document.getElementById(id),
          content,
          data;

      if (el == null) return;

      content = el.content;
      data = JSON.parse(content);

      return data;
    }
  };

  global.BootstrapData = BootstrapData;
}(window);