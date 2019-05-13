import * as React from 'react'
import { GraphLayout } from "./layout";

export type GraphUpdateHandler = (graph: GraphLayout) => void

export interface IGraphContext {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export const GraphContext = React.createContext<IGraphContext | undefined>(undefined)
