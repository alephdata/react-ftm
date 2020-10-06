import React from 'react';
import _ from 'lodash';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { TableEditor } from './TableEditor';
import { EntityManager } from '../EntityManager';
import { Viewport } from '../Viewport';
import { Classes, Icon } from "@blueprintjs/core";
import { Entity, IEntityDatum, Schema, Property as FTMProperty } from "@alephdata/followthemoney";
import { Property } from '../types';
import { SortType } from './SortType';

import c from 'classnames';

interface ITableViewPanelProps {
  schema: Schema
  writeable: boolean,
  toggleTableView: () => void
  fitToSelection: () => void
}

interface ITableViewPanelState {
  sort: SortType | null
}

export class TableViewPanel extends React.Component<ITableViewPanelProps, ITableViewPanelState> {
  private localEntityManager: EntityManager
  private batchedChanges: any = {}

  constructor(props: ITableViewPanelProps) {
    super(props);

    this.state = {
      sort: null,
    };

    this.localEntityManager = new EntityManager({
      model: this.context.entityManager.model,
      namespace: this.context.entityManager.namespace,
      entities: this.context.entityManager.getEntities(),
      createEntity: this.onEntityCreate.bind(this),
      updateEntity: this.onEntityUpdate.bind(this),
      getEntitySuggestions: (queryText, schemata) => this.context.entityManager.getEntitySuggestions(true, queryText, schemata),
      resolveEntityReference: this.context.entityManager.resolveEntityReference,
    });

    this.getEntities = this.getEntities.bind(this);
    this.onColumnSort = this.onColumnSort.bind(this);
    this.onEntityUpdate = this.onEntityUpdate.bind(this);
    this.onSelectionUpdate = this.onSelectionUpdate.bind(this);
    this.propagateToHistory = this.propagateToHistory.bind(this);
    this.visitEntity = this.visitEntity.bind(this);
  }

  getEntities(schema: Schema) {
    const { entityManager } = this.context;
    const { sort } = this.state;

    const entities = entityManager.getEntities()
      .filter((e: Entity) => e.schema.name === schema.name);

    if (sort) {
      const { field, direction } = sort;
      const property = schema.getProperty(field);
      return entities.sort((a: Entity, b: Entity) => this.sortEntities(a, b, property, direction));
    } else {
      return entities;
    }
  }

  sortEntities = (a:Entity, b:Entity, prop: FTMProperty, direction: string) => {
    const { entityManager } = this.context;

    let aRaw = a?.getFirst(prop);
    let bRaw = b?.getFirst(prop);

    if (!aRaw) return 1;
    if (!bRaw) return -1;

    const aVal = Property.getSortValue({prop, value: aRaw, resolveEntityReference: entityManager.getEntity})
    const bVal = Property.getSortValue({prop, value: bRaw, resolveEntityReference: entityManager.getEntity})

    if (direction === 'asc') {
      return aVal < bVal ? -1 : 1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  }

  onEntityCreate(entityData: IEntityDatum) {
    const { entityManager, layout, updateLayout } = this.context;
    const entity = entityManager.createEntity(entityData);
    this.addChangeToBatch('created', entity);
    return entity;
  }

  onEntityDelete(entity: Entity) {
    const { entityManager, layout, updateLayout } = this.context;
    entityManager.removeEntities([entity.id], true);
    layout.layout(entityManager.getEntities());

    updateLayout(layout, null, { modifyHistory: false });
    this.addChangeToBatch('deleted', entity);
  }

  onEntityUpdate(entity: Entity) {
    const { entityManager, layout, updateLayout } = this.context;

    entityManager.updateEntity(entity);
    layout.layout(entityManager.getEntities());
    updateLayout(layout, null, { modifyHistory: false });
    this.addChangeToBatch('updated', entity);
  }

  addChangeToBatch(operation: string, entity: Entity | Promise<Entity>) {
    const currValues = this.batchedChanges[operation] || [];
    this.batchedChanges[operation] = [...currValues, entity];
  }

  visitEntity(entity: Entity | string) {
    const { entityManager, layout, updateLayout } = this.context;
    const { fitToSelection, toggleTableView } = this.props;
    const entityToSelect = typeof entity === 'string' ? entityManager.getEntity(entity) : entity;
    if (entityToSelect) {
      this.onSelectionUpdate(entityToSelect, false, false);
      toggleTableView();
      fitToSelection();
    }
  }

  propagateToHistory() {
    const { entityManager, layout, updateLayout, viewport } = this.context;
    if (!_.isEmpty(this.batchedChanges)) {
      if (this.batchedChanges.created) {
        entityManager.addEntities(this.batchedChanges.created);
        layout.layout(entityManager.getEntities(), viewport.center);
        layout.selectByEntities(this.batchedChanges.created);
      }
      updateLayout(layout, this.batchedChanges, { modifyHistory: true });
      this.batchedChanges = {};
    }
  }

  onColumnSort(newField: string) {
    this.setState(({ sort }) => {
      if (sort?.field !== newField) {
        return {sort: { field: newField, direction: 'asc'}};
      }
      if (sort?.direction === 'asc') {
        return {sort: { field: sort.field, direction: 'desc'}};
      } else {
        return {sort: null};
      }
    });
  }

  onSelectionUpdate(entity: Entity, additional = true, allowUnselect = true) {
    const { layout, updateLayout } = this.context;
    layout.selectByEntities([entity], additional, allowUnselect);
    updateLayout(layout, null, { clearSearch: true });
  }

  render() {
    const { layout } = this.context;
    const { schema, writeable } = this.props;
    const { sort } = this.state;

    return (
      <TableEditor
        entities={this.getEntities(schema)}
        schema={schema}
        sort={sort}
        sortColumn={this.onColumnSort}
        selection={layout.getSelectedEntityIds()}
        updateSelection={this.onSelectionUpdate}
        writeable={writeable}
        entityManager={this.localEntityManager}
        updateFinishedCallback={this.propagateToHistory}
        visitEntity={this.visitEntity}
      />
    );
  }
}
