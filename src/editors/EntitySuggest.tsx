import * as React from 'react'
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Entity, Model, Schema, Values } from '@alephdata/followthemoney'

import { IEntityContext } from 'contexts/EntityContext';
import { EntitySelect } from 'editors'
import { Dialog } from 'components/common'

interface IEntitySuggestProps  {
  onSubmit: (values: Values) => void
  onQueryChange: (queryText: string) => void
  placeholder: string
  noResultsText: string
  queryText: string
  schema: Schema
  entityContext: IEntityContext
}

export class EntitySuggest extends React.Component<IEntitySuggestProps & PropsFromRedux> {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate() {
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { queryEntitySuggest, queryText, schema, suggestions } = this.props;

    if (!!queryEntitySuggest && suggestions.shouldLoad) {
      queryEntitySuggest(queryText, [schema]);
    }
  }

  render() {
    const { onQueryChange, onSubmit, placeholder, noResultsText, suggestions } = this.props;

    return (
      <EntitySelect
        onSubmit={onSubmit}
        values={[]}
        allowMultiple={true}
        isFetching={suggestions.isPending}
        entitySuggestions={suggestions}
        onQueryChange={onQueryChange}
        popoverProps={{ usePortal: false }}
        inputProps={{ large: true }}
        placeholder={placeholder}
        noResultsText={noResultsText}
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: IEntitySuggestProps) => {
  console.log('in map state', state, ownProps);
  const { entityContext, queryText, schema } = ownProps;
  const { selectEntitySuggestResult } = entityContext;
  if (!selectEntitySuggestResult) { return ({}) }
  return ({
    suggestions: selectEntitySuggestResult(state, queryText, [schema])
  });
}

const mapDispatchToProps = (dispatch: any, ownProps: IEntitySuggestProps) => {
  const { queryEntitySuggest } = ownProps.entityContext;
  if (!queryEntitySuggest) { return ({}) }
  return ({
    queryEntitySuggest: (queryText: string, schemata?: Array<Schema>) => dispatch(queryEntitySuggest(queryText, schemata))
  })
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(EntitySuggest);
