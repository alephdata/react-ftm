import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { Viewport } from '../Viewport';
import { GraphUpdateHandler } from '../GraphContext';
import { SchemaSelect } from '../editors';
import { TableViewPanel } from './TableViewPanel';
import { Button, Drawer, Position, TabId, Tab, Tabs } from "@blueprintjs/core";
import { Schema as FTMSchema, Entity } from "@alephdata/followthemoney";
import { Schema } from '../types';
import c from 'classnames';

import "./TableView.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_schema',
    defaultMessage: 'Add an entity type',
  },
});

interface ITableViewProps {
  isOpen: boolean,
  writeable: boolean,
  toggleTableView: () => void
  fitToSelection: () => void
}

interface ITableViewState {
  activeTabId: TabId,
  schemata: Array<FTMSchema>,
}

export class TableView extends React.Component<ITableViewProps, ITableViewState> {
  constructor(props: ITableViewProps) {
    super(props);

    const { entityManager } = this.context;
    const schemata = entityManager.getEntities()
      .map((entity: Entity) => entity.schema)
      .filter((schema: FTMSchema, index: number, list: any) => !schema.isEdge && list.indexOf(schema) === index)
      .sort((a: FTMSchema, b: FTMSchema) => a.label.localeCompare(b.label));

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
    const { entityManager, intl, layout } = this.context;
    const { isOpen, toggleTableView, writeable, fitToSelection } = this.props;
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
                  schema={schema}
                  writeable={writeable}
                  toggleTableView={toggleTableView}
                  fitToSelection={fitToSelection}
                />
              )}
            />
          ))}
          {writeable && (
            <div className="TableView__schemaAdd">
              <SchemaSelect
                model={entityManager.model}
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
