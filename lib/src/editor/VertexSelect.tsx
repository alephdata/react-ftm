import * as React from 'react'
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core'
import { Select, IItemRendererProps } from '@blueprintjs/select'
import { Vertex } from '../layout/Vertex'
import { SchemaIcon } from '../SchemaIcon'

interface IVertexSelectProps {
  vertices: Vertex[],
  vertex?: Vertex,
  onSelect: (vertex: Vertex) => void
}

const TypedSelect = Select.ofType<Vertex>();

export class VertexSelect extends React.PureComponent<IVertexSelectProps> {

  static getVertexIcon(vertex: Vertex) {
    const entity = vertex.getEntity()
    return vertex.isEntity() && entity ? SchemaIcon.get(entity.schema) : undefined;
  }

  renderVertex(vertex: Vertex, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={vertex.id}
      icon={VertexSelect.getVertexIcon(vertex)}
      onClick={handleClick}
      text={vertex.label}
    />
  }

  render() {
    const { vertices, vertex } = this.props
    return (
      <TypedSelect
        popoverProps={{position: Position.BOTTOM_LEFT, minimal: true}}
        filterable={false}
        items={vertices}
        itemRenderer={this.renderVertex}
        noResults={
          <MenuItem disabled={true} text="No vertices." />
        }
        onItemSelect={this.props.onSelect}
      >
        <Button
          fill
          text={vertex ? vertex.label : 'Select an entity'}
          icon={vertex ? VertexSelect.getVertexIcon(vertex) : undefined}
          disabled={!vertices.length}
          alignText={Alignment.LEFT}
          rightIcon='double-caret-vertical'
        />
      </TypedSelect>
    );
  }
}
