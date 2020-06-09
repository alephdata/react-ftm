// @ts-ignore
import * as dagre from 'dagre'
import { Edge, Point, Rectangle, Vertex } from "../";

const arrangeTree = ({ vertices, edges }: { vertices: Array<Vertex>, edges: Array<Edge> }):any => {
  const nodes = vertices.map((vertex) => ({
    id: vertex.id,
    width: vertex.radius*2,
    height: vertex.radius*2,
  }));
  const center = Rectangle.fromPoints(...vertices.map(v => v.position)).getCenter();
  const links = edges.map((edge) => {
    return {
      id:edge.id,
      source: nodes.find((n) => n.id === edge.sourceId),
      target: nodes.find((n) => n.id === edge.targetId)
    }
  }).filter((link) => (link.source && link.target));

  const g = new dagre.graphlib.Graph({
    multigraph:true,
    directed:true,
  });

  g.setGraph({
    nodesep:1.5, edgesep:.3, ranksep:4,marginx:1,marginy:1,
    ranker:'longest-path'
  });

  g.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(node => g.setNode(node.id, node) )
  // @ts-ignore
  links.forEach(link => g.setEdge(link.source.id, link.target.id))

  dagre.layout(g);

  return (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      // @ts-ignore
      return center.addition(new Point(node.x, node.y))
    }
  }
}

export default arrangeTree;
