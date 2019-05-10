import * as React from 'react'
import {Button, ButtonGroup, Divider, Tooltip, Colors, Classes, InputGroup, Icon, Drawer} from "@blueprintjs/core"
import {GraphLayout, GraphUpdateHandler} from "./layout/GraphLayout"
import { Rectangle } from './layout/Rectangle'
import { filterVerticesByText } from './filters';
import {CreateEntity} from "./ftm/CreateEntity";
import {Schema} from "@alephdata/followthemoney";


interface IToolbarProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

interface IToolbarState {
  searchText: string
  drawerStatus: boolean
  subsequentOf?: Schema
}

export class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  state: IToolbarState = {
    searchText: '',
    drawerStatus: false
  }

  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
    this.onFitToSelection = this.onFitToSelection.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSubmitSearch = this.onSubmitSearch.bind(this)
    this.onAddEdge = this.onAddEdge.bind(this)
    this.onAddVertex = this.onAddVertex.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this)
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
  onAddVertex() {
    this.setState({
      drawerStatus: true,
      subsequentOf: this.props.layout.model.getSchema('Thing')
    })
  }

  onAddEdge(){
    this.setState({
      drawerStatus: true,
      subsequentOf: this.props.layout.model.getSchema('Interval')
    })
  }

  toggleDrawer(){
    this.setState(({drawerStatus}) => ({drawerStatus:!drawerStatus}))
  }
  render() {
    const {layout} = this.props;
    const toolbarStyle = {backgroundColor: Colors.LIGHT_GRAY5, width: '100%', padding: '3px'}
    return (<>
      <ButtonGroup style={toolbarStyle} className={Classes.ELEVATION_1}>
        <Tooltip content="Select a group of nodes">
          <Button icon="select" active={this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Tooltip content="Fit view to selection">
          <Button icon="zoom-to-fit" onClick={this.onFitToSelection}/>
        </Tooltip>
        <Divider/>
        <Tooltip content="add a node">
          <Button icon="new-object" onClick={this.onAddVertex}/>
        </Tooltip><Tooltip content="add a link">
          <Button icon="new-link" onClick={this.onAddEdge}/>
        </Tooltip>
        <div style={{width: '100%'}}/>
        <form onSubmit={this.onSubmitSearch}>
          <InputGroup leftIcon="search" onChange={this.onChangeSearch} value={this.state.searchText} />
        </form>
      </ButtonGroup>
      <Drawer isOpen={this.state.drawerStatus} lazy={true}  size="360p" hasBackdrop={false} className={Classes.CALLOUT}>
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            {!!this.state.subsequentOf && <CreateEntity
              layout={layout}
              subsequentOf={this.state.subsequentOf}
              updateLayout={this.props.updateLayout}
            />}
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <Button onClick={this.toggleDrawer}>
            Done
          </Button>

        </div>
      </Drawer>
      </>
    )
  }
}
