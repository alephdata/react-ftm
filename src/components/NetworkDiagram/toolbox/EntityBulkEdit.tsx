import * as React from 'react'
import { defineMessages } from 'react-intl';
import { Entity } from '@alephdata/followthemoney';
import { Button, Collapse, Intent } from "@blueprintjs/core";
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { ColorPicker, RadiusPicker } from 'editors';
// import { EntityList } from 'components/common';
// import { EntityBulkEdit, EntityViewer, GroupingViewer } from 'NetworkDiagram/toolbox';
import { Vertex } from 'NetworkDiagram/layout'

// import './EntityBulkEdit.scss';

const messages = defineMessages({
  show: {
    id: 'sidebar.edit.show',
    defaultMessage: 'Edit all',
  },
  hide: {
    id: 'sidebar.edit.hide',
    defaultMessage: 'Hide',
  },
});

export interface IEntityBulkEditProps {
  entities: Array<Entity>
  setVerticesColor: (vertices: Array<Vertex>, color: string) => void
}

export interface IEntityBulkEditState {
  isOpen: boolean,
  selectedColor?: string
}

export class EntityBulkEdit extends React.Component<IEntityBulkEditProps, IEntityBulkEditState> {
  static contextType = GraphContext;

  constructor(props: Readonly<IEntityBulkEditProps>) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }

  toggleOpen = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  getVertices() {
    const { layout } = this.context;
    const { entities } = this.props;

    return entities
      .filter(e => !e.schema.edge)
      .map(e => layout.getVertexByEntity(e))
  }

  onColorSelected = (color: string) => {
    console.log('color', color);
    const vertices = this.getVertices();
    console.log(vertices)

    this.setState({ selectedColor: color })
    this.props.setVerticesColor(vertices, color)
  }

  onRadiusSelected = (radius: number) => {
    console.log('radius', radius);
  }

  render() {
    const { intl } = this.context;
    const { isOpen, selectedColor } = this.state;
    return (
      <div className="EntityBulkEdit">
        <Button minimal intent={Intent.PRIMARY} onClick={this.toggleOpen} rightIcon={isOpen ? "chevron-up" : "chevron-down"}>
          {intl.formatMessage(messages[isOpen ? "hide" : "show"])}
        </Button>
        <Collapse isOpen={isOpen}>
          <ColorPicker
            currSelected={selectedColor}
            onSelect={this.onColorSelected}
          />
          <RadiusPicker
            onChange={this.onRadiusSelected}
          />
        </Collapse>
      </div>
    )
  }
}
