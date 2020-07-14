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
  layout: GraphLayout
  viewport: Viewport
  schema: Schema
  updateLayout: GraphUpdateHandler,
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
      model: props.layout.entityManager.model,
      createEntity: this.onEntityCreate.bind(this),
      updateEntity: this.onEntityUpdate.bind(this),
      getEntitySuggestions: props.layout.getEntitySuggestions.bind(this),
      resolveEntityReference: this.resolveEntityReference.bind(this),
    });

    this.getEntities = this.getEntities.bind(this);
    this.onColumnSort = this.onColumnSort.bind(this);
    this.onEntityUpdate = this.onEntityUpdate.bind(this);
    this.onSelectionUpdate = this.onSelectionUpdate.bind(this);
    this.propagateToHistory = this.propagateToHistory.bind(this);
    this.visitEntity = this.visitEntity.bind(this);
  }

  getEntities(schema: Schema) {
    const { layout } = this.props;
    const { sort } = this.state;

    const entities = layout.getEntities()
      .filter(e => e.schema.name === schema.name);

    if (sort) {
      const { field, direction } = sort;
      const property = schema.getProperty(field);
      return entities.sort((a, b) => this.sortEntities(a, b, property, direction));
    } else {
      return entities;
    }
  }

  sortEntities = (a:Entity, b:Entity, prop: FTMProperty, direction: string) => {
    const { resolveEntityReference } = this;
    let aRaw = a?.getFirst(prop);
    let bRaw = b?.getFirst(prop);

    if (!aRaw) return 1;
    if (!bRaw) return -1;

    const aVal = Property.getSortValue({prop, value: aRaw, resolveEntityReference})
    const bVal = Property.getSortValue({prop, value: bRaw, resolveEntityReference})

    if (direction === 'asc') {
      return aVal < bVal ? -1 : 1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  }

  onEntityCreate(entityData: IEntityDatum) {
    const { layout, updateLayout } = this.props;
    const entity = layout.createEntity(entityData);
    this.addChangeToBatch('created', entity);
    return entity;
  }

  onEntityDelete(entity: Entity) {
    const { layout, updateLayout } = this.props;
    layout.removeEntity(entity.id, true);

    updateLayout(layout, null, { modifyHistory: false });
    this.addChangeToBatch('deleted', entity);
  }

  onEntityUpdate(entity: Entity) {
    const { layout, updateLayout } = this.props;

    layout.updateEntity(entity);
    updateLayout(layout, null, { modifyHistory: false });
    this.addChangeToBatch('updated', entity);
  }

  addChangeToBatch(operation: string, entity: Entity | Promise<Entity>) {
    const currValues = this.batchedChanges[operation] || [];
    this.batchedChanges[operation] = [...currValues, entity];
  }

  visitEntity(entity: Entity) {
    const { layout, fitToSelection, toggleTableView, updateLayout } = this.props;
    this.onSelectionUpdate(entity, false, false);
    toggleTableView();
    fitToSelection();
  }

  propagateToHistory() {
    const { layout, updateLayout, viewport } = this.props;
    if (!_.isEmpty(this.batchedChanges)) {
      if (this.batchedChanges.created) {
        layout.addEntities(this.batchedChanges.created, viewport.center);
      }
      updateLayout(layout, this.batchedChanges, { modifyHistory: true });
      this.batchedChanges = {};
    }
  }

  resolveEntityReference(entityId: string): Entity | undefined {
    const { layout } = this.props;

    return layout.entities.get(entityId);
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
    const { layout, updateLayout } = this.props;
    layout.selectByEntities([entity], additional, allowUnselect);
    updateLayout(layout, null, { clearSearch: true });
  }

  render() {
    const { layout, schema, writeable } = this.props;
    const { sort } = this.state;

    return (
      <TableEditor
        entities={this.getEntities(schema)}
        schema={schema}
        sort={sort}
        sortColumn={this.onColumnSort}
        selection={layout.getSelectedEntities()}
        updateSelection={this.onSelectionUpdate}
        writeable={writeable}
        entityManager={this.localEntityManager}
        updateFinishedCallback={this.propagateToHistory}
        visitEntity={this.visitEntity}
      />
    );
  }
}
