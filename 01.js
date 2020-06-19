const FunkyJunkie = {
  createElement,
  render,
};

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key !== 'children';

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((p) => {
      dom[p] = element.props[p];
    });

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

/** @jsx FunkyJunkie.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b></b>
  </div>
);

// const element = FunkyJunkie.createElement(
//   'div',
//   { id: 'bar' },
//   FunkyJunkie.createElement('a', null, 'bar'),
//   FunkyJunkie.createElement('b'),
// );

const container = document.getElementById('root');
FunkyJunkie.render(element, container);
