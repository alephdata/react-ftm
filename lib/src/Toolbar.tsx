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
import { VertexCreateDialog, EdgeCreateDialog, ToolUpload } from "./editor";
import { GraphLayout, Rectangle, alignCircle, alignHorizontal, alignVertical, arrangeTree, downloadableJSON } from "./layout";
import { History } from './History';

interface IToolbarProps extends IGraphContext {
  onHistoryNavigate: (factor:number) => void,
  history: History
}

interface IToolbarState {
  searchText: string
  edgeCreateOpen: boolean
  vertexCreateOpen: boolean
}

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  state: IToolbarState = {
    searchText: '',
    vertexCreateOpen: false,
    edgeCreateOpen: false
  }

  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
    this.onFitToSelection = this.onFitToSelection.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSubmitSearch = this.onSubmitSearch.bind(this)
    this.toggleAddEdge = this.toggleAddEdge.bind(this)
    this.toggleAddVertex = this.toggleAddVertex.bind(this)
    this.onRemoveSelection = this.onRemoveSelection.bind(this)
  }

  onToggleSelectionMode() {
    const {layout, updateLayout} = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  onFitToSelection() {
    const {layout, updateLayout, viewport, updateViewport} = this.props
    const selection = layout.getSelectedVertices()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.filter((v) => !v.isHidden()).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    updateViewport(viewport.fitToRect(rect))
  }

  onChangeSearch(event: React.FormEvent<HTMLInputElement>) {
    const {layout, updateLayout} = this.props
    const searchText = event.currentTarget.value
    this.setState({searchText})
    if (searchText.trim().length > 2) {
      const predicate = filterVerticesByText(searchText)
      layout.selectVerticesByFilter(predicate)
    } else {
      layout.clearSelection()
    }
    updateLayout(layout)
  }

  onSubmitSearch(event: React.FormEvent) {
    this.onFitToSelection()
    event.preventDefault()
    event.stopPropagation()
  }

  onRemoveSelection() {
    const {layout, updateLayout} = this.props
    layout.removeSelection()
    updateLayout(layout, true)
  }

  toggleAddVertex() {
    this.setState({ vertexCreateOpen: !this.state.vertexCreateOpen })
  }

  toggleAddEdge(){
    this.setState({ edgeCreateOpen: !this.state.edgeCreateOpen })
  }

  render() {
    const { layout, viewport, updateLayout, updateViewport, onHistoryNavigate, history } = this.props
    const vertices = this.props.layout.getSelectedVertices()
    const hasSelection = layout.hasSelection()
    const canAddEdge = vertices.length > 0 && vertices.length <= 2
    const sourceVertex = vertices[0]
    const targetVertex = vertices[1]
    const toolbarStyle = {backgroundColor: Colors.LIGHT_GRAY5, width: '100%', padding: '3px'}
    const disableLayoutButtons = layout.selection && layout.selection.length <= 1;

    return <React.Fragment>
      <ButtonGroup style={toolbarStyle} className={Classes.ELEVATION_1}>
        <Tooltip content="Undo">
          <AnchorButton icon="undo" onClick={() => onHistoryNavigate(History.BACK)} disabled={!history.canGoTo(History.BACK)} />
        </Tooltip>
        <Tooltip content="Redo">
          <AnchorButton icon="redo" onClick={() => onHistoryNavigate(History.FORWARD)} disabled={!history.canGoTo(History.FORWARD)}/>
        </Tooltip>
        <Divider/>

        <Tooltip content="Select elements">
          <Button icon="select" active={this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Tooltip content="Fit view to selection">
          <Button icon="zoom-to-fit" onClick={this.onFitToSelection}/>
        </Tooltip>
        <Divider/>
        <Tooltip content="Add entities">
          <Button icon="new-object" onClick={this.toggleAddVertex}/>
        </Tooltip>
        <Tooltip content={hasSelection ? "Remove selected" : "To remove a node first you must select a node by clicking on it"}>
          <AnchorButton icon="graph-remove" onClick={this.onRemoveSelection} disabled={!hasSelection} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Add links">
          <AnchorButton icon="new-link" onClick={this.toggleAddEdge} disabled={!canAddEdge} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Align horizontal">
          <AnchorButton icon="drag-handle-horizontal" disabled={disableLayoutButtons} onClick={() => {
            updateLayout(
              alignHorizontal(layout),
              true
            )
          }} />
        </Tooltip>
        <Tooltip content="Align vertical">
          <AnchorButton icon="drag-handle-vertical" disabled={disableLayoutButtons} onClick={() => {
            updateLayout(
              alignVertical(layout),
              true
            )
          }} />
        </Tooltip>
        <Tooltip content="Arrange as circle">
          <AnchorButton icon="layout-circle" disabled={disableLayoutButtons} onClick={() => {
            updateLayout(
              alignCircle(layout),
              true
            )
          }} />
        </Tooltip>
        <Tooltip content="Arrange as hierarchy">
          <AnchorButton icon="layout-hierarchy" disabled={disableLayoutButtons} onClick={() => {
            updateLayout(
              arrangeTree(layout),
              true
            )
          }} />
        </Tooltip>
        <Divider/>
        <ToolUpload
          layout={layout}
          updateLayout={updateLayout}
          viewport={viewport}
          updateViewport={updateViewport}
        />
        <Tooltip content="Download data">
          <AnchorButton download icon="cloud-download" onMouseDown={(e) => {
            e.currentTarget.setAttribute('href', downloadableJSON(layout))
          }} onBlur={e => {
            const url = e.currentTarget.getAttribute('href');
            url && URL.revokeObjectURL(url)
          }}/>
        </Tooltip>

        <div style={{width: '100%'}}/>
        <form style={{minWidth:'20vw'}} onSubmit={this.onSubmitSearch}>
          <InputGroup leftIcon="search" onChange={this.onChangeSearch} value={this.state.searchText} />
        </form>
      </ButtonGroup>
      <VertexCreateDialog isOpen={this.state.vertexCreateOpen} toggleDialog={this.toggleAddVertex} />
      <EdgeCreateDialog
        layout={layout}
        source={sourceVertex}
        target={targetVertex}
        isOpen={this.state.edgeCreateOpen}
        toggleDialog={this.toggleAddEdge}
        updateLayout={this.props.updateLayout}
        viewport={viewport}
        updateViewport={this.props.updateViewport}
      />
    </React.Fragment>
  }
}
