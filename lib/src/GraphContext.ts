import * as React from 'react'
import {GraphLayout, GraphUpdateHandler} from "./layout";

export interface IGraphContextValue {
  layout: GraphLayout,
  updateLayout:GraphUpdateHandler
}

export const GraphContext = React.createContext<IGraphContextValue | undefined>(undefined)
