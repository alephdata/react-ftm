import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Entity, Schema } from '@alephdata/followthemoney'

import { IEntityContext } from 'contexts/EntityContext';
import { EntitySelect } from 'editors'

interface IEntitySuggestProps  {
  onSubmit: (values: Array<Entity>) => void
  onQueryChange: (queryText: string) => void
  queryText: string
  schemata: Array<Schema>
  entityContext: IEntityContext
  entitySelectProps: any
  suggestLocalEntities?: boolean
  filterSuggestions?: (e: Entity) => boolean
}

export class EntitySuggest extends React.Component<IEntitySuggestProps & PropsFromRedux> {
  componentDidMount() {
    this.fetchIfNeeded()
  }

  componentDidUpdate() {
    this.fetchIfNeeded()
  }

  fetchIfNeeded() {
    const { fetchSuggestions, queryText, schemata, suggestions } = this.props;

    if (!!fetchSuggestions && suggestions?.shouldLoad) {
      fetchSuggestions(queryText, schemata);
    }
  }

  render() {
    const { onQueryChange, onSubmit, entitySelectProps, filterSuggestions, suggestions } = this.props;

    if (!suggestions) { return null }

    return (
      <EntitySelect
        onSubmit={onSubmit}
        isFetching={suggestions.isPending}
        entitySuggestions={filterSuggestions ? suggestions.results.filter(filterSuggestions) : suggestions.results}
        onQueryChange={onQueryChange}
        {...entitySelectProps}
      />
    );
  }
}

const mapStateToProps = (state: any, ownProps: IEntitySuggestProps) => {
  const { entityContext, queryText, schemata } = ownProps;
  const { selectEntities } = entityContext;
  return ({ suggestions: selectEntities(state, queryText, schemata) });
}

const mapDispatchToProps = (dispatch: any, ownProps: IEntitySuggestProps) => {
  const { entityContext, suggestLocalEntities } = ownProps;
  const { queryEntities, queryEntitySuggest } = entityContext;
  if (suggestLocalEntities) {
    return ({
      fetchSuggestions: (queryText: string, schemata?: Array<Schema>) => dispatch(queryEntities(queryText, schemata))
    })
  } else if (queryEntitySuggest) {
    return ({
      fetchSuggestions: (queryText: string, schemata?: Array<Schema>) => dispatch(queryEntitySuggest(queryText, schemata))
    })
  } else {
    return {}
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(EntitySuggest);
