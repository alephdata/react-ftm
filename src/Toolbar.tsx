import * as React from 'react'

import {
  Button,
  AnchorButton,
  ButtonGroup,
  Divider,
  Tooltip,
  Colors,
  Classes,
  InputGroup,
  Intent,
} from "@blueprintjs/core"
import { IGraphContext} from './GraphContext'
import { filterVerticesByText } from './filters';
import { GraphLayout, Rectangle, alignCircle, alignHorizontal, alignVertical, arrangeTree } from "./layout";
import { History } from './History';
import './Toolbar.scss';


interface IToolbarProps extends IGraphContext {
  actions: any,
  history: History
}

interface IToolbarState {
  searchText: string
}

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  state: IToolbarState = {
    searchText: '',
  }

  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
    this.onFitToSelection = this.onFitToSelection.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSubmitSearch = this.onSubmitSearch.bind(this)
  }

  onToggleSelectionMode() {
    const {layout, updateLayout} = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  onFitToSelection() {
    const {layout, viewport, updateViewport} = this.props
    const selection = layout.getSelectedVertices()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.filter((v) => !v.isHidden()).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    updateViewport(viewport.fitToRect(rect), {animate:true})
  }

  onChangeSearch(event: React.FormEvent<HTMLInputElement>) {
    const {layout, updateLayout} = this.props
    const searchText = event.currentTarget.value
    this.setState({searchText})
    if (searchText.trim().length > 0) {
      const predicate = filterVerticesByText(searchText)
      layout.selectVerticesByFilter(predicate)
    } else {
      layout.clearSelection()
    }
    updateLayout(layout, {modifyHistory:true})
  }

  onSubmitSearch(event: React.FormEvent) {
    this.onFitToSelection()
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const { layout, viewport, updateLayout, updateViewport, actions, history } = this.props
    const vertices = this.props.layout.getSelectedVertices()
    const hasSelection = layout.hasSelection()
    const canAddEdge = vertices.length > 0 && vertices.length <= 2
    const disableLayoutButtons = layout.selection && layout.selection.length <= 1;
    const showSearch = layout.vertices && layout.vertices.size > 0

    return <div className="Toolbar">
      <div className="Toolbar__left">
        <div className="Toolbar__logo">
          <img className="Toolbar__logo__image" src="https://cdn.occrp.org/common/logo/RedTransparent_globe.png" alt="OCCRP Data"></img>
          <h5 className="Toolbar__logo__text">VIS Desktop</h5>
        </div>
      </div>
      <div className="Toolbar__middle">
        <ButtonGroup>
            <Tooltip content="Undo">
              <AnchorButton icon="undo" onClick={() => actions.navigateHistory(History.BACK)} disabled={!history.canGoTo(History.BACK)} />
            </Tooltip>
            <Tooltip content="Redo">
              <AnchorButton icon="redo" onClick={() => actions.navigateHistory(History.FORWARD)} disabled={!history.canGoTo(History.FORWARD)}/>
            </Tooltip>
            <Divider/>
            {!layout.selectionMode &&
              <Tooltip content="Toggle select mode">
                <Button icon="select" onClick={this.onToggleSelectionMode}/>
              </Tooltip>
            }
            {layout.selectionMode &&
              <Tooltip content="Toggle pan mode">
                <Button icon="hand" onClick={this.onToggleSelectionMode}/>
              </Tooltip>
            }
            <Tooltip content="Fit view to selection">
              <Button icon="zoom-to-fit" onClick={this.onFitToSelection}/>
            </Tooltip>
            <Divider/>
            <Tooltip content="Add entities">
              <Button icon="new-object" onClick={actions.toggleAddVertex}/>
            </Tooltip>
            <Tooltip content={hasSelection ? "Remove selected" : "To remove a node first you must select a node by clicking on it"}>
              <AnchorButton icon="graph-remove" onClick={actions.removeSelection} disabled={!hasSelection} />
            </Tooltip>
            <Divider/>
            <Tooltip content="Add links">
              <AnchorButton icon="new-link" onClick={actions.toggleAddEdge} disabled={!canAddEdge} />
            </Tooltip>
            <Divider/>
            <Tooltip content="Align horizontal">
              <AnchorButton icon="drag-handle-horizontal" disabled={disableLayoutButtons} onClick={() => {
                updateLayout(alignHorizontal(layout), {modifyHistory:true})
              }} />
            </Tooltip>
            <Tooltip content="Align vertical">
              <AnchorButton icon="drag-handle-vertical" disabled={disableLayoutButtons} onClick={() => {
                updateLayout(alignVertical(layout), {modifyHistory:true})
              }} />
            </Tooltip>
            <Tooltip content="Arrange as circle">
              <AnchorButton icon="layout-circle" disabled={disableLayoutButtons} onClick={() => {
                updateLayout(alignCircle(layout), {modifyHistory:true})
              }} />
            </Tooltip>
            <Tooltip content="Arrange as hierarchy">
              <AnchorButton icon="layout-hierarchy" disabled={disableLayoutButtons} onClick={() => {
                updateLayout(arrangeTree(layout), {modifyHistory:true})
              }} />
            </Tooltip>
          </ButtonGroup>
        </div>
        {showSearch &&
          <div className="Toolbar__right">
            <form style={{minWidth:'20vw'}} onSubmit={this.onSubmitSearch}>
              <InputGroup leftIcon="search" onChange={this.onChangeSearch} value={this.state.searchText} />
            </form>
          </div>
        }
    </div>
  }
}
