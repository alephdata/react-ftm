import * as React from 'react'
import { Component } from 'react'
import {Button, ButtonGroup, Divider, Tooltip, Colors, Classes, InputGroup, Icon} from "@blueprintjs/core"
import {GraphLayout, GraphUpdateHandler} from "./layout/GraphLayout"
import { Rectangle } from './layout/Rectangle'
import { filterVerticesByText } from './filters'


interface IToolbarProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

interface IToolbarState {
  searchText: string
}

export class Toolbar extends Component<IToolbarProps, IToolbarState> {
  state: IToolbarState = {
    searchText: ''
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
    const {layout, updateLayout} = this.props
    const selection = layout.getSelection()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.filter((v) => !v.hidden).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    layout.viewport = layout.viewport.fitToRect(rect)
    updateLayout(layout)
  }

  onChangeSearch(event: React.FormEvent<HTMLInputElement>) {
    const {layout, updateLayout} = this.props
    const searchText = event.currentTarget.value
    this.setState({searchText})
    const predicate = filterVerticesByText(searchText)
    layout.selectVerticesByFilter(predicate)
    updateLayout(layout)
  }

  onSubmitSearch(event: React.FormEvent) {
    this.onFitToSelection()
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const toolbarStyle = {backgroundColor: Colors.LIGHT_GRAY5, width: '100%', padding: '3px'}
    return (
      <ButtonGroup style={toolbarStyle} className={Classes.ELEVATION_1}>
        <Tooltip content="Select a group of nodes">
          <Button icon="select" active={this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Tooltip content="Fit view to selection">
          <Button icon="zoom-to-fit" onClick={this.onFitToSelection}/>
        </Tooltip>
        <Divider/>
        <div style={{width: '100%'}}></div>
        <form onSubmit={this.onSubmitSearch}>
          <InputGroup leftIcon="search" onChange={this.onChangeSearch} value={this.state.searchText} />
        </form>
      </ButtonGroup>
    )
  }
}
