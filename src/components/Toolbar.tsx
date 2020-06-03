import * as React from 'react'
import { defineMessages } from 'react-intl';
import { modes } from '../utils'
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
import { IGraphContext } from '../GraphContext';
import { GraphLogo } from '../GraphLogo';
import { SearchBox } from '.';
import { filterVerticesByText } from '../utils';
import { GraphLayout, Rectangle, alignCircle, alignHorizontal, alignVertical, arrangeTree } from "../layout";
import { History } from '../History';

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
    this.visibleItemRenderer = this.visibleItemRenderer.bind(this)
    this.overflowListRenderer = this.overflowListRenderer.bind(this)
  }

  onSetInteractionMode(newMode: string) {
    const {layout, updateLayout, actions} = this.props
    actions.setInteractionMode(newMode)
    updateLayout(layout)
  }

  visibleItemRenderer(buttonGroup:any, i:any) {
    const { config } = this.props.layout;
    return (
      <React.Fragment key={i}>
        {i !== 0 && <Divider />}
        <ButtonGroup
          className="Toolbar__button-group"
        >
          {buttonGroup.map(({ disabled, helpText, icon, onClick }: any) => (
            <Tooltip content={helpText} key={icon} position="bottom" popoverClassName="Toolbar__button-tip" boundary="viewport">
              <AnchorButton icon={icon} onClick={onClick} disabled={disabled} />
            </Tooltip>
          ))}
        </ButtonGroup>
      </React.Fragment>
    );
  }

  overflowItemRenderer(buttonGroup:any, i:any) {
    return (
      <React.Fragment key={i}>
        {i !== 0 && <Menu.Divider />}
        {buttonGroup.map(({ disabled, helpText, icon, onClick }: any) => (
          <Menu.Item
            icon={icon}
            key={icon}
            onClick={onClick}
            text={helpText}
            disabled={disabled}
          />
        ))}
      </React.Fragment>
    );
  }

  overflowListRenderer(overflowItems: any) {
    const menuContent = overflowItems.map((item:any, i:any) => this.overflowItemRenderer(item, i));
    return (
      <Popover
        content={<Menu>{menuContent}</Menu>}
        position="bottom"
        minimal
        popoverClassName="Toolbar__overflow-list"
        boundary="viewport"
      >
        <Button icon="double-chevron-right" />
      </Popover>
    );
  }

  render() {
    const { intl, layout, viewport, updateLayout, updateViewport, actions, history, interactionMode, showEditingButtons, logo, searchText, tableView } = this.props
    const vertices = this.props.layout.getSelectedVertices()
    const hasSelection = layout.hasSelection()
    const canAddEdge = vertices.length > 0 && vertices.length <= 2
    const canGroupSelection = layout.getSelectedVertices().length > 1
    const canUngroupSelection = layout.getSelectedGroupings().length >= 1
    const disableLayoutButtons = layout.selection && layout.selection.length <= 1;
    const showSearch = layout.vertices && layout.vertices.size > 0

    const editingButtons = [
      [
        {
          helpText: intl.formatMessage(messages.tooltip_undo),
          icon: "undo",
          onClick: () => actions.navigateHistory(History.BACK),
          disabled: !history.canGoTo(History.BACK),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_redo),
          icon: "redo",
          onClick: () => actions.navigateHistory(History.FORWARD),
          disabled: !history.canGoTo(History.FORWARD),
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_add_entities),
          icon: "new-object",
          onClick: () => this.onSetInteractionMode(modes.VERTEX_CREATE),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_add_edges),
          icon: "new-link",
          onClick: () => this.onSetInteractionMode(modes.EDGE_CREATE),
          disabled: !canAddEdge,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_delete),
          icon: "graph-remove",
          onClick: () => actions.removeSelection(),
          disabled: !hasSelection,
        }
      ],
      [
        {
          helpText: intl.formatMessage(messages.tooltip_group),
          icon: "group-objects",
          onClick: () => this.onSetInteractionMode(modes.GROUPING_CREATE),
          disabled: !canGroupSelection,
        },
        {
          helpText: intl.formatMessage(messages.tooltip_ungroup),
          icon: "ungroup-objects",
          onClick: () => actions.ungroupSelection(),
          disabled: !canUngroupSelection,
        }
      ],
    ];

    const otherButtons = [
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
          helpText: intl.formatMessage(messages.tooltip_layout_horizontal),
          icon: "drag-handle-horizontal",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignHorizontal(layout), null, { modifyHistory:true }),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_layout_vertical),
          icon: "drag-handle-vertical",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignVertical(layout), null, { modifyHistory:true }),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_layout_circle),
          icon: "layout-circle",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignCircle(layout), null, { modifyHistory:true }),
        },
        {
          helpText: intl.formatMessage(messages.tooltip_layout_hierarchy),
          icon: "layout-hierarchy",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(arrangeTree(layout), null, { modifyHistory:true }),
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
          helpText: intl.formatMessage(messages.tooltip_export_svg),
          icon: "media",
          onClick: () => actions.exportSvg(),
        }
      ]
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
          items={showEditingButtons ? [...editingButtons, ...otherButtons] : otherButtons}
          collapseFrom={Boundary.END}
          visibleItemRenderer={this.visibleItemRenderer}
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
