let path = '../components';
if (process.env.COMPONENT_DIR_PATH) {
  path = `../../${process.env.COMPONENT_DIR_PATH}`;
}

export default {
  // This is the absolute path you want the server to look in when loading your components.
  // Example:
  // If your JavaScript files are in todo-web/app/assets/javascripts,
  // then you want to set your COMPONENT_DIR_PATH environment variable to:
  // todo-web/app/assets/javascripts
  componentDirPath: path,
}
