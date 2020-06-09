import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { Viewport } from '../Viewport';
import { GraphUpdateHandler } from '../GraphContext';
import { SchemaSelect } from '../editors';
import { TableViewPanel } from './TableViewPanel';
import { Button, Drawer, Position, TabId, Tab, Tabs } from "@blueprintjs/core";
import { Schema as FTMSchema } from "@alephdata/followthemoney";
import { Schema } from '../types';
import c from 'classnames';

import "./TableView.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_schema',
    defaultMessage: 'Add an entity type',
  },
});

interface ITableViewProps extends WrappedComponentProps {
  isOpen: boolean,
  layout: GraphLayout,
  viewport: Viewport,
  updateLayout: GraphUpdateHandler,
  writeable: boolean,
  toggleTableView: () => void
  fitToSelection: () => void
}

interface ITableViewState {
  activeTabId: TabId,
  schemata: Array<FTMSchema>,
}

export class TableViewBase extends React.Component<ITableViewProps, ITableViewState> {
  constructor(props: ITableViewProps) {
    super(props);

    const { layout } = this.props;
    const schemata = layout.getEntities()
      .map(entity => entity.schema)
      .filter((schema, index, list) => !schema.isEdge && list.indexOf(schema) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const activeTabId = schemata && schemata.length ? schemata[0].name : 0;

    this.state = {
      schemata,
      activeTabId,
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  addSchema(schema: FTMSchema) {
    const schemata = [...this.state.schemata, ...[schema]]
      .sort((a, b) => a.label.localeCompare(b.label))
    this.setState({ schemata, activeTabId: schema.name });
  }

  setActiveTab(newTabId: TabId) {
    this.setState({ activeTabId: newTabId });
  }

  render() {
    const { intl, isOpen, layout, toggleTableView, writeable, ...rest } = this.props;
    const { activeTabId, schemata } = this.state;

    return (
      <Drawer
        className="TableView"
        isOpen={isOpen}
        hasBackdrop={false}
        position={Position.BOTTOM}
        autoFocus={false}
        enforceFocus={false}
        usePortal={false}
      >
        <Button
          className="TableView__close"
          icon="cross"
          minimal
          onClick={toggleTableView}
        />
        <Tabs
          renderActiveTabPanelOnly
          selectedTabId={activeTabId}
          onChange={this.setActiveTab}
        >
          {schemata.map(schema => (
            <Tab
              id={schema.name}
              key={schema.name}
              title={<Schema.Label schema={schema} icon />}
              panel={(
                <TableViewPanel
                  layout={layout}
                  schema={schema}
                  writeable={writeable}
                  toggleTableView={toggleTableView}
                  {...rest}
                />
              )}
            />
          ))}
          {writeable && (
            <div className="TableView__schemaAdd">
              <SchemaSelect
                model={layout.entityManager.model}
                onSelect={schema => this.addSchema(schema)}
                optionsFilter={(schema => !schemata.includes(schema))}
              >
                <Button
                  text={intl.formatMessage(messages.add)}
                  icon="plus"
                />
              </SchemaSelect>
            </div>
          )}
        </Tabs>
      </Drawer>
    )
  }
}

export const TableView = injectIntl(TableViewBase);
