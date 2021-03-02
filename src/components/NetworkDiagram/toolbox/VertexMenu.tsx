import * as React from 'react'
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { defineMessages } from 'react-intl';
import { Menu, MenuDivider, MenuItem, Spinner } from "@blueprintjs/core"

import { IEntityContext } from 'contexts/EntityContext';
import { modes } from 'components/NetworkDiagram/utils'
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { Count, Schema } from 'types';

import './VertexMenu.scss';

const messages = defineMessages({
  add_link: {
    id: 'vertex_menu.add_link',
    defaultMessage: 'Add link',
  },
  expand: {
    id: 'vertex_menu.expand',
    defaultMessage: 'Discover {property}',
  },
  expand_all: {
    id: 'vertex_menu.expand_all',
    defaultMessage: 'all links',
  },
  expand_none: {
    id: 'vertex_menu.expand_none',
    defaultMessage: 'No additional links found',
  },
});

interface IVertexMenuProps {
  contents: any
  setInteractionMode: any
  entityContext: IEntityContext
  toggleMenu: any
}

export class VertexMenuBase extends React.Component<IVertexMenuProps & PropsFromRedux> {
  static contextType = GraphContext;
  private menuRef: any | null = null;

  constructor(props: Readonly<IVertexMenuProps & PropsFromRedux>) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.fetchIfNeeded();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  fetchIfNeeded() {
    const { entityId, expandResults, queryEntityExpand } = this.props;

    if (!!entityId && !!queryEntityExpand && expandResults?.shouldLoad) {
      queryEntityExpand(entityId, undefined, 0);
    }
  }

  getExpandOptionLabel(propString: string | undefined) {
    const { entityManager, intl } = this.context;
    const { contents } = this.props;

    if (!propString) {
      return { label: intl.formatMessage(messages.expand_all) };
    }
    const { vertex } = contents;
    const property = entityManager.getEntity(vertex.entityId)?.schema?.getProperty(propString);
    if (property) {
      const schemaForIcon = property.getRange();
      const icon = schemaForIcon ? <Schema.Icon schema={schemaForIcon} /> : null;
      return { label: property.label, icon }
    }
  }

  handleClickOutside(e: MouseEvent) {
    const { toggleMenu } = this.props;
    const target = e.target as Element;
    if (target && this.menuRef && !this.menuRef.contains(target)) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    }
  }

  renderExpandOption = ({ count, property }: {count: number, property: string}) => {
    const { intl } = this.context;
    const { contents, entityId, queryEntityExpand } = this.props;

    const propLabel = this.getExpandOptionLabel(property);
    if (!propLabel || !entityId || !queryEntityExpand) return null;

    return (
      <MenuItem
        key={property}
        icon={propLabel.icon || "search-around"}
        onClick={() => queryEntityExpand(entityId, [property])}
        text={intl.formatMessage(messages.expand, { property: propLabel.label.toLowerCase() })}
        labelElement={<Count count={count} />}
      />
    )
  }

  renderExpand = () => {
    const { intl } = this.context;
    const { contents, expandResults } = this.props;

    console.log('expandResults', expandResults);

    if (!expandResults) {
      return <Spinner size={Spinner.SIZE_SMALL} />;
    }

    const totalCount = expandResults.reduce(((totalCount: number, obj: any) => totalCount + obj.count), 0);
    if (!totalCount) {
      return <div className="error-text">{intl.formatMessage(messages.expand_none)}</div>;
    }

    const allOption = { count: totalCount, property: null};

    return [allOption, ...expandResults].map(this.renderExpandOption);
  }

  renderFull = () => {
    const { intl } = this.context;
    const { setInteractionMode } = this.props;

    return (
      <>
        <MenuItem
          icon="new-link"
          onClick={() => setInteractionMode(modes.EDGE_DRAW)}
          text={intl.formatMessage(messages.add_link)}
        />
        <MenuDivider />
        {this.renderExpand()}
      </>
    );
  }

  render() {
    const { contents } = this.props;
    const { anchor, position, onlyShowExpand } = contents;

    const style = { [anchor]: `${position.y}px`, left: `${position.x}px` };

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

const mapStateToProps = (state: any, ownProps: IVertexMenuProps) => {
  const { contents, entityContext } = ownProps;
  const { selectEntityExpandResult } = entityContext;
  const entityId = contents.vertex?.entityId;

  return ({
    entityId,
    expandResults: entityId && !!selectEntityExpandResult && selectEntityExpandResult(state, entityId)
  });
}

const mapDispatchToProps = (dispatch: any, ownProps: IVertexMenuProps) => {
  const { queryEntityExpand } = ownProps.entityContext;

  return ({
    queryEntityExpand: queryEntityExpand
      ? (entityId: string, properties?: Array<string>, limit?: number) => dispatch(queryEntityExpand(entityId, properties, limit))
      : undefined,
  })
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const VertexMenu = connector(VertexMenuBase)
