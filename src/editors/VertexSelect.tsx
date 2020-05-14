import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core'
import {Select, IItemRendererProps, ItemPredicate} from '@blueprintjs/select'
import { Vertex } from '../layout/Vertex'
import { Schema } from '../types'
import {matchText} from "../utils";

const messages = defineMessages({
  disabled: {
    id: 'editor.vertex_select.disabled',
    defaultMessage: 'No vertices',
  },
  placeholder: {
    id: 'editor.vertex_select.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IVertexSelectProps extends WrappedComponentProps {
  vertices: Vertex[],
  vertex?: Vertex,
  onSelect: (vertex: Vertex) => void
}

const TypedSelect = Select.ofType<Vertex>();

class VertexSelect extends React.PureComponent<IVertexSelectProps> {
  getVertexIcon = (vertex: Vertex) => {
    if (vertex.isEntity()) {
      const entity = vertex.getEntity()
      if (entity) {
        return <Schema.Icon schema={entity.schema} />
      }
    }
    return undefined;
  }

  itemPredicate: ItemPredicate<Vertex> = (query: string, vertex: Vertex) => {
    return matchText(vertex.label, query)
  };

  renderVertex = (vertex: Vertex, { handleClick, modifiers }: IItemRendererProps) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    const icon = this.getVertexIcon(vertex);

    return <MenuItem
      active={modifiers.active}
      key={vertex.id}
      icon={icon}
      onClick={handleClick}
      text={vertex.label}
    />
  }

  render() {
    const { intl, vertices, vertex } = this.props;

    return (
      <TypedSelect
        itemPredicate={this.itemPredicate}
        popoverProps={{
          position: Position.BOTTOM_LEFT,
          minimal: true,
          targetProps: {style: {width: '100%'}}
        }}
        filterable={true}
        items={vertices}
        itemRenderer={this.renderVertex}
        noResults={
          <MenuItem disabled={true} text={intl.formatMessage(messages.disabled)} />
        }
        onItemSelect={this.props.onSelect}
      >
        <Button
          fill
          text={vertex ? vertex.label : intl.formatMessage(messages.placeholder)}
          icon={vertex ? this.getVertexIcon(vertex) : undefined}
          disabled={!vertices.length}
          alignText={Alignment.LEFT}
          rightIcon='double-caret-vertical'
        />
      </TypedSelect>
    );
  }
}

export default injectIntl(VertexSelect);
