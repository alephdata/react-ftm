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
  FileInput
} from "@blueprintjs/core"
import { IGraphContext} from './GraphContext'
import { filterVerticesByText } from './filters';
import { VertexCreateDialog, EdgeCreateDialog } from "./editor";
import {GraphLayout, History, Rectangle} from "./layout";
import {alignHorizontal} from "./layout/tools/alignHorizontal";
import {alignVertical} from "./layout/tools/alignVertical";
import {exportJSON} from "./layout/tools/exportJSON";

interface IToolbarState {
  searchText: string
  edgeCreateOpen: boolean
  vertexCreateOpen: boolean
}

export class Toolbar extends React.Component<IGraphContext, IToolbarState> {
  state: IToolbarState = {
    searchText: '',
    vertexCreateOpen: false,
    edgeCreateOpen: false
  }

  constructor(props: Readonly<IGraphContext>) {
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
    const {layout, updateLayout} = this.props
    const selection = layout.getSelectedVertices()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.filter((v) => !v.isHidden()).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    layout.viewport = layout.viewport.fitToRect(rect)
    updateLayout(layout)
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
    updateLayout(layout)
  }

  onHistory = (factor:number) => () => this.props.updateLayout(this.props.layout.history.go(factor))

  toggleAddVertex() {
    this.setState({ vertexCreateOpen: !this.state.vertexCreateOpen })
  }

  toggleAddEdge(){
    this.setState({ edgeCreateOpen: !this.state.edgeCreateOpen })
  }

  render() {
    const { layout } = this.props
    const vertices = this.props.layout.getSelectedVertices()
    const hasSelection = layout.hasSelection()
    const canAddEdge = vertices.length > 0 && vertices.length <= 2
    const sourceVertex = vertices[0]
    const targetVertex = vertices[1]
    const toolbarStyle = {backgroundColor: Colors.LIGHT_GRAY5, width: '100%', padding: '3px'}
    return <React.Fragment>
      <ButtonGroup style={toolbarStyle} className={Classes.ELEVATION_1}>
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
          <AnchorButton intent={Intent.DANGER} icon="graph-remove" onClick={this.onRemoveSelection} disabled={!hasSelection} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Add links">
          <AnchorButton icon="new-link" onClick={this.toggleAddEdge} disabled={!canAddEdge} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Undo">
          <Button icon="undo" onClick={this.onHistory(History.BACK)} />
        </Tooltip>
        <Tooltip content="Redo">
          <Button icon="redo" onClick={this.onHistory(History.FORWARD)} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Align horizontal">
          <Button icon="drag-handle-horizontal" onClick={() => {
            this.props.updateLayout(
              alignHorizontal(this.props.layout)
            )
          }} />
        </Tooltip>
        <Tooltip content="Align vertical">
          <Button icon="drag-handle-vertical" onClick={() => {
            this.props.updateLayout(
              alignVertical(this.props.layout)
            )
          }} />
        </Tooltip>
        <Divider/>
        <Tooltip content="Load from computed">
          <FileInput onInputChange={(e) => {
            const f = new FileReader();
            f.onload = (c:any) => {
              this.props.updateLayout(
                GraphLayout.fromJSON(this.props.layout.config, this.props.layout.model, JSON.parse(c.target.result))
              );
            }
            // @ts-ignore
            f.readAsText(e.currentTarget.files[0])
          }}/>
        </Tooltip>
        <Tooltip content="Download data">
          <AnchorButton download icon="cloud-download" onMouseDown={(e) => {
            e.currentTarget.setAttribute('href', exportJSON(this.props.layout))
          }} onBlur={e => {
            const url = e.currentTarget.getAttribute('href');
            url && URL.revokeObjectURL(url)
          }}/>
        </Tooltip>
        <div style={{width: '100%'}}/>
        <form onSubmit={this.onSubmitSearch}>
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
      />
    </React.Fragment>
  }
}
