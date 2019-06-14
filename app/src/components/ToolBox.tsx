import React from 'react';
import {Button, Divider, Tooltip, AnchorButton} from "@blueprintjs/core";
import {
  alignHorizontal, alignVertical, alignCircle,
  arrangeTree, downloadableJSON, IGraphContext,
} from '@alephdata/vislib';
import {ToolUpload} from "./ToolUpload";
import {Link} from "react-router-dom";

interface IToolBoxProps extends IGraphContext {
};


export function ToolBox({layout, updateLayout}: IToolBoxProps) {
  return (<>
    <Divider/>
    <Tooltip content="Align horizontal">
      <Button icon="drag-handle-horizontal" onClick={() => {
        updateLayout(
          alignHorizontal(layout)
        )
      }}/>
    </Tooltip>
    <Tooltip content="Align vertical">
      <Button icon="drag-handle-vertical" onClick={() => {
        updateLayout(
          alignVertical(layout)
        )
      }}/>
    </Tooltip>
    <Tooltip content="Arrange as circle">
      <Button icon="layout-circle" onClick={() => {
        updateLayout(
          alignCircle(layout)
        )
      }}/>
    </Tooltip>
    <Tooltip content="Arrange as circle">
      <Button icon="layout-hierarchy" onClick={() => {
        updateLayout(
          arrangeTree(layout)
        )
      }}/>
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
    <Divider/>
    <Tooltip content="Edit in table">
      <Link to="/tabular">
        <Button icon="th"/>
      </Link>
    </Tooltip>
  </>)
}