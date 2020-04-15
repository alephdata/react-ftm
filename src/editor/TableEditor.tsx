import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from './PropertyEditor';
import { PropertyValues } from '../types';
import { EntityManager } from '../EntityManager';
import { SelectProperty } from './SelectProperty';
import { TruncatedFormat } from "@blueprintjs/table";
import { Button, Checkbox, Icon, Intent, Popover, Position, Tooltip } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";
import Datasheet from 'react-datasheet';
import _ from 'lodash';

import "./TableEditor.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_entity',
    defaultMessage: 'Add {schema}',
  },
  delete: {
    id: 'table_editor.delete_entity',
    defaultMessage: 'Delete this entity',
  },
});

const readOnlyCellProps = { readOnly: true, disableEvents: true, forceComponent: true }''
const headerCellProps = { className: "header", ...readOnlyCellProps };
const checkboxCellProps = { className: "checkbox", ...readOnlyCellProps };
const propertyCellProps = { className: "property" };

const propSort = (a:Property, b:Property) => (a.label > b.label ? 1 : -1);

interface ITableEditorProps extends WrappedComponentProps {
  entities: Array<Entity>
  schema: Schema
  sort: any
  sortColumn: (sort: any) => void
  selection: Array<Entity>
  updateSelection: (entities:Array<Entity>) => void
  entityManager: EntityManager
}

interface ITableEditorState {
  visibleProps: Array<Property>
}

class TableEditorBase extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props:ITableEditorProps) {
    super(props);

    this.state = {
      visibleProps: this.getVisibleProperties(),
    }

    this.onAddColumn = this.onAddColumn.bind(this);
  }

  getVisibleProperties() {
    const { entities, schema } = this.props;

    const filledProps = entities.reduce((acc, entity: Entity) => [...acc, ...entity.getProperties()], [] as Property[]);
    const featuredProps = schema.getFeaturedProperties();

    return Array.from(new Set([...featuredProps, ...filledProps]));
  }

  getNonVisibleProperties() {
    const { schema } = this.props;
    const { visibleProps } = this.state;

    return schema.getEditableProperties()
      .filter(prop => visibleProps.indexOf(prop) < 0)
      .sort(propSort);
  }

  onAddColumn(newColumn: Property) {
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, newColumn],
    }));
  }

  getTableHeader = () => {
    const { writeable } = this.props;
    const { visibleProps } = this.state;

    const headerCells = visibleProps.map(property => ({ ...headerCellProps, component: this.renderColumnHeader(property) }));
    if (writeable) {
      return [{ ...checkboxCellProps }, ...headerCells, { ...headerCellProps, component: this.renderPropertySelect() }];
    } else {
      return headerCells;
    }
  }

  getTableContent = () => {
    const { entities, writeable } = this.props;
    const { visibleProps } = this.state;

    const content = entities.map(entity => {
      const propCells = visibleProps.map(property => ({ ...propertyCellProps, readOnly: !writeable, data: { entity, property } }))
      if (writeable) {
        const checkbox = { ...checkboxCellProps, component: this.renderCheckbox(entity) };
        return [checkbox, ...propCells];
      } else {
        return propCells;
      }
    });

    if (writeable) {
      const placeholderCells = visibleProps.map(property => ({ ...propertyCellProps, data: { entity: null, property } }));
      const placeholderRow = [{...checkboxCellProps}, ...placeholderCells]

      return [...content, placeholderRow];
    } else {
      return content;
    }
  }

  getUnderlyingValue = (cell) => {
    const { data } = cell;

    if (data?.entity) {
      const { entity, property } = data;
      return entity.getProperty(property);
    } else {
      return null;
    }
  }

  renderValue = ({ cell }) => {
    const { data } = cell;

    if (data) {
      const { entity, property } = data;
      if (entity) {
        return <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={[]} />;
      } else {
        return <span>—</span>
      }
    } else {
      return null;
    }
  }

  renderEditor = ({ cell, onCommit, onChange, onKeyDown }) => {
    const { entityManager, schema } = this.props;
    const { entity, property } = cell.data;

    return (
      <PropertyEditor
        entity={entity || new Entity(entityManager.model, { schema })}
        property={property}
        onChange={(newVal) => onChange(newVal)}
        onSubmit={(ent) => onCommit(ent.getProperty(property))}
        entitiesList={[]}
        usePortal={false}
      />
    );
  }

  renderColumnHeader = (property) => {
    const { sort, sortColumn } = this.props;

    const isSorted = sort && sort.field === property;
    const sortIcon = isSorted ? (sort.direction === 'asc' ? 'caret-up' : 'caret-down') : null;
    return (
      <Button
        onClick={(e) => { sortColumn({field: property, direction: (isSorted && sort.direction === 'asc') ? 'desc' : 'asc'})}
        rightIcon={sortIcon}
        minimal
        fill
        text={property.label}
      />
    );
  }

  renderPropertySelect = () => {
    return (
      <SelectProperty
        properties={this.getNonVisibleProperties()}
        onSelected={this.onAddColumn}
        buttonProps={{minimal: true}}
      />
    )
  }

  renderCheckbox = (entity) => {
    const { selection, updateSelection } = this.props;
    const isSelected = selection.indexOf(entity.id) > -1;
    return (
      <Checkbox checked={isSelected} onChange={() => updateSelection(entity)} />
    );
  }

  handleNewRow = (changes) => {
    const { schema } = this.props;
    const { visibleProps } = this.state;

    const entityData = { schema, properties: {} };

    changes.forEach(({ cell, value, col }) => {
      const property = cell?.data?.property || visibleProps[col-1];
      entityData.properties[property.name] = value;
    })

    this.props.entityManager.createEntity(entityData);
  }

  handleExistingRow = (changes) => {
    let changedEntity;
    changes.forEach(({ cell, value }) => {
      const { entity, property } = cell.data;
      if (value === "") {
        entity.properties.set(property, []);
      } else {
        entity.properties.set(property, value);
      }
      changedEntity = entity;
    })
    if (changedEntity) {
      this.props.entityManager.updateEntity(changedEntity);
    }
  }

  onCellsChanged = (changeList, outOfBounds) => {
    const { entities } = this.props;
    const entityCount = entities.length;
    const fullChangeList = outOfBounds ? [...changeList, ...outOfBounds] : changeList;
    const changesByRow = _.groupBy(fullChangeList, c => c.row);

    Object.entries(changesByRow).forEach(([rowIndex, changes]) => {
      if (rowIndex > entityCount) {
        this.handleNewRow(changes);
      } else {
        this.handleExistingRow(changes);
      }
    });
  }

  parsePaste(pasted) {
    const lines = pasted.split(/[\r\n]+/g)
    return lines.map(line => (
      line.split('\t').map(val => val.split(','))
    ));
  }

  render() {
    const { entities, intl, schema } = this.props;
    const entityCount = entities.length;

    return (
      <div className="TableEditor">
        <Datasheet
          data={[this.getTableHeader(), ...this.getTableContent()]}
          valueRenderer={this.getUnderlyingValue}
          valueViewer={this.renderValue}
          dataEditor={this.renderEditor}
          onCellsChanged={this.onCellsChanged}
          isCellNavigable={(cell, row, col) => { console.log('in cell navigable'); return false; }}
          parsePaste={this.parsePaste}
        />
      </div>
    )
  }
}

export const TableEditor = injectIntl(TableEditorBase);
