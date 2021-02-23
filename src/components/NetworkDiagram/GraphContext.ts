import * as React from 'react'
import { WrappedComponentProps } from 'react-intl';
import { GraphLayout } from "./layout";
import { Viewport } from "./Viewport";
import { IEntityContext } from 'contexts/EntityContext';
import { EntityManager } from "components/common";

export type GraphUpdateHandler = (layout: GraphLayout, entityChanges?: any, options?: any) => void
export type ViewportUpdateHandler = (viewport: Viewport, transitionSettings?: any) => void

export interface IGraphContext extends WrappedComponentProps  {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
  viewport: Viewport,
  updateViewport: ViewportUpdateHandler,
  entityManager: EntityManager
  entityContext: IEntityContext
  writeable: boolean
  interactionMode: string
}

export const GraphContext = React.createContext<IGraphContext | undefined>(undefined)
