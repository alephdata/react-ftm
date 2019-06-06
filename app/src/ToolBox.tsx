import React from 'react';
import {Button, Divider, Tooltip, FileInput, AnchorButton} from "@blueprintjs/core";
import {
  alignHorizontal, alignVertical, alignCircle,
  arrangeTree, downloadableJSON, IGraphContext,
  GraphLayout
} from '@alephdata/vislib';
interface IToolBoxProps extends IGraphContext {};


export function ToolBox({layout, updateLayout}:IToolBoxProps){
  return (<>
    <Divider/>
    <Tooltip content="Align horizontal">
      <Button icon="drag-handle-horizontal" onClick={() => {
        updateLayout(
          alignHorizontal(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Align vertical">
      <Button icon="drag-handle-vertical" onClick={() => {
        updateLayout(
          alignVertical(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Arrange as circle">
      <Button icon="layout-circle" onClick={() => {
        updateLayout(
          alignCircle(layout)
        )
      }} />
    </Tooltip>
    <Tooltip content="Arrange as circle">
      <Button icon="layout-hierarchy" onClick={() => {
        updateLayout(
          arrangeTree(layout)
        )
      }} />
    </Tooltip>
    <Divider/>
    <Tooltip content="Load from computed">
      <FileInput onInputChange={(e:React.FormEvent<HTMLInputElement>) => {
        if(e && e.currentTarget && e.currentTarget.files){
          try{
            const f = new FileReader();
            f.onload = (c:any) => {
              updateLayout(
                GraphLayout.fromJSON(layout.config, layout.model, JSON.parse(c.target.result))
              );
            }
            f.readAsText(e.currentTarget.files[0])
          }catch (e) {
            // TODO: visualise a warning
          }
        }
      }}/>
    </Tooltip>
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