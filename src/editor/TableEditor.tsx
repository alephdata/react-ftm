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
    this.renderEditor = this.renderEditor.bind(this);
    this.handleNewRowPaste = this.handleNewRowPaste.bind(this);
    this.handleExistingRowPaste = this.handleExistingRowPaste.bind(this);
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
      visibleProps: [...visibleProps, ...[newColumn]],
    }));
  }

  handleDelete = ({ entity, property }) => {
    entity.properties.set(property, []);
    return entity;
  }

  handlePaste = (cell, value) => {
    const { schema } = this.props;
    const { entity, property } = cell.value;
    entity.properties.set(property, value.split(','));
    return entity;
  }

  getRows = () => {
    const { entities, writeable } = this.props;
    const { visibleProps } = this.state;

    const headerPropColumns = visibleProps.map(property => ({ type: "header", readOnly: true, value: { property } }));
    let header;
    if (writeable) {
      header = [{}, ...headerPropColumns, { type: "action", readOnly: true, value: this.renderPropertySelect() }];
    } else {
      header = headerPropColumns;
    }

    const content = entities.map(entity => {
      const actionColumn = { type: "action", readOnly: true, value: this.renderCheckbox(entity) };
      const propColumns = visibleProps.map(property => ({ type: "property", readOnly: !writeable, value: { entity, property } }))
      if (writeable) {
        return [actionColumn, ...propColumns];
      } else {
        return propColumns;
      }
    });

    const addRowPropColumns = visibleProps.map(property => ({ type: "addNew", value: { entity: null, property } }));
    const addRow = writeable ? [{}, ...addRowPropColumns] : []

    return [header, ...content, addRow];
  }

  renderValue = (cell) => {
    const { type, value } = cell;

    switch (type) {
      case 'header':
        const { property } = value
        return property.label;
      case 'property':
        const { entity, property } = value
        return entity.getProperty(property);
      default:
        return null;
    }
  }

  valueViewer = ({ cell }) => {
    const { type, value } = cell;
    const { sort, sortColumn } = this.props;


    switch (type) {
      case 'action':
        return <div className="action">{value}</div>;
      case 'addNew':
        return (
          <div className="property">
            <span>—</span>
          </div>
        );
      case 'header':
        const isSorted = sort && sort.field === value.property;
        const sortIcon = isSorted ? (sort.direction === 'asc' ? 'caret-up' : 'caret-down') : 'double-caret-vertical';
        return (
          <Button
            onClick={(e) => { sortColumn({field: value.property, direction: (isSorted && sort.direction === 'asc') ? 'desc' : 'asc'})}
            rightIcon={sortIcon}
            minimal
            fill
            text={value.property.label}
            className="header"
          />
        );
      case 'property':
        const { entity, property } = value;

        return (
          <div className="property">
            <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={[]} />
          </div>
        );
      default:
        return null;
    }
  }

  renderEditor({ cell, onCommit, onChange, onKeyDown }) {
    const { entityManager, schema } = this.props;
    const { entity, property } = cell.value;

    let editingEntity, submitHandler;

    if (entity) {
      editingEntity = entity;
      submitHandler = (e) => { entityManager.updateEntity(e); onCommit(); }
    } else {
      editingEntity = new Entity(entityManager.model, { schema });
      submitHandler = (e) => { entityManager.createEntity({ schema, properties: { [property.name]: e.getProperty(property)} }); onCommit(); };
    }

    // workaround placeholder to signal to changeHandler
    onChange('user-edit')

    return (
      <PropertyEditor
        entity={editingEntity}
        property={property}
        onSubmit={submitHandler}
        entitiesList={[]}
        usePortal={false}
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

  renderCell = (props) => {
    const {
      cell, row, col, columns, attributesRenderer,
      selected, editing, updated,
      ...rest
    } = props;

    let style;
    if (cell?.type === 'property' || cell?.type === 'addNew') {
      style = { backgroundColor: 'white' };
    }

    return (
      <td {...rest} style={style}>
        {props.children}
      </td>
    );
  }

  handleNewRowPaste(changes) {
    console.log('in handleNew', changes)
    const { schema } = this.props;
    const { visibleProps } = this.state;

    const entityData = { schema, properties: {} };
    let changed = false;
    changes.forEach(({ cell, value, col }) => {
      if (!cell || cell.type === 'addNew') {
        const property = cell?.value?.property || visibleProps[col-1];
        entityData.properties[property.name] = value.pastedVal.split(',');
        changed = true;
      }
    })
    if (changed) {
      this.props.entityManager.createEntity(entityData);
    }
  }

  handleExistingRowPaste(changes) {
    console.log('in handleExisting', changes);
    let changedEntity;
    changes.forEach(({ cell, value }) => {
      if (value === "") {
        changedEntity = this.handleDelete(cell.value);
      } else if (value.trigger === 'paste') {
        changedEntity = this.handlePaste(cell, value.pastedVal);
      }
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

    console.log('changes by row', changesByRow)

    Object.entries(changesByRow).forEach(([rowIndex, changes]) => {
      if (rowIndex > entityCount) {
        this.handleNewRowPaste(changes);
      } else {
        this.handleExistingRowPaste(changes);
      }
    });
  }

  renderWriteable() {
    const { actions, entities, intl, schema } = this.props;
    const data = this.getRows();
    const entityCount = entities.length;

    return (
      <div className="TableEditor">
        <Datasheet
          data={data}
          valueRenderer={this.renderValue}
          valueViewer={this.valueViewer}
          dataEditor={this.renderEditor}
          onContextMenu={(e, cell) => cell.header ? e.preventDefault() : null}
          cellRenderer={this.renderCell}
          onCellsChanged={this.onCellsChanged}
          parsePaste={(pasted) => {
            const lines = pasted.split(/[\r\n]+/g)
            return lines
              .map(line => line
                .split('\t')
                .map(value => ({ trigger: 'paste', pastedVal: value }) )
              );
          }}
        />
      </div>
    )
  }

  renderReadonly() {
    const data = this.getRows();

    return (
      <div className="TableEditor">
        <Datasheet
          data={data}
          valueRenderer={this.renderValue}
          onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
          cellRenderer={this.renderCell}
        />
      </div>
    );
  }

  render() {
    const { writeable } = this.props;

    if (writeable) {
      return this.renderWriteable();
    } else {
      return this.renderReadonly();
    }
  }
}

export const TableEditor = injectIntl(TableEditorBase);
