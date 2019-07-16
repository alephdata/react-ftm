import React from 'react';
import {Button, Divider, Tooltip, AnchorButton} from "@blueprintjs/core";
import {
  alignHorizontal, alignVertical, alignCircle,
  arrangeTree, downloadableJSON, IGraphContext,
} from '@alephdata/vislib';
import {ToolUpload} from "./ToolUpload";
interface IToolBoxProps extends IGraphContext {};


export function ToolBox({layout, updateLayout}:IToolBoxProps){
  const disableLayoutButtons = layout.selection && layout.selection.length <= 1;
  return (<>
    <Divider/>
    <Tooltip content="Align horizontal">
      <AnchorButton icon="drag-handle-horizontal" disabled={disableLayoutButtons} onClick={() => {
        updateLayout(
          alignHorizontal(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Align vertical">
      <AnchorButton icon="drag-handle-vertical" disabled={disableLayoutButtons} onClick={() => {
        updateLayout(
          alignVertical(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Arrange as circle">
      <AnchorButton icon="layout-circle" disabled={disableLayoutButtons} onClick={() => {
        updateLayout(
          alignCircle(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Arrange as hierarchy">
      <AnchorButton icon="layout-hierarchy" disabled={disableLayoutButtons} onClick={() => {
        updateLayout(
          arrangeTree(layout)
        )
      }} />
    </Tooltip>
    <Divider/>
    <ToolUpload
      layout={layout}
      updateLayout={updateLayout}
    />
    <Tooltip content="Download data">
      <AnchorButton download icon="cloud-download" onMouseDown={(e) => {
        e.currentTarget.setAttribute('href', downloadableJSON(layout))
      }} onBlur={e => {
        const url = e.currentTarget.getAttribute('href');
        url && URL.revokeObjectURL(url)
      }}/>
    </Tooltip>
  </>)
}
