import React from 'react';
import ReactDOM from 'react-dom';
import { createReducer } from 'redux-act';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  defaultModel,
  Model,
} from '@alephdata/followthemoney';

import { LocalStorageEntityContext } from 'contexts/LocalStorageEntityContext';
import { EmbeddedElement } from 'embed/EmbeddedElement';

export interface IRenderEmbedConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IRenderEmbedProps {
  id: string
  type: string
  data?: any
  config?: IRenderEmbedConfig
}

export const renderEmbed = (props: IRenderEmbedProps) => {
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
    combineReducers({
      model: createReducer({}, new Model(defaultModel)),
      locale: createReducer({}, 'en'),
      entities: createReducer({}, data.entities)
    }),
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
