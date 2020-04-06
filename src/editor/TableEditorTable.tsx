import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { PropertyEditor } from '.';
import { PropertyValues } from '../types';
import { SelectProperty } from './SelectProperty';
import { Cell, Column, ColumnHeaderCell, RenderMode, SelectionModes, Table } from "@blueprintjs/table";
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
    this.onDeleteRow = this.onDeleteRow.bind(this);
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

  onDeleteRow(entity: Entity) {
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
    const entities = this.getEntities();
    const visibleProps = this.getVisibleProperties();

    return entities.map(entity => {
      return visibleProps.map(property => {
        // return <PropertyValues values={entity.getProperty(prop)} prop={prop} entitiesList={fullEntitiesList} />

        return ({ entity, property });
      })
    });
  }

  renderValue = ({ entity, property }, i, j) => {
    const { layout } = this.props;

    return (
      <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
    )
  }

  renderEditor = ({ cell, onCommit }) => {
    const { layout } = this.props;
    const { entity, property } = cell;

    // return 'test-editor';
    return (
      <Popover
        minimal
        lazy
        usePortal
        captureDismiss={true}
        isOpen={true}
        popoverClassName="TableEditorTable__popover"
        position={Position.BOTTOM}
        enforceFocus={false}
        modifiers={{
          inner: {enabled: true},
        }}
      >
        <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
        <PropertyEditor entity={entity} property={property} onSubmit={(e) => { console.log('submitting'); this.onEntityChanged(e); onCommit(e); } entitiesList={layout.entities} />
      </Popover>
    )
  }

  renderWriteable() {
    const { actions, intl, layout, schema, updateLayout } = this.props;
    const { visibleProps } = this.state;

    const entities = this.getEntities();
    const numRows = entities.length;

    const otherProps = schema.getEditableProperties()
      .filter(prop => visibleProps.indexOf(prop) < 0)
      .sort(propSort);

    const columnWidths = new Array(visibleProps.length + 2);
    columnWidths[0] = 25;

    const data = this.getRows();
    console.log('datas', data);

    return (
      <Datasheet
        data={data}
        valueRenderer={this.renderValue}
        dataEditor={this.renderEditor}
      />
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
    //                     onClick={() => this.onDeleteRow(entities[i])}
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
    //     <Button
    //       className="TableEditorTable__itemAdd"
    //       text={intl.formatMessage(messages.add, { schema: schema.label })}
    //       icon="new-object"
    //       intent={Intent.PRIMARY}
    //       onClick={() => actions.addVertex({ initialSchema: schema })}
    //     />
    //   </div>
    // );
  }

  renderReadonly() {
    const { layout } = this.props;
    const { visibleProps } = this.state;

    const entities = this.getEntities();
    const numRows = entities.length;

    return (
      <div className="TableEditorTable">
      {/*
        // @ts-ignore */}
        <Table
          numRows={numRows}
          enableGhostCells={false}
          selectionModes={SelectionModes.ROWS_AND_CELLS}
          enableMultipleSelection={true}
          defaultRowHeight={24}
        >
          {visibleProps.map(property => <Column
            key={property.qname}
            id={property.qname}
            name={property.label}
            cellRenderer={(i) => {
              const entity = entities[i];
              return (
                <Cell>
                  <PropertyValues values={entity.getProperty(property)} prop={property} entitiesList={layout.entities} />
                </Cell>
              );
            }}
          />)}
        </Table>
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
