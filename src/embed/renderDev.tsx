import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { LocalStorageEntityContext } from 'contexts/LocalStorageEntityContext';
import { createLocalStorageReducer } from 'reducers/localStorageReducer'
import { EmbeddedElement } from 'embed/EmbeddedElement';
import { fetchExternalData } from 'embed/util';

export interface IRenderDevConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IRenderDevProps {
  id: string
  type: string
  data?: any
  config?: IRenderDevConfig
}

export const renderDev = (props: IRenderDevProps) => {
  const { id, type, data, config } = props;

  if (!data) {
    console.error('React-FTM Embed Error: no data provided');
    return;
  }

  let domElem = document.getElementById(id);
  if (!domElem) {
    domElem = document.createElement('div');
    domElem.setAttribute('id', id);
    document.body.appendChild(domElem);
  }

  const store = createStore(
    createLocalStorageReducer(data)
  );
  const entityContext = new LocalStorageEntityContext();

  ReactDOM.render(
    <div {...config?.containerProps}>
      <Provider store={store} >
        <EmbeddedElement id={id} data={data} config={config} type={type} entityContext={entityContext} />
      </Provider>
    </div>,
    domElem
  );
}
