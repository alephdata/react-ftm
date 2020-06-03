import * as React from 'react'
import { defineMessages, WrappedComponentProps } from 'react-intl';
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core"
import c from 'classnames';
import { modes } from '../utils/interactionModes'
import { GraphConfig } from '../GraphConfig';


import './VertexMenu.scss';

const messages = defineMessages({
  add_link: {
    id: 'vertex_menu.add_link',
    defaultMessage: 'Add link',
  },
  expand: {
    id: 'vertex_menu.expand',
    defaultMessage: 'Expand',
  },
  expand_prop: {
    id: 'vertex_menu.expand_property',
    defaultMessage: '{property} ({count})',
  },
  expand_all: {
    id: 'vertex_menu.expand_all',
    defaultMessage: 'All',
  },
});

interface IVertexMenuProps extends WrappedComponentProps {
  config: GraphConfig
  isOpen: boolean
  contents: any
  actions: any
}

interface IVertexMenuState {
  mobileExpanded: boolean
}

export class VertexMenu extends React.Component<IVertexMenuProps, IVertexMenuState> {
  constructor(props: Readonly<IVertexMenuProps>) {
    super(props);

  }

  renderExpandOption = ({ count, property }) => {
    const { actions, contents, intl } = this.props;
    const propLabel = property || intl.formatMessage(messages.expand_all);

    return (
      <MenuItem
        icon="search-around"
        onClick={() => actions.expandVertex(contents.vertex, property)}
        text={intl.formatMessage(messages.expand_prop, { count, property: propLabel })}
      />
    )
  }

  renderExpandOptions = () => {
    const { expandResults } = this.props.contents;
    const totalCount = expandResults.reduce(((totalCount, obj) => totalCount + obj.count), 0);
    const allOption = { count: totalCount, property: null};

    return [allOption, ...expandResults].map(this.renderExpandOption);
  }

  render() {
    const { actions, config, contents, intl, isOpen } = this.props;
    if (!isOpen) return null;
    const { expandResults, vertex, position } = contents;

    const style = { top: `${position.y}px`, left: `${position.x}px` };

    return (
      <div className="VertexMenu" style={style}>
        <Menu>
          <MenuItem
            icon="new-link"
            onClick={() => actions.setInteractionMode(modes.EDGE_DRAW)}
            text={intl.formatMessage(messages.add_link)}
          />
          <MenuItem
            icon="search-around"
            text={intl.formatMessage(messages.expand)}
            disabled={!expandResults}
          >
            {expandResults && this.renderExpandOptions()}
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
