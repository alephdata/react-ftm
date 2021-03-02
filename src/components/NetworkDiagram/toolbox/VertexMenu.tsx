import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { defineMessages } from 'react-intl';
import { Menu, MenuDivider, MenuItem, Spinner } from "@blueprintjs/core"
import { Model, Entity } from "@alephdata/followthemoney";

import { IEntityContext } from 'contexts/EntityContext';
import { modes } from 'components/NetworkDiagram/utils'
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { Count, Schema } from 'types';
import { showSuccessToast, showWarningToast } from 'utils'

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
  expand_success: {
    id: 'toasts.expand_success',
    defaultMessage: `Successfully added {vertices} new
      {vertices, plural, one {node} other {nodes}}
      and {edges} new
      {edges, plural, one {link} other {links}}
      to the diagram`,
  },
  expand_no_effect: {
    id: 'toasts.expand_no_effect',
    defaultMessage: 'All expansion results are already present in the diagram',
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
    this.onExpand = this.onExpand.bind(this);
  }

  componentDidMount() {
    this.fetchIfNeeded();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  fetchIfNeeded() {
    const { entityId, expandResult, queryEntityExpand } = this.props;

    if (!!entityId && !!queryEntityExpand && expandResult?.shouldLoad) {
      queryEntityExpand(entityId, undefined, 0);
    }
  }

  async onExpand (property: string) {
    const { intl, layout, updateLayout, viewport } = this.context;
    const { createEntity, entities, entityId, model, queryEntityExpand } = this.props;
    if (!queryEntityExpand) { return null; }

    const result = await queryEntityExpand(entityId, [property]);
    if (result) {
      const before = layout.getVisibleElementCount();

      const addedEntities = result
        .reduce((entities: Array<Entity>, expandObj: any) => ([...entities, ...expandObj.entities]), [])
        .map((entity: Entity) => { return createEntity(model, entity)?.payload; });

      layout.layout([...entities, ...addedEntities], viewport.center);
      layout.selectByEntityIds(addedEntities.map((e: Entity) => e.id));

      const after = layout.getVisibleElementCount();
      const vDiff = after.vertices - before.vertices;
      const eDiff = after.edges - before.edges;

      if (vDiff || eDiff) {
        showSuccessToast(intl.formatMessage(messages.expand_success, { vertices: vDiff, edges: eDiff }));
      } else {
        showWarningToast(intl.formatMessage(messages.expand_no_effect));
      }

      updateLayout(layout, undefined, { modifyHistory: true })
    }
  }

  getExpandOptionLabel(propString: string | undefined) {
    const { intl } = this.context;
    const { entity } = this.props;

    if (!propString) {
      return { label: intl.formatMessage(messages.expand_all) };
    }
    const property = entity?.schema?.getProperty(propString);
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
    const { entityId, queryEntityExpand } = this.props;

    const propLabel = this.getExpandOptionLabel(property);
    if (!propLabel || !entityId || !queryEntityExpand) return null;

    return (
      <MenuItem
        key={property}
        icon={propLabel.icon || "search-around"}
        onClick={() => this.onExpand(property)}
        text={intl.formatMessage(messages.expand, { property: propLabel.label.toLowerCase() })}
        labelElement={<Count count={count} />}
      />
    )
  }

  renderExpand = () => {
    const { intl } = this.context;
    const { expandResult } = this.props;

    if (expandResult.isPending || !expandResult.results) {
      return <Spinner size={Spinner.SIZE_SMALL} />;
    }

    const totalCount = expandResult.results.reduce(((totalCount: number, obj: any) => totalCount + obj.count), 0);
    if (!totalCount) {
      return <div className="error-text">{intl.formatMessage(messages.expand_none)}</div>;
    }

    const allOption = { count: totalCount, property: null};

    return [allOption, ...expandResult.results].map(this.renderExpandOption);
  }

  renderFull = () => {
    const { intl } = this.context;
    const { setInteractionMode, toggleMenu } = this.props;

    return (
      <>
        <MenuItem
          icon="new-link"
          onClick={() => { setInteractionMode(modes.EDGE_DRAW); toggleMenu(); }}
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
  const { selectEntities, selectEntity, selectEntityExpandResult, selectModel } = entityContext;
  const entityId = contents.vertex?.entityId;

  return ({
    entityId,
    entity: entityId && selectEntity(state, entityId),
    expandResult: entityId && !!selectEntityExpandResult && selectEntityExpandResult(state, entityId),
    model: selectModel(state),
    entities: selectEntities(state),
  });
}

const mapDispatchToProps = (dispatch: any, ownProps: IVertexMenuProps) => {
  const { createEntity, queryEntityExpand } = ownProps.entityContext;

  return ({
    createEntity: (model: Model, entityData: any) => dispatch(createEntity(model, entityData)),
    queryEntityExpand: queryEntityExpand
      ? (entityId: string, properties?: Array<string>, limit?: number) => dispatch(queryEntityExpand(entityId, properties, limit))
      : undefined,
  })
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const VertexMenu = connector(VertexMenuBase)
