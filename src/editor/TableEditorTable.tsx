import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from './PropertyEditor';
import { PropertyValues } from '../types';
import { SelectProperty } from './SelectProperty';
import { TruncatedFormat } from "@blueprintjs/table";
import { Button, Icon, Intent, Popover, Position, Tooltip } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";
import Datasheet from 'react-datasheet';

import "./TableEditorTable.scss"

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

interface ITableEditorTableProps extends WrappedComponentProps {
  schema: Schema
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
  writeable: boolean
  actions: any
}

interface ITableEditorTableState {
  visibleProps: Array<Property>
}

class TableEditorTableBase extends React.Component<ITableEditorTableProps, ITableEditorTableState> {
  constructor(props:ITableEditorTableProps) {
    super(props);

    this.state = {
      visibleProps: this.getVisibleProperties(),
    }

    this.onAddColumn = this.onAddColumn.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  getEntities() {
    const { layout, schema, writeable } = this.props;

    return layout.getEntities()
      .filter(e => e.schema === schema);
  }

  getVisibleProperties() {
    const { schema } = this.props;
    const entities = this.getEntities();

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

  onDelete(entity: Entity) {
    const { layout, schema, updateLayout } = this.props;

    layout.removeEntity(entity.id, true);
    updateLayout(layout, { deleted: [entity] }, { modifyHistory: true });
  }

  onAddColumn(newColumn: Property) {
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, ...[newColumn]],
    }));
  }

  onEntityChanged = (nextEntity: Entity) => {
    console.log('in on entity changed');
    const { layout, updateLayout } = this.props;
    layout.updateEntity(nextEntity);
    updateLayout(layout, { updated: [nextEntity] }, { modifyHistory: true });
  }

  getRows = () => {
    const { writeable } = this.props;
    const { visibleProps } = this.state;
    const entities = this.getEntities();

    const headerPropColumns = visibleProps.map(property => ({ type: "header", readOnly: true, value: property.label }));
    let header;
    if (writeable) {
      header = [{}, ...headerPropColumns, { type: "action", readOnly: true, value: this.renderPropertySelect() }];
    } else {
      header = headerPropColumns;
    }

    const content = entities.map(entity => {
      const actionColumn = { type: "action", readOnly: true, value: this.renderDeleteButton(entity) };
      const propColumns = visibleProps.map(property => ({ type: "property", readOnly: !writeable, value: { entity, property } }))
      if (writeable) {
        return [actionColumn, ...propColumns];
      } else {
        return propColumns;
      }

    });
    return [header, ...content];
  }

  renderValue = ({ type, value }, i, j) => {
    const { layout } = this.props;

    switch (type) {
      case 'action':
        return <span className="action">{value}</span>;
      case 'header':
        return <span className="header">{value}</span>;
      case 'property':
        const { entity, property } = value
        return (
          <span className="property">
            <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
          </span>;
        );
    }
  }

  renderEditor = ({ cell, onCommit }) => {
    const { layout } = this.props;
    const { entity, property } = cell.value;

    // return (
    //   <Popover
    //     minimal
    //     lazy
    //     usePortal={false}
    //     isOpen
    //     popoverClassName="TableEditorTable__popover"
    //     position={Position.BOTTOM}
    //     autoFocus={false}
    //     modifiers={{
    //       inner: {enabled: true},
    //     }}
    //   >
    //     <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
    //     <PropertyEditor entity={entity} property={property} onSubmit={(e) => { console.log('submitting', e); this.onEntityChanged(e); onCommit(e); } entitiesList={layout.entities} />
    //   </Popover>
    // )

    return (
      <PropertyEditor entity={entity} property={property} onSubmit={(entity) => { console.log('submitting', entity); this.onEntityChanged(entity); onCommit(entity, new KeyboardEvent('onkeydown', { keyCode: 13 })); } entitiesList={layout.entities} />
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

  renderDeleteButton = (entity) => {
    return (
      <Button
        small
        minimal
        icon="graph-remove"
        onClick={() => this.onDelete(entity)}
      />
    )
  }

  renderCell = (props) => {
    const {
      cell, row, col, columns, attributesRenderer,
      selected, editing, updated,
      ...rest
    } = props;

    let style;
    if (cell?.type === 'property') {
      style = { backgroundColor: 'white' };
    }

    return (
      <td {...rest} style={style}>
        {props.children}
      </td>
    );
  }

  renderWriteable() {
    const { actions, intl, schema } = this.props;
    const data = this.getRows();

    return (
      <div className="TableEditorTable">
        <Datasheet
          data={data}
          valueRenderer={this.renderValue}
          dataEditor={this.renderEditor}
          onContextMenu={(e, cell) => cell.header ? e.preventDefault() : null}
          cellRenderer={this.renderCell}
        />
        <Button
          className="TableEditorTable__itemAdd"
          text={intl.formatMessage(messages.add, { schema: schema.label })}
          icon="new-object"
          intent={Intent.PRIMARY}
          onClick={() => actions.addVertex({ initialSchema: schema })}
        />
      </div>
    )

    // return (
    //   <div className="TableEditorTable">
    //   {/*
    //     // @ts-ignore */}
    //     <Table
    //       numRows={numRows}
    //       enableGhostCells={false}
    //       selectionModes={SelectionModes.ROWS_AND_CELLS}
    //       enableMultipleSelection={false}
    //       columnWidths={columnWidths}
    //       defaultRowHeight={24}
    //     >
    //       <Column
    //         id="remove"
    //         columnHeaderCellRenderer={() => (
    //           <ColumnHeaderCell />
    //         )}
    //         cellRenderer={(i) => {
    //           return (
    //             <Cell className="narrow">
    //               <>
    //                 <Tooltip content={intl.formatMessage(messages.delete)}>
    //                   <Button
    //                     small
    //                     minimal
    //                     icon="graph-remove"
    //                     onClick={() => this.onDelete(entities[i])}
    //                   />
    //                 </Tooltip>
    //               </>
    //             </Cell>
    //           );
    //         }}
    //       />
    //       {visibleProps.map(property => <Column
    //         key={property.qname}
    //         id={property.qname}
    //         name={property.label}
    //         cellRenderer={(i) => {
    //           const entity = entities[i];
    //           return (
    //             <Cell>
    //               {entity && (
    //                 <Popover
    //                   minimal
    //                   lazy
    //                   usePortal
    //                   interactionKind={'click'}
    //                   popoverClassName="TableEditorTable__popover"
    //                   position={Position.BOTTOM}
    //                   autoFocus={false}
    //                   modifiers={{
    //                     inner: {enabled: true},
    //                   }}
    //                 >
    //                   <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
    //                   <PropertyEditor entity={entity} property={property} onSubmit={this.onEntityChanged} entitiesList={layout.entities} />
    //                 </Popover>
    //               )}
    //             </Cell>
    //           );
    //         }}
    //       />)}
    //
    //       <Column
    //         id="add-field"
    //         cellRenderer={() => (
    //           <Cell className="TableEditorTable__ghostCell" interactive />
    //         )}
    //         columnHeaderCellRenderer={() => (
    //           <ColumnHeaderCell>
    //             <SelectProperty
    //               properties={otherProps}
    //               onSelected={this.onAddColumn}
    //               buttonProps={{minimal: true}}
    //             />
    //           </ColumnHeaderCell>
    //         )}
    //       />
    //     </Table>
    //   </div>
    // );
  }

  renderReadonly() {
    const data = this.getRows();

    return (
      <div className="TableEditorTable">
        <Datasheet
          data={data}
          valueRenderer={this.renderValue}
          onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
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

export const TableEditorTable = injectIntl(TableEditorTableBase);
