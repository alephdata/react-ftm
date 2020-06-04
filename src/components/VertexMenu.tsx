import * as React from 'react'
import { defineMessages, WrappedComponentProps } from 'react-intl';
import { Menu, MenuDivider, MenuItem, Spinner } from "@blueprintjs/core"
import c from 'classnames';
import { modes } from '../utils/interactionModes'
import { Count } from '../types';

import './VertexMenu.scss';

const messages = defineMessages({
  add_link: {
    id: 'vertex_menu.add_link',
    defaultMessage: 'Add link',
  },
  expand: {
    id: 'vertex_menu.expand',
    defaultMessage: 'Expand {property}',
  },
  expand_all: {
    id: 'vertex_menu.expand_all',
    defaultMessage: 'All',
  },
});

interface IVertexMenuProps extends WrappedComponentProps {
  isOpen: boolean
  contents: any
  actions: any
  hideMenu: any
}

export class VertexMenu extends React.Component<IVertexMenuProps> {
  private menuRef: any | null = null;

  constructor(props: Readonly<IVertexMenuProps>) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getExpandOptionLabel(propString: string | undefined) {
    const { contents, intl } = this.props;

    if (!propString) {
      return intl.formatMessage(messages.expand_all);
    }
    const { vertex } = contents;
    const property = vertex.getEntity()?.schema?.getProperty(propString);
    return property?.label;
  }

  handleClickOutside(e: MouseEvent) {
    const { hideMenu } = this.props;
    const target = e.target as Element;
    if (target && this.menuRef && !this.menuRef.contains(target)) {
      e.preventDefault();
      e.stopPropagation();
      hideMenu();
    }
  }

  renderExpandOption = ({ count, property }: {count: number, property: string}) => {
    const { actions, contents, intl } = this.props;

    const propLabel = this.getExpandOptionLabel(property);
    if (!propLabel) return null;

    return (
      <MenuItem
        icon="search-around"
        onClick={() => actions.expandVertex(contents.vertex, property)}
        text={intl.formatMessage(messages.expand, { property: propLabel })}
        labelElement={<Count count={count} />}
      />
    )
  }

  renderExpand = () => {
    const { expandResults } = this.props.contents;

    if (!expandResults) {
      return <Spinner size={Spinner.SIZE_SMALL} />;
    }

    const totalCount = expandResults.reduce(((totalCount: number, obj: any) => totalCount + obj.count), 0);
    const allOption = { count: totalCount, property: null};

    return [allOption, ...expandResults].map(this.renderExpandOption);
  }

  renderFull = () => {
    const { actions, config, contents, intl } = this.props;
    const { expandResults } = contents;

    return (
      <>
        <MenuItem
          icon="new-link"
          onClick={() => actions.setInteractionMode(modes.EDGE_DRAW)}
          text={intl.formatMessage(messages.add_link)}
        />
        <MenuDivider />
        {this.renderExpand()}
      </>
    );
  }

  render() {
    const { actions, config, contents, intl, isOpen } = this.props;
    if (!isOpen) return null;
    const { expandResults, position, onlyShowExpand } = contents;

    const style = { top: `${position.y}px`, left: `${position.x}px` };

    return (
      <div className="VertexMenu" style={style} ref={(ref) => { this.menuRef = ref }}>
        <Menu>
          {onlyShowExpand && this.renderExpand()}
          {!onlyShowExpand && this.renderFull()}
        </Menu>
      </div>
    );
  }
}
