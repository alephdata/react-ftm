import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createDefaultStore } from 'defaultStore';
import { DefaultEntityContext } from 'contexts/DefaultEntityContext';
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
  onUpdate?: (updatedData: any) => void
}

export const renderEmbed = (props: IRenderEmbedProps) => {
  const { id, type, data, config, onUpdate } = props;

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

  const store = createDefaultStore({ entities: data.entities }, onUpdate);
  const entityContext = new DefaultEntityContext();

  ReactDOM.render(
    <div {...config?.containerProps}>
      <Provider store={store} >
        <EmbeddedElement
          id={id}
          data={data}
          config={config}
          type={type}
          entityContext={entityContext}
          onUpdate={onUpdate}
        />
      </Provider>
    </div>,
    domElem
  );
}
