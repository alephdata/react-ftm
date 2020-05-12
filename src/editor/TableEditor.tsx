import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import _ from 'lodash';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from './PropertyEditor';
import { Property } from '../types';
import { EntityManager } from '../EntityManager';
import { SelectProperty } from './SelectProperty';
import { TruncatedFormat } from "@blueprintjs/table";
import { Button, Checkbox, Classes, Icon, Intent, Popover, Position, Tooltip } from "@blueprintjs/core";
import { Entity, Property as FTMProperty, Schema, Value, Values } from "@alephdata/followthemoney";
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

const ESC_KEY = 27;

const readOnlyCellProps = { readOnly: true, disableEvents: true, forceComponent: true };
const getCellBase = (type: string) => ({
  className: type,
  ...(type !== 'property' ? readOnlyCellProps : {})
})

const propSort = (a:FTMProperty, b:FTMProperty) => (a.label > b.label ? 1 : -1);

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
  visitEntity?: (entity: Entity) => void
}

interface ITableEditorState {
  addedColumns: Array<FTMProperty>
  shouldCommit: boolean
  headerRow: CellData[]
  topAddRows: CellData[][]
  entityRows: CellData[][]
  prependedIds: string[]
}

class TableEditorBase extends React.Component<ITableEditorProps, ITableEditorState> {
  private keyDownListener: any;

  constructor(props:ITableEditorProps) {
    super(props);

    this.state = {
      addedColumns: [],
      headerRow: [],
      topAddRows: [],
      entityRows: [],
      shouldCommit: false,
      prependedIds: [],
    }

    this.onShowTopAddRow = this.onShowTopAddRow.bind(this);
    this.onAddColumn = this.onAddColumn.bind(this);
    this.getVisibleProperties = this.getVisibleProperties.bind(this);
    this.getNonVisibleProperties = this.getNonVisibleProperties.bind(this);
  }

  componentDidMount() {
    this.regenerateTable();
  }

  componentDidUpdate(prevProps: ITableEditorProps, prevState: ITableEditorState) {
    const { entities, isPending, selection, sort, writeable } = this.props;
    const { addedColumns } = this.state;

    const entitiesDeleted = prevProps.entities.length > entities.length;
    const entitiesAdded = prevProps.entities.length < entities.length;
    const sortChanged = prevProps.sort?.field !== sort?.field || prevProps.sort?.direction !== sort?.direction;
    const selectionChanged = prevProps.selection !== selection;

    if (prevState.addedColumns !== addedColumns || sortChanged || entitiesDeleted) {
      this.regenerateTable();
    } else if (entitiesAdded) {
      this.appendAdditionalEntities(prevProps.entities);
    } else if (writeable && selectionChanged) {
      this.reflectUpdatedSelection();
    }
  }

  regenerateTable = () => {
    this.setState({
      topAddRows: [],
      headerRow: this.getHeaderRow(),
      entityRows: this.getEntityRows(),
      prependedIds: [],
    });
  }

  appendAdditionalEntities(prevEntities: Array<Entity>) {
    const { entities } = this.props;
    const { prependedIds } = this.state;
    let newEntities = _.differenceBy(entities, prevEntities, e => e.id);
    if (prependedIds.length) {
      newEntities = newEntities.filter(e => (prependedIds.indexOf(e.id) < 0));
    }
    const visibleProps = this.getVisibleProperties();

    this.setState(({ entityRows }) => ({
      headerRow: this.getHeaderRow(),
      entityRows: [...entityRows, ...newEntities.map(e => this.getEntityRow(e, visibleProps))]
    }));

  }

  reflectUpdatedSelection() {
    const { visitEntity } = this.props;
    const checkboxCellIndex = visitEntity ? 1 : 0;
    this.setState(({ entityRows }) => ({
      entityRows: entityRows?.map(row => {
        const checkboxCell = row[checkboxCellIndex];
        const newCheckboxCell = checkboxCell?.data?.entity ? this.getCheckboxCell(checkboxCell.data.entity) : checkboxCell;
        row.splice(checkboxCellIndex, 1, newCheckboxCell);
        return row;
      })
    }));
  }

  getVisibleProperties() {
    const { entities, schema } = this.props;
    const { addedColumns } = this.state;

    const requiredProps = schema.required.map(name => schema.getProperty(name));
    const featuredProps = schema.getFeaturedProperties();
    const filledProps = entities.reduce((acc, entity: Entity) => [...acc, ...entity.getProperties()], [] as FTMProperty[]);

    const fullList = _.uniqBy([...requiredProps, ...featuredProps, ...filledProps, ...addedColumns], 'name');

    return fullList.filter(prop => (!prop.stub && !prop.hidden));
  }

  getNonVisibleProperties() {
    const { schema } = this.props;
    const visibleProps = this.getVisibleProperties();

    return schema.getEditableProperties()
      .filter(prop => visibleProps.indexOf(prop) < 0)
      .sort(propSort);
  }

  // Table data initialization

  getHeaderRow = () => {
    const { visitEntity, writeable } = this.props;
    const visibleProps = this.getVisibleProperties();

    const headerCells = visibleProps.map(property => this.getHeaderCell(property));
    const entityLinkPlaceholder = visitEntity != undefined ? [this.getEntityLinkCell()] : [];

    if (writeable) {
      const addEntityCell = this.getAddEntityCell();
      const propSelectCell = this.getPropSelectCell();
      return [...entityLinkPlaceholder, addEntityCell, ...headerCells, propSelectCell];
    } else {
      return [...entityLinkPlaceholder, ...headerCells];
    }
  }

  getEntityRows = () => {
    const { entities, writeable } = this.props;
    const visibleProps = this.getVisibleProperties();

    return entities.map(e => this.getEntityRow(e, visibleProps));
  }

  getEntityRow = (entity: Entity, visibleProps: Array<FTMProperty>) => {
    const { visitEntity, writeable } = this.props;

    const propCells = visibleProps.map(property => {
      let values = entity.getProperty(property.name);
      if (property.type.name === 'entity') {
        values = values.map((v:Value) => typeof v === 'string' ? v : v.id);
      }

      return ({
        ...getCellBase('property'),
        readOnly: !writeable,
        value: values,
        data: { entity, property },
      })
    });

    const entityLinkCell = visitEntity != undefined ? [this.getEntityLinkCell(entity)] : [];

    if (writeable) {
      const checkbox = this.getCheckboxCell(entity);
      return [...entityLinkCell, checkbox, ...propCells];
    } else {
      return [...entityLinkCell, ...propCells];
    }
  }

  getCheckboxCell = (entity: Entity) => {
    const { selection } = this.props;
    const isSelected = selection.some(e => e.id === entity.id);
    return { ...getCellBase('checkbox'), data: { entity, isSelected }}
  }

  getEntityLinkCell = (entity?: Entity) => {
    return ({
      ...getCellBase('entity-link'),
      ...(entity ? {component: this.renderEntityLinkButton({ entity })} : {})
    })
  }

  getHeaderCell = (property: FTMProperty) => {
    return { ...getCellBase('header'), component: this.renderColumnHeader(property) };
  }

  getAddEntityCell = () => {
    return { ...getCellBase('add-button'), component: this.renderAddButton() };
  }

  getPropSelectCell = () => {
    return { ...getCellBase('prop-select'), component: this.renderPropertySelect() };
  }

  getSkeletonRows = () => {
    const { visitEntity, writeable } = this.props;
    const visibleProps = this.getVisibleProperties();
    const skeletonRowCount = 8;
    const entityLinkPlaceholder = visitEntity != undefined ? [this.getEntityLinkCell()] : [];
    const actionCellPlaceholder = writeable ? [{...getCellBase('checkbox')}] : [];
    const skeletonRow = [
      ...entityLinkPlaceholder,
      ...actionCellPlaceholder,
      ...(visibleProps.map(() => ({ ...getCellBase('skeleton'), component: this.renderSkeleton() })))
    ];

    return (Array.from(Array(skeletonRowCount).keys())).map(() => skeletonRow);
  }

  getAddRow = () => {
    const { visitEntity } = this.props;
    const entityLinkPlaceholder = visitEntity != undefined ? [this.getEntityLinkCell()] : [];
    const visibleProps = this.getVisibleProperties();

    const addRowCells = visibleProps.map(property => ({
      ...getCellBase('property'),
      data: { entity: null, property }
    }));

    return [...entityLinkPlaceholder, {...getCellBase('checkbox')}, ...addRowCells]
  }

  // Table renderers

  renderValue = ({ cell, row }: Datasheet.ValueViewerProps<CellData, any>) => {
    if (!cell.data) return null;
    const { entity, property } = cell.data;

    if (entity && property) {
      return this.renderPropValue(cell.data)
    }
    if (entity) {
      return this.renderCheckbox(cell.data)
    }
    if (property) {
      return <span>—</span>
    }
    return null;
  }

  renderPropValue = ({entity, property}: {entity: Entity, property: FTMProperty}) => (
    <div className="TableEditor__overflow-container">
      <Property.Values
        values={entity.getProperty(property.name)}
        prop={property}
        resolveEntityReference={this.props.entityManager.resolveEntityReference}
      />
    </div>
  );

  renderEditor = ({ cell, onCommit, onChange, onKeyDown, onRevert }: Datasheet.DataEditorProps<CellData, any>) => {
    const { entityManager, schema } = this.props;
    const { shouldCommit } = this.state;
    const { entity, property } = cell.data;

    if (!property) return null;

    if (shouldCommit) {
      this.setState({ shouldCommit: false });
      if (this.keyDownListener) {
        document.removeEventListener('keydown', this.keyDownListener);
        this.keyDownListener = null;
      }
      onCommit(null);
    }

    if (!this.keyDownListener) {
      this.keyDownListener = (e:any) => { if (e.which === ESC_KEY) onRevert() };
      document.addEventListener('keydown', this.keyDownListener);
    }

    return (
      <PropertyEditor
        entity={entity || new Entity(entityManager.model, { schema, id: `${Math.random()}` })}
        property={property}
        onChange={(newVal) => onChange(newVal)}
        onSubmit={(ent) => { onChange(ent.getProperty(property)); this.setState({ shouldCommit: true }); }}
        usePortal={false}
        fetchEntitySuggestions={entityManager.getEntitySuggestions}
        resolveEntityReference={entityManager.resolveEntityReference}
      />
    );
  }

  renderColumnHeader = (property: FTMProperty) => {
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

  renderCheckbox = ({ entity, isSelected }: {entity: Entity, isSelected: boolean}) => {
    return (
      <Checkbox checked={isSelected} onChange={() => this.props.updateSelection(entity)} />
    );
  }

  renderEntityLinkButton = ({ entity }: {entity: Entity}) => {
    const { visitEntity } = this.props;
    if (visitEntity == undefined) return null;

    return (
      <Button minimal small icon="fullscreen" onClick={() => visitEntity(entity)} />
    );
  }

  renderSkeleton = () => {
    const skeletonLength = 15;
    return (
      <span className={Classes.SKELETON}>{'-'.repeat(skeletonLength)}</span>
    );
  }

  // Change handlers

  handleNewRow = (row: number, changes: any) => {
    const { intl, schema } = this.props;
    const { entityRows, topAddRows } = this.state;
    const visibleProps = this.getVisibleProperties();
    const entityData = { schema, properties: {} };
    const shouldPrepend = row <= topAddRows.length;

    changes.forEach(({ cell, value, col }: any) => {
      const property = cell?.data?.property || entityRows[0][col]?.data?.property;
      const error = validate({ schema, property, values: value });

      if (error) {
        showErrorToast(intl.formatMessage(error));
      } else {
        entityData.properties[property.name] = value;
      }
    })

    this.props.entityManager.createEntity(entityData).then(entity => {
      if (shouldPrepend) {
        const visibleProps = this.getVisibleProperties();
        const entityId = entity.id;
        this.setState(({ entityRows, prependedIds, topAddRows }) => {
          topAddRows.pop();
          return ({
            entityRows: [this.getEntityRow(entity, visibleProps), ...(entityRows.filter((entityRow) => {
              return entityRow[1]?.data?.entity?.id !== entityId
            }))],
            prependedIds: [...prependedIds, entityId],
            topAddRows
          })
        });
      }
    });
  }

  handleExistingRow = (changes: Datasheet.CellsChangedArgs<CellData, any> | Datasheet.CellAdditionsArgs<CellData>) => {
    const { intl, schema } = this.props;

    let changedEntity;
    changes.forEach(({ cell, value, row, col }: any) => {
      const { entity, property } = cell.data;
      const error = validate({ schema: entity.schema, property, values: value});

      if (error) {
        showErrorToast(intl.formatMessage(error));
      } else {
        if (value === "") {
          entity.properties.set(entity.schema.getProperty(property.name), []);
          cell.value = "";
        } else {
          entity.properties.set(entity.schema.getProperty(property.name), value);
          cell.value = value.map((v:Value) => typeof v === 'string' ? v : v.id);
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
    const fullChangeList = outOfBounds ? [...changeList, ...outOfBounds] : changeList;
    const changesByRow = _.groupBy(fullChangeList, c => c.row);

    Object.entries(changesByRow).forEach(([rowIndex, changes]: [string, any]) => {
      const isExisting = changes[0]?.cell?.data?.entity != null;
      if (isExisting) {
        this.handleExistingRow(changes);
      } else {
        this.handleNewRow(+rowIndex, changes);
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

  onAddColumn(newColumn: FTMProperty) {
    this.setState(({addedColumns}) => ({
      addedColumns: [...addedColumns, newColumn],
    }));
  }

  onShowTopAddRow() {
    this.setState(({ topAddRows }) => ({
      topAddRows: [...topAddRows, this.getAddRow()]
    }));
  }

  render() {
    const { isPending, writeable } = this.props;
    const { headerRow, topAddRows, entityRows } = this.state
    const bottomAddRow = writeable ? [this.getAddRow()] : [];
    const skeletonRows = isPending ? this.getSkeletonRows() : [];
    const tableData = [headerRow, ...topAddRows, ...entityRows, ...skeletonRows, ...bottomAddRow]

    return (
      <div className="TableEditor">
        <Datasheet
          data={tableData}
          valueRenderer={cell => cell.value}
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
