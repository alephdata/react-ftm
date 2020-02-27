import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { VertexSchemaSelect } from '.';
import { TableEditorTable } from './TableEditorTable';
import { Button, Classes, Drawer, Icon, Position, Tab, TabId, Tabs } from "@blueprintjs/core";
import { Entity, Schema } from "@alephdata/followthemoney";
import c from 'classnames';

import "./TableEditor.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_schema',
    defaultMessage: 'Add an entity type',
  },
});


interface ITableEditorProps extends WrappedComponentProps {
  isOpen: boolean,
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
  writeable: boolean,
  actions: any,
}

interface ITableEditorState {
  activeTabId: TabId,
  schemata: Array<Schema>,
}

export class TableEditorBase extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props: ITableEditorProps) {
    super(props);

    const { layout } = this.props;
    const schemata = layout.getEntities()
      .map(entity => entity.schema)
      .filter((schema, index, list) => !schema.isEdge && list.indexOf(schema) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const activeTabId = schemata && schemata.length ? schemata[0].name : 0;

    this.state = { schemata, activeTabId };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  addSchema(schema: Schema) {
    const schemata = [...this.state.schemata, ...[schema]]
      .sort((a, b) => a.label.localeCompare(b.label))
    this.setState({ schemata, activeTabId: schema.name });
  }

  setActiveTab(newTabId: TabId) {
    this.setState({ activeTabId: newTabId });
  }

  render() {
    const { actions, intl, isOpen, layout, updateLayout, writeable } = this.props;
    const { activeTabId, schemata } = this.state;

    return (
      <Drawer
        position={Position.BOTTOM}
        icon="th"
        isOpen={isOpen}
        canOutsideClickClose
        title="Table viewer"
        onClose={actions.toggleTableView}
        style={{ height: '60%' }}
        portalClassName="VisGraph__table-container"
      >
        <div className={c('TableEditor', Classes.DRAWER_BODY)}>
          <Tabs
            vertical
            renderActiveTabPanelOnly
            selectedTabId={activeTabId}
            onChange={this.setActiveTab}
          >
            {schemata.map(schema => (
                <Tab
                  id={schema.name}
                  key={schema.name}
                  title={schema.plural}
                  panel={(
                    <TableEditorTable
                      schema={schema}
                      layout={layout}
                      updateLayout={updateLayout}
                      writeable={writeable}
                      actions={actions}
                    />
                  )}
                />
            ))}
            {writeable && (
              <div className="TableEditor__schemaAdd">
                <VertexSchemaSelect
                  model={layout.entityManager.model}
                  onSelect={schema => this.addSchema(schema)}
                  optionsFilter={(schema => !schemata.includes(schema))}
                >
                  <Button
                    text={intl.formatMessage(messages.add)}
                    icon="plus"
                  />
                </VertexSchemaSelect>
              </div>
            )}
          </Tabs>
        </div>
      </Drawer>
    )
  }
}

export const TableEditor = injectIntl(TableEditorBase);
