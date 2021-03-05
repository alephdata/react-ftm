import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import isEmpty from 'lodash/isEmpty'

import { IEntityContext } from 'contexts/IEntityContext';
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { EntityChanges } from 'components/common/types';
import { EntityTable } from 'components/EntityTable';
import { Button, Drawer, Position } from "@blueprintjs/core";
import { Entity } from "@alephdata/followthemoney";

import "./TableView.scss"

interface ITableViewProps {
  entityContext: IEntityContext
  toggleTableView: () => void
  fitToSelection: () => void
}

class TableViewBase extends React.Component<ITableViewProps & PropsFromRedux> {
  static contextType = GraphContext;

  constructor(props: ITableViewProps & PropsFromRedux) {
    super(props);

    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.visitEntity = this.visitEntity.bind(this);
    this.onEntitiesUpdate = this.onEntitiesUpdate.bind(this);
  }

  onSelectionChange(entityIds: Array<string>, options: any) {
    const { layout, updateLayout } = this.context;
    layout.selectByEntityIds(entityIds, options);
    updateLayout(layout, null, { clearSearch: true });
  }

  visitEntity(entity: Entity | string) {
    const { fitToSelection, toggleTableView } = this.props;
    const entityId = typeof entity === 'string' ? entity : entity.id;
    if (entityId) {
      this.onSelectionChange([entityId], { additional: false });
      toggleTableView();
      fitToSelection();
    }
  }

  onEntitiesUpdate(entityChanges: EntityChanges) {
    const { layout, updateLayout, viewport } = this.context;
    const { entities } = this.props;

    if (!isEmpty(entityChanges)) {
      if (entityChanges.created) {
        layout.layout([...entityChanges.created, ...entities.results], viewport.center);
        layout.selectByEntityIds(entityChanges.created.map((e: Entity) => e.id));
      } else {
        layout.layout(entities.results);
      }
      updateLayout(layout, entityChanges, { modifyHistory: true });
    }
  }

  render() {
    const { layout, writeable } = this.context;
    const { entityContext, toggleTableView } = this.props;

    return (
      <Drawer
        className="TableView"
        isOpen={true}
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
        <EntityTable
          entityContext={entityContext}
          visitEntity={this.visitEntity}
          selection={layout.getSelectedEntityIds()}
          onSelectionChange={(entityIds: Array<string>, forceVal: boolean) => this.onSelectionChange(entityIds, { forceVal, additional: true})}
          updateFinishedCallback={this.onEntitiesUpdate}
          writeable={writeable}
        />
      </Drawer>
    )
  }
}

const mapStateToProps = (state: any, ownProps: ITableViewProps) => {
  const { entityContext } = ownProps;

  return ({
    entities: entityContext.selectEntities(state),
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const TableView = connector(TableViewBase)
