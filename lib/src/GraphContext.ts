import * as React from 'react'
import { GraphLayout } from "./layout";
import { Viewport } from "./Viewport";

export type GraphUpdateHandler = (layout: GraphLayout, modifyHistory?: boolean, animate?: boolean) => void
export type ViewportUpdateHandler = (viewport: Viewport) => void

export interface IGraphContext {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
  viewport: Viewport,
  updateViewport: ViewportUpdateHandler
}

export const GraphContext = React.createContext<IGraphContext | undefined>(undefined)
