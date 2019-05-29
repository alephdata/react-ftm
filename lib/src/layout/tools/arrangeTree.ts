// @ts-ignore
import * as dagre from 'dagre'
import {GraphLayout} from "../GraphLayout";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {Edge} from "../Edge";

export function arrangeTree(layout:GraphLayout):GraphLayout{
  const nodes = layout.getSelectedVertices()
    .filter((vertex) => !vertex.isHidden())
    .map((vertex) => ({
      id: vertex.id,
      width: layout.config.VERTEX_RADIUS*2,
      height: layout.config.VERTEX_RADIUS*2,
    }))
  const links = layout.getEdges().map((edge) => {
    return {
      id:edge.id,
      source: nodes.find((n) => n.id === edge.sourceId),
      target: nodes.find((n) => n.id === edge.targetId)
    }
  }).filter((link) => (link.source && link.target))

  const g = new dagre.graphlib.Graph({
    multigraph:true,
    directed:true
  });

  g.setGraph({
    nodesep:1.5, edgesep:.3, ranksep:1,marginx:1,marginy:1,
    ranker:'longest-path'
  });

  g.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(node=>  g.setNode(node.id, node) )
  // @ts-ignore
  links.forEach(link => g.setEdge(link.source.id, link.target.id))

  dagre.layout(g);
  g.nodes().forEach((node:any) => {
    const vertex = layout.vertices.get(node) as Vertex
    const nN = g.node(node);
    if(nN){
      const position = new Point(nN.x, nN.y)
      layout.vertices.set(vertex.id, vertex.snapPosition(position))
    }
  })
  return layout
}
