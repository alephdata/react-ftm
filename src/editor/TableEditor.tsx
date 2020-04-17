import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import _ from 'lodash';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from './PropertyEditor';
import { PropertyValues } from '../types';
import { EntityManager } from '../EntityManager';
import { SelectProperty } from './SelectProperty';
import { TruncatedFormat } from "@blueprintjs/table";
import { Button, Checkbox, Icon, Intent, Popover, Position, Tooltip } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";
import Datasheet from 'react-datasheet';
import { SortType } from './SortType';

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

const readOnlyCellProps = { readOnly: true, disableEvents: true, forceComponent: true };
const headerCellProps = { className: "header", ...readOnlyCellProps };
const checkboxCellProps = { className: "checkbox", ...readOnlyCellProps };
const propertyCellProps = { className: "property" };

const propSort = (a:Property, b:Property) => (a.label > b.label ? 1 : -1);

export interface CellData extends Datasheet.Cell<CellData, any> {
  className: string
  data: any
}

interface ITableEditorProps extends WrappedComponentProps {
  entities: Array<Entity>
  schema: Schema
  sort: SortType | null
  sortColumn: (sort: SortType) => void
  selection: Array<string>
  updateSelection: (entityId: string) => void
  entityManager: EntityManager
  writeable: boolean
}

interface ITableEditorState {
  visibleProps: Array<Property>
  shouldCommit: boolean
}

class TableEditorBase extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props:ITableEditorProps) {
    super(props);

    this.state = {
      visibleProps: this.getVisibleProperties(),
      shouldCommit: false,
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

  getUnderlyingValue = (cell: CellData) => {
    const { data } = cell;

    if (data?.entity) {
      const { entity, property } = data;
      return entity.getProperty(property);
    } else {
      return null;
    }
  }

  renderValue = ({ cell }: { cell: CellData }) => {
    const { data } = cell;

    if (data) {
      const { entity, property } = data;
      if (entity) {
        return <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={new Map()} />;
      } else {
        return <span>—</span>
      }
    } else {
      return null;
    }
  }

  renderEditor = ({ cell, onCommit, onChange, onKeyDown }: Datasheet.DataEditorProps<CellData, any>) => {
    const { entityManager, schema } = this.props;
    const { shouldCommit } = this.state;
    const { entity, property } = cell.data;

    if (shouldCommit) {
      this.setState({ shouldCommit: false });
      onCommit(null);
    }

    return (
      <PropertyEditor
        entity={entity || new Entity(entityManager.model, { schema, id: `${Math.random()}` })}
        property={property}
        onChange={(newVal) => onChange(newVal)}
        onSubmit={(ent) => {onChange(ent.getProperty(property)); this.setState({ shouldCommit: true }); }}
        entitiesList={new Map()}
        usePortal={false}
      />
    );
  }

  renderColumnHeader = (property: Property) => {
    const { sort, sortColumn } = this.props;

    const isSorted = sort && sort.field === property;
    const sortIcon = isSorted ? (sort && sort.direction === 'asc' ? 'caret-up' : 'caret-down') : null;
    return (
      <Button
        onClick={() => { sortColumn({field: property, direction: (isSorted && sort?.direction === 'asc') ? 'desc' : 'asc'})}}
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

  renderCheckbox = (entity: Entity) => {
    const { selection, updateSelection } = this.props;
    const isSelected = selection.indexOf(entity.id) > -1;
    return (
      <Checkbox checked={isSelected} onChange={() => updateSelection(entity.id)} />
    );
  }

  handleNewRow = (changes: any) => {
    const { schema } = this.props;
    const { visibleProps } = this.state;

    const entityData = { schema, properties: {} };

    changes.forEach(({ cell, value, col }: any) => {
      const property = cell?.data?.property || visibleProps[col-1];
      entityData.properties[property.name] = value;
    })

    this.props.entityManager.createEntity(entityData);
  }

  handleExistingRow = (changes: Datasheet.CellsChangedArgs<CellData, any> | Datasheet.CellAdditionsArgs<CellData>) => {
    let changedEntity;
    changes.forEach(({ cell, value }: any) => {
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

  onCellsChanged = (changeList: Datasheet.CellsChangedArgs<CellData, any>, outOfBounds: Datasheet.CellAdditionsArgs<CellData>) => {
    const { entities } = this.props;
    const entityCount = entities.length;
    const fullChangeList = outOfBounds ? [...changeList, ...outOfBounds] : changeList;
    const changesByRow = _.groupBy(fullChangeList, c => c.row);

    Object.entries(changesByRow).forEach(([rowIndex, changes]: [string, any]) => {
      if (+rowIndex > entityCount) {
        this.handleNewRow(changes);
      } else {
        this.handleExistingRow(changes);
      }
    });
  }

  parsePaste(pastedString: string) {
    const lines = pastedString.split(/[\r\n]+/g)
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
          data={[this.getTableHeader(), ...this.getTableContent()] as CellData[][]}
          valueRenderer={this.getUnderlyingValue}
          valueViewer={this.renderValue}
          dataEditor={this.renderEditor}
          onCellsChanged={this.onCellsChanged as Datasheet.CellsChangedHandler<CellData, CellData>}
          parsePaste={this.parsePaste as any}
        />
      </div>
    )
  }
}

export const TableEditor = injectIntl(TableEditorBase);
