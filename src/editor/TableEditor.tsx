import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import _ from 'lodash';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from './PropertyEditor';
import { PropertyValues } from '../types';
import { EntityManager } from '../EntityManager';
import { SelectProperty } from './SelectProperty';
import { TruncatedFormat } from "@blueprintjs/table";
import { Button, Checkbox, Classes, Icon, Intent, Popover, Position, Tooltip } from "@blueprintjs/core";
import { Entity, Property, Schema, Values } from "@alephdata/followthemoney";
import Datasheet from 'react-datasheet';
import { SortType } from './SortType';
import { showErrorToast } from './toaster';
import { validate } from './utils';

import "./TableEditor.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_entity',
    defaultMessage: 'Create a new {schema}',
  },
});

const readOnlyCellProps = { readOnly: true, disableEvents: true, forceComponent: true };
const headerCellProps = { className: "header", ...readOnlyCellProps };
const checkboxCellProps = { className: "checkbox", ...readOnlyCellProps };
const skeletonCellProps = { className: "skeleton", ...readOnlyCellProps };
const propertyCellProps = { className: "property" };

const propSort = (a:Property, b:Property) => (a.label > b.label ? 1 : -1);

export interface CellData extends Datasheet.Cell<CellData, any> {
  className: string
  value?: any,
  displayValue?: any,
  data?: any,
}

interface ITableEditorProps extends WrappedComponentProps {
  entities: Array<Entity>
  schema: Schema
  sort: SortType | null
  sortColumn: (field: string) => void
  selection: Array<Entity>
  updateSelection: (entity: Entity) => void
  entityManager: EntityManager
  writeable: boolean
  isPending?: boolean
  updateFinishedCallback?: () => void
}

interface ITableEditorState {
  visibleProps: Array<Property>
  shouldCommit: boolean
  showTopAddRow: boolean
}

class TableEditorBase extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props:ITableEditorProps) {
    super(props);

    this.state = {
      visibleProps: [],
      shouldCommit: false,
      showTopAddRow: false,
    }

    this.onShowTopAddRow = this.onShowTopAddRow.bind(this);
    this.onAddColumn = this.onAddColumn.bind(this);
  }

  componentDidMount() {
    this.setState({ visibleProps: this.getVisibleProperties() });
  }

  componentDidUpdate(prevProps: ITableEditorProps) {
    if (prevProps.entities?.length !== this.props.entities?.length) {
      this.setState({ visibleProps: this.getVisibleProperties() });
    }
  }

  getVisibleProperties() {
    const { entities, schema } = this.props;

    const requiredProps = schema.required.map(name => schema.getProperty(name));
    const featuredProps = schema.getFeaturedProperties();
    const filledProps = entities.reduce((acc, entity: Entity) => [...acc, ...entity.getProperties()], [] as Property[]);

    const fullList = _.uniqBy([...requiredProps, ...featuredProps, ...filledProps], 'name');

    return fullList.filter(prop => (!prop.stub && !prop.hidden));
  }

  getNonVisibleProperties() {
    const { schema } = this.props;
    const { visibleProps } = this.state;

    return schema.getEditableProperties()
      .filter(prop => visibleProps.indexOf(prop) < 0)
      .sort(propSort);
  }

  // Table data initialization

  getTableHeader = () => {
    const { writeable } = this.props;
    const { showTopAddRow, visibleProps } = this.state;

    const headerCells = visibleProps.map(property => ({ ...headerCellProps, component: this.renderColumnHeader(property) }));
    if (writeable) {
      const actionComponent = showTopAddRow ? null : this.renderAddButton();
      return [{ ...checkboxCellProps, component: actionComponent }, ...headerCells, { ...headerCellProps, component: this.renderPropertySelect() }];
    } else {
      return headerCells;
    }
  }

  getTableContent = () => {
    const { entities, isPending, writeable } = this.props;
    const { showTopAddRow, visibleProps } = this.state;

    const topAddRow = writeable && showTopAddRow ? this.getAddRow() : [];
    const propRows = this.getPropertyRows();
    const skeletonRows = isPending ? this.getSkeletonRows() : [];
    const bottomAddRow = writeable ? this.getAddRow() : [];

    return [...topAddRow, ...propRows, ...skeletonRows, ...bottomAddRow];
  }

  getPropertyRows = () => {
    const { entities, writeable } = this.props;
    const { visibleProps } = this.state;

    return entities.map(entity => {
      const propCells = visibleProps.map(property => ({
        ...propertyCellProps,
        readOnly: !writeable,
        value: entity.getProperty(property.name),
        displayValue: this.renderValue({ entity, property }),
        dataEditor: this.renderEditor,
        data: { entity, property },
      }));

      if (writeable) {
        const checkbox = { ...checkboxCellProps, component: this.renderCheckbox(entity) };
        return [checkbox, ...propCells];
      } else {
        return propCells;
      }
    });
  }

  getSkeletonRows = () => {
    const { visibleProps } = this.state;
    const skeletonRowCount = 8;

    return (Array.from(Array(skeletonRowCount).keys())).map(key => {
      const propCells = visibleProps.map(() => ({ ...skeletonCellProps, component: this.renderSkeleton() }));
      return [{...checkboxCellProps}, ...propCells];
    });
  }

  getAddRow = () => {
    const { visibleProps } = this.state;

    const placeholderCells = visibleProps.map(property => ({
      ...propertyCellProps,
      displayValue: <span>—</span>,
      dataEditor: this.renderEditor,
      data: { entity: null, property }
    }));
    return [[{...checkboxCellProps}, ...placeholderCells]]
  }

  // Table renderers

  renderValue = ({ entity, property }: { entity: Entity, property: Property }) => {
    return <PropertyValues values={entity.getProperty(property.name)} prop={property} resolveEntityReference={this.props.entityManager.resolveEntityReference} />;
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
        usePortal={false}
        fetchEntitySuggestions={entityManager.getEntitySuggestions}
        resolveEntityReference={entityManager.resolveEntityReference}
      />
    );
  }

  renderColumnHeader = (property: Property) => {
    const { sort, sortColumn } = this.props;

    const isSorted = sort && sort.field === property.name;
    const sortIcon = isSorted ? (sort && sort.direction === 'asc' ? 'caret-up' : 'caret-down') : null;
    return (
      <Button
        onClick={() => sortColumn(property.name)}
        rightIcon={sortIcon}
        minimal
        fill
        text={property.label}
      />
    );
  }

  renderAddButton = () => {
    const { intl, schema } = this.props;
    return (
      <Tooltip content={intl.formatMessage(messages.add, { schema: schema.label })}>
        <Button icon="new-object" onClick={this.onShowTopAddRow} intent={Intent.PRIMARY} minimal />
      </Tooltip>
    );
  }

  renderPropertySelect = () => {
    return (
      <SelectProperty
        properties={this.getNonVisibleProperties()}
        onSelected={this.onAddColumn}
        buttonProps={{minimal: true, intent: Intent.PRIMARY }}
      />
    )
  }

  renderCheckbox = (entity: Entity) => {
    const { selection, updateSelection } = this.props;
    const isSelected = selection.some(e => e.id === entity.id);
    return (
      <Checkbox checked={isSelected} onChange={() => updateSelection(entity)} />
    );
  }

  renderSkeleton = () => {
    const skeletonLength = 15;
    return (
      <span className={Classes.SKELETON}>{'-'.repeat(skeletonLength)}</span>
    );
  }

  // Change handlers

  handleNewRow = (changes: any) => {
    const { intl, schema } = this.props;
    const { visibleProps } = this.state;

    const entityData = { schema, properties: {} };

    changes.forEach(({ cell, value, col }: any) => {
      const property = cell?.data?.property || visibleProps[col-1];
      const error = validate({ schema, property, values: value });
      if (error) {
        showErrorToast(intl.formatMessage(error));
      } else {
        entityData.properties[property.name] = value;
      }
    })


    this.props.entityManager.createEntity(entityData);
    this.setState({ showTopAddRow: false });
  }

  handleExistingRow = (changes: Datasheet.CellsChangedArgs<CellData, any> | Datasheet.CellAdditionsArgs<CellData>) => {
    const { intl, schema } = this.props;

    let changedEntity;
    changes.forEach(({ cell, value }: any) => {
      const { entity, property } = cell.data;
      const error = validate({ schema: entity.schema, property, values: value});

      if (error) {
        showErrorToast(intl.formatMessage(error));
      } else {
        console.log('property!', schema.getProperty(property.name), property, schema.getProperty(property.name) === property, entity.schema.getProperty(property.name) === property);
        if (value === "") {
          entity.properties.set(entity.schema.getProperty(property.name), []);
        } else {
          entity.properties.set(entity.schema.getProperty(property.name), value);
        }
        changedEntity = entity;
      }
    })

    if (changedEntity) {
      this.props.entityManager.updateEntity(changedEntity);
    }
  }

  onCellsChanged = (changeList: Datasheet.CellsChangedArgs<CellData, any>, outOfBounds: Datasheet.CellAdditionsArgs<CellData>) => {
    const { entities, updateFinishedCallback } = this.props;
    const { showTopAddRow } = this.state;
    const entityCount = entities.length;
    const fullChangeList = outOfBounds ? [...changeList, ...outOfBounds] : changeList;
    const changesByRow = _.groupBy(fullChangeList, c => c.row);

    Object.entries(changesByRow).forEach(([rowIndex, changes]: [string, any]) => {
      const isExisting = changes[0]?.cell?.data?.entity !== null;
      if (isExisting) {
        this.handleExistingRow(changes);
      } else {
        this.handleNewRow(changes);
      }
    });

    if (updateFinishedCallback) {
      updateFinishedCallback();
    }
  }

  parsePaste(pastedString: string) {
    const lines = pastedString.split(/[\r\n]+/g)
    return lines.map(line => (
      line.split('\t').map(val => val.split(','))
    ));
  }

  onAddColumn(newColumn: Property) {
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, newColumn],
    }));
  }

  onShowTopAddRow() {
    this.setState({ showTopAddRow: true });
  }

  render() {
    const { entities, intl, schema } = this.props;
    const entityCount = entities.length;

    return (
      <div className="TableEditor">
        <Datasheet
          data={[this.getTableHeader(), ...this.getTableContent()] as CellData[][]}
          valueRenderer={cell => cell.value}
          valueViewer={({ cell }) => cell.displayValue || null}
          onCellsChanged={this.onCellsChanged as Datasheet.CellsChangedHandler<CellData, CellData>}
          parsePaste={this.parsePaste as any}
        />
      </div>
    )
  }
}

export const TableEditor = injectIntl(TableEditorBase);
