import * as React from 'react'
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core'
import { Select, IItemRendererProps } from '@blueprintjs/select'
import { Vertex } from '../layout/Vertex'
// import { SchemaIcon } from '../SchemaIcon'

interface IVertexSelectProps {
  vertices: Vertex[],
  vertex?: Vertex,
  onSelect: (vertex: Vertex) => void
}

const TypedSelect = Select.ofType<Vertex>();

export class VertexSelect extends React.PureComponent<IVertexSelectProps> {
  renderVertex(vertex: Vertex, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={vertex.id}
      // icon={VertexSchemaSelect.getIcon(schema)}
      onClick={handleClick}
      text={vertex.label}
    />
  }

  render() {
    const { vertices, vertex } = this.props
    const label = vertex ? vertex.label : 'Select an entity'

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
          text={label}
          disabled={!vertices.length}
          alignText={Alignment.LEFT}
          // icon={VertexSchemaSelect.getIcon(schema)}
          rightIcon='double-caret-vertical'
        />
      </TypedSelect>
    );
  }
}
