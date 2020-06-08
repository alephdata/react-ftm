import { GraphLayout, Rectangle } from "../";
import alignCircle from "./alignCircle";
import { applyPositioning } from "./applyPositioning";

const RADIUS_SPACING = 8;

const centerAround = (layout: GraphLayout, vertsToCenter?: Array<Vertex>, vertsToPosition?: Array<Vertex> ): any => {
  const toCenter = vertsToCenter || layout.getSelectedVertices();
  const toPosition = vertsToPosition || layout.getVertices().filter(v => (!v.isHidden() && toCenter.indexOf(v) < 0));

  console.log('centering, positioning', toCenter, toPosition);

  const centerBBox = Rectangle.fromPoints(
    ...toCenter.map(v => v.position)
  );
  const radius = Math.max(centerBBox.width, centerBBox.height)/2 + RADIUS_SPACING;

  const positioningFunc = alignCircle({ vertices: toPosition, center: centerBBox.getCenter(), radius });

  return layout.applyPositioning(positioningFunc, toPosition);
}

export default centerAround;
