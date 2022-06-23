import React from 'react';
import { EdgeCreateDialog } from './EdgeCreateDialog';
import { intl } from '../../setupTests';
import { EntityManager } from './EntityManager';
import { Model, Entity } from '@alephdata/followthemoney';
import { render } from '@testing-library/react';

const model = new Model({
  schemata: {
    thing: {
      label: 'Thing',
      plural: 'Things',
      extends: [],
      schemata: [],
      properties: {},
    },
  },
  types: {},
});

const entityManager = new EntityManager({
  model,
  entities: [],
});

const source = new Entity(model, {
  schema: 'thing',
  id: 'source',
});

describe('<EdgeCreateDialog />', () => {
  it('renders correctly', () => {
    render(
      <EdgeCreateDialog
        entityManager={entityManager}
        source={source}
        intl={intl}
        isOpen={true}
        toggleDialog={() => {
          /* no-op */
        }}
        onSubmit={() => {
          /* no-op */
        }}
        fetchEntitySuggestions={() => Promise.resolve([])}
      />
    );

    expect(document.body).toMatchSnapshot();
  });
});
