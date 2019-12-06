import * as React from 'react'
import { modes } from './interactionModes'

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
import { IGraphContext } from './GraphContext';
import { GraphLogo } from './GraphLogo';
import { SearchBox } from './SearchBox';

import { filterVerticesByText } from './filters';
import { GraphLayout, Rectangle, alignCircle, alignHorizontal, alignVertical, arrangeTree } from "./layout";
import { History } from './History';
import './Toolbar.scss';


interface IToolbarProps extends IGraphContext {
  actions: any,
  history: History,
  interactionMode: string,
  showEditingButtons: boolean,
  logo?: GraphLogo,
}

export class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onSetInteractionMode = this.onSetInteractionMode.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSubmitSearch = this.onSubmitSearch.bind(this)
    this.overflowListRenderer = this.overflowListRenderer.bind(this)

  }

  onSetInteractionMode(newMode: string) {
    const {layout, updateLayout, actions} = this.props
    actions.setInteractionMode(newMode)
    updateLayout(layout)
  }

  onChangeSearch(searchText: string) {
    const {layout, updateLayout} = this.props

    if (searchText.length > 0) {
      const predicate = filterVerticesByText(searchText)
      layout.selectVerticesByFilter(predicate)
    } else {
      layout.clearSelection()
    }
    updateLayout(layout, {modifyHistory:true})
  }

  onSubmitSearch(event: React.FormEvent) {
    const {actions} = this.props
    actions.fitToSelection()
    event.preventDefault()
    event.stopPropagation()
  }

  visibleItemRenderer(buttonGroup:any, i:any) {
    return (
      <ButtonGroup key={i}>
        {i !== 0 && <Divider />}
        {buttonGroup.map(({ disabled, helpText, icon, onClick }: any) => (
          <Tooltip content={helpText} key={icon}>
            <AnchorButton icon={icon} onClick={onClick} disabled={disabled} />
          </Tooltip>
        ))}
      </ButtonGroup>
    );
  }

  overflowItemRenderer(buttonGroup:any, i:any) {
    return (
      <>
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
      </>
    );
  }

  overflowListRenderer(overflowItems: any) {
    const menuContent = overflowItems.map((item:any, i:any) => this.overflowItemRenderer(item, i));
    return (
      <Popover
        content={<Menu>{menuContent}</Menu>}
        position="bottom"
        minimal
        popoverClassName="bp3-dark"
      >
        <Button icon="double-chevron-right" text="More..." />
      </Popover>
    );
  }

  render() {
    const { layout, viewport, updateLayout, updateViewport, actions, history, interactionMode, showEditingButtons, logo } = this.props
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
          helpText: "Undo",
          icon: "undo",
          onClick: () => actions.navigateHistory(History.BACK),
          disabled: !history.canGoTo(History.BACK),
        },
        {
          helpText: "Redo",
          icon: "redo",
          onClick: () => actions.navigateHistory(History.FORWARD),
          disabled: !history.canGoTo(History.FORWARD),
        }
      ],
      [
        {
          helpText: "Add entities",
          icon: "new-object",
          onClick: () => this.onSetInteractionMode(modes.VERTEX_CREATE),
        },
        {
          helpText: "Add links",
          icon: "new-link",
          onClick: () => this.onSetInteractionMode(modes.EDGE_CREATE),
          disabled: !canAddEdge,
        },
        {
          helpText: "Delete selection",
          icon: "graph-remove",
          onClick: () => actions.removeSelection(),
          disabled: !hasSelection,
        }
      ],
      [
        {
          helpText: "Group selected",
          icon: "group-objects",
          onClick: () => this.onSetInteractionMode(modes.GROUPING_CREATE),
          disabled: !canGroupSelection,
        },
        {
          helpText: "Ungroup selected",
          icon: "ungroup-objects",
          onClick: () => actions.ungroupSelection,
          disabled: !canUngroupSelection,
        }
      ],
      [
        interactionMode === modes.PAN
        ? {
          helpText: "Toggle select mode",
          icon: "select",
          onClick: () => this.onSetInteractionMode(modes.SELECT),
        }
        : {
          helpText: "Toggle pan mode",
          icon: "hand",
          onClick: () => this.onSetInteractionMode(modes.PAN),
        }
      ],
      [
        {
          helpText: "Align horizontal",
          icon: "drag-handle-horizontal",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignHorizontal(layout), {modifyHistory:true}),
        },
        {
          helpText: "Align vertical",
          icon: "drag-handle-vertical",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignVertical(layout), {modifyHistory:true}),
        },
        {
          helpText: "Arrange as circle",
          icon: "layout-circle",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(alignCircle(layout), {modifyHistory:true}),
        },
        {
          helpText: "Arrange as hierarchy",
          icon: "layout-hierarchy",
          disabled: disableLayoutButtons,
          onClick: () => updateLayout(arrangeTree(layout), {modifyHistory:true}),
        }
      ]
    ];

    const otherButtons = [
      [
        {
          helpText: "View as table",
          icon: "th",
          onClick: () => actions.toggleTableView(),
        }
      ],
      [
        {
          helpText: "Export as SVG",
          icon: "export",
          onClick: () => actions.exportSvg(),
        }
      ]
    ];

    return <div className="Toolbar">
      {logo && (
        <div className="Toolbar__left">
          <div className="Toolbar__logo">
            {logo.image && <img className="Toolbar__logo__image" src={logo.image} alt="OCCRP Data"></img>}
            {logo.text && <h5 className="Toolbar__logo__text">{logo.text}</h5>}
          </div>
        </div>
      )}
      <div className="Toolbar__middle">
        <OverflowList
          items={showEditingButtons ? [...editingButtons, ...otherButtons] : otherButtons}
          collapseFrom={Boundary.END}
          visibleItemRenderer={this.visibleItemRenderer}
          overflowRenderer={this.overflowListRenderer}
        />
      </div>
      {showSearch &&
        <div className="Toolbar__right">
          <SearchBox onChangeSearch={this.onChangeSearch} onSubmitSearch={this.onSubmitSearch} />
        </div>
      }
    </div>
  }
}
