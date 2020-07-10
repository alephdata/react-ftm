import * as React from 'react'
import { defineMessages } from 'react-intl';
import {
  AnchorButton,
  Boundary,
  Button,
  ButtonGroup,
  Classes,
  Colors,
  Divider,
  InputGroup,
  Intent,
  Menu,
  OverflowList,
  Popover,
  Tooltip,
} from "@blueprintjs/core"
import c from 'classnames';
import { IGraphContext } from '../../GraphContext';
import { GraphLogo } from '../../GraphLogo';
import { SearchBox } from '../';
import { filterVerticesByText, modes} from '../../utils';
import {
  GraphLayout,
  Point,
  Rectangle,
  centerAround,
  positionSelection,
} from "../../layout";
import ToolbarButtonGroup from './ToolbarButtonGroup';
import { IToolbarButton, IToolbarButtonGroup } from './common';

import { History } from '../../History';

import './Toolbar.scss';

const messages = defineMessages({
  tooltip_undo: {
    id: 'tooltip.undo',
    defaultMessage: 'Undo',
  },
  tooltip_redo: {
    id: 'tooltip.redo',
    defaultMessage: 'Redo',
  },
  tooltip_add_entities: {
    id: 'tooltip.add_entities',
    defaultMessage: 'Add entities',
  },
  tooltip_add_edges: {
    id: 'tooltip.add_edges',
    defaultMessage: 'Add link',
  },
  tooltip_expand: {
    id: 'tooltip.expand',
    defaultMessage: 'Discover links',
  },
  tooltip_delete: {
    id: 'tooltip.delete',
    defaultMessage: 'Delete selection',
  },
  tooltip_group: {
    id: 'tooltip.group',
    defaultMessage: 'Group selection',
  },
  tooltip_ungroup: {
    id: 'tooltip.ungroup',
    defaultMessage: 'Ungroup selection',
  },
  tooltip_select_mode: {
    id: 'tooltip.select_mode',
    defaultMessage: 'Toggle select mode',
  },
  tooltip_pan_mode: {
    id: 'tooltip.pan_mode',
    defaultMessage: 'Toggle pan mode',
  },
  tooltip_layouts: {
    id: 'tooltip.layouts',
    defaultMessage: 'Layouts',
  },
  tooltip_layout_horizontal: {
    id: 'tooltip.layout_horizontal',
    defaultMessage: 'Align horizontal',
  },
  tooltip_layout_vertical: {
    id: 'tooltip.layout_vertical',
    defaultMessage: 'Align vertical',
  },
  tooltip_layout_circle: {
    id: 'tooltip.layout_circle',
    defaultMessage: 'Arrange as circle',
  },
  tooltip_layout_hierarchy: {
    id: 'tooltip.layout_hierarchy',
    defaultMessage: 'Arrange as hierarchy',
  },
  tooltip_layout_auto: {
    id: 'tooltip.layout_auto',
    defaultMessage: 'Auto-layout',
  },
  tooltip_layout_center: {
    id: 'tooltip.layout_center',
    defaultMessage: 'Center',
  },
  tooltip_sidebar_view: {
    id: 'tooltip.sidebar_view',
    defaultMessage: 'Show sidebar',
  },
  tooltip_table_view: {
    id: 'tooltip.table_view',
    defaultMessage: 'Show table',
  },
  tooltip_export_svg: {
    id: 'tooltip.export_svg',
    defaultMessage: 'Export as SVG',
  },
  tooltip_settings: {
    id: 'tooltip.settings',
    defaultMessage: 'Settings',
  },
});

interface IToolbarProps extends IGraphContext {
  actions: any,
  history: History,
  interactionMode: string,
  showEditingButtons: boolean,
  searchText: string,
  tableView: boolean,
  logo?: GraphLogo,
}

export class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onSetInteractionMode = this.onSetInteractionMode.bind(this)
    this.onPosition = this.onPosition.bind(this)
    this.itemRenderer = this.itemRenderer.bind(this)
    this.overflowListRenderer = this.overflowListRenderer.bind(this)
  }

  onSetInteractionMode(newMode: string) {
    const { layout, updateLayout, actions } = this.props
    actions.setInteractionMode(newMode)
    updateLayout(layout)
  }

  onPosition(type: string) {
    const { actions, layout, updateLayout } = this.props;
    updateLayout(positionSelection(layout, type), null, { modifyHistory:true })
    actions.fitToSelection();
  }

  itemRenderer(buttonGroup:IToolbarButtonGroup, i:number, visible: boolean) {
    const { config } = this.props.layout;

    return (
      <React.Fragment key={i}>
        {i !== 0 && <Divider />}
        <ToolbarButtonGroup
          buttonGroup={buttonGroup}
          visible={visible}
          editorTheme={config.editorTheme}
        />
      </React.Fragment>
    );
  }

  overflowListRenderer(overflowItems: IToolbarButtonGroup) {
    const { config } = this.props.layout;
    const menuContent = overflowItems.map((item:IToolbarButtonGroup, i:number) => this.itemRenderer(item, i, false));
    return (
      <Popover
        content={<Menu>{menuContent}</Menu>}
        position="bottom"
        minimal
        popoverClassName={c("Toolbar__menu", `theme-${config.editorTheme}`)}
        boundary="viewport"
      >
        <Button icon="double-chevron-right" />
      </Popover>
    );
  }

  render() {
    const { intl, layout, updateLayout, actions, history, interactionMode, showEditingButtons, logo, searchText, tableView } = this.props
    const vertices = this.props.layout.getSelectedVertices()
    const hasSelection = layout.hasSelection()
    const canAddEdge = vertices.length > 0 && vertices.length <= 2
    const canExpandSelection = layout.entityManager.hasExpand && layout.getSelectedVertices().length === 1
    const canGroupSelection = layout.getSelectedVertices().length > 1
    const canUngroupSelection = layout.getSelectedGroupings().length >= 1
    const showSearch = layout.vertices && layout.vertices.size > 0

    const buttons: Array<IToolbarButtonGroup> = [
      [
        {
          helpText: intl.formatMessage(messages.tooltip_undo),
          icon: "undo",
          onClick: () => actions.navigateHistory(History.BACK),
          disabled: !history.canGoTo(History.BACK),
          writeableOnly: true,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_redo),
          icon: "redo",
          onClick: () => actions.navigateHistory(History.FORWARD),
          disabled: !history.canGoTo(History.FORWARD),
          writeableOnly: true,
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_add_entities),
          icon: "new-object",
          onClick: () => this.onSetInteractionMode(modes.VERTEX_CREATE),
          writeableOnly: true,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_add_edges),
          icon: "new-link",
          onClick: () => this.onSetInteractionMode(modes.EDGE_CREATE),
          disabled: !canAddEdge,
          writeableOnly: true,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_delete),
          icon: "graph-remove",
          onClick: () => actions.removeSelection(),
          disabled: !hasSelection,
          writeableOnly: true,
        },
        ...(layout.entityManager.hasExpand ? (
          [{
            helpText: intl.formatMessage(messages.tooltip_expand),
            icon: "search-around",
            onClick: (e: React.MouseEvent) => {
              const selectedVertex = vertices[0];

              if (selectedVertex.isEntity()) {
                const isTopToolbar = layout.config.toolbarPosition === 'top';
                const posX = isTopToolbar ? e.clientX - 10 : 70;
                const posY = isTopToolbar ? 40 : e.clientY - 10;

                actions.showVertexMenu(selectedVertex, new Point(posX, posY), true);
              }
            },
            disabled: !canExpandSelection,
            writeableOnly: true,
          }]
        ) : [])
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_group),
          icon: "group-objects",
          onClick: () => this.onSetInteractionMode(modes.GROUPING_CREATE),
          disabled: !canGroupSelection,
          writeableOnly: true,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_ungroup),
          icon: "ungroup-objects",
          onClick: () => actions.ungroupSelection(),
          disabled: !canUngroupSelection,
          writeableOnly: true,
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_select_mode),
          icon: "select",
          disabled: interactionMode !== modes.PAN,
          onClick: () => this.onSetInteractionMode(modes.SELECT),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_pan_mode),
          icon: "hand",
          disabled: interactionMode === modes.PAN,
          onClick: () => this.onSetInteractionMode(modes.PAN),
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_sidebar_view),
          icon: "panel-stats",
          disabled: !tableView,
          onClick: () => actions.toggleTableView(),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_table_view),
          icon: "th",
          disabled: tableView,
          onClick: () => actions.toggleTableView(),
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_layouts),
          icon: "layout",
          writeableOnly: true,
          subItems: [
            {
              helpText: intl.formatMessage(messages.tooltip_layout_horizontal),
              icon: "layout-linear",
              onClick: () => this.onPosition('alignHorizontal'),
            },
            {
              helpText: intl.formatMessage(messages.tooltip_layout_vertical),
              icon: "drag-handle-vertical",
              onClick: () => this.onPosition('alignVertical'),
            },
            {
              helpText: intl.formatMessage(messages.tooltip_layout_circle),
              icon: "layout-circle",
              onClick: () => this.onPosition('alignCircle'),
            },
            {
              helpText: intl.formatMessage(messages.tooltip_layout_hierarchy),
              icon: "layout-hierarchy",
              onClick: () => this.onPosition('arrangeTree'),
            },
            {
              helpText: intl.formatMessage(messages.tooltip_layout_auto),
              icon: "layout",
              onClick: () => this.onPosition('forceLayout'),
            },
            {
              helpText: intl.formatMessage(messages.tooltip_layout_center),
              icon: "layout-auto",
              disabled: !hasSelection,
              onClick: () => updateLayout(centerAround(layout), null, { modifyHistory:true }),
            }
          ]
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_export_svg),
          icon: "media",
          onClick: () => actions.exportSvg(),
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_settings),
          icon: "cog",
          onClick: () => actions.toggleSettingsDialog(),
        }
      ],
    ];

    return <div className="Toolbar">
      {logo && (
        <div className="Toolbar__logo-container">
          <div className="Toolbar__logo">
            {logo.image && <img className="Toolbar__logo__image" src={logo.image} alt="OCCRP Data"></img>}
            {logo.text && <h5 className="Toolbar__logo__text">{logo.text}</h5>}
          </div>
        </div>
      )}
      <div className="Toolbar__main">
        <OverflowList
          items={showEditingButtons ? buttons : buttons.filter((b: any) => !b.writeableOnly)}
          collapseFrom={Boundary.END}
          visibleItemRenderer={(buttonGroup: IToolbarButtonGroup, i: number) => this.itemRenderer(buttonGroup, i, true)}
          overflowRenderer={this.overflowListRenderer}
          className="Toolbar__button-group-container"
          observeParents
        />
      </div>
      {showSearch &&
        <div className="Toolbar__search-container">
          <SearchBox onChangeSearch={actions.onChangeSearch} onSubmitSearch={actions.onSubmitSearch} searchText={searchText} />
        </div>
      }
    </div>
  }
}

export default Toolbar;
