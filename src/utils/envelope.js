// Libs
import ReactDOMServer from 'react-dom/server';

// Factories
import Factory from '../factories/Factory';

export default (req) => {
  const component = req.body ? req.body.component : req.query.component;
  const props = req.body ? req.body.props : req.query;
  return {
    metadata: {
      component: component,
      props: props,
    },
    html: ReactDOMServer.renderToString(Factory(component)(props)),
  };
}
