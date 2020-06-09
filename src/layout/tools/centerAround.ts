import { GraphLayout, Rectangle } from "../";
import alignCircle from "./alignCircle";
import { applyPositioning } from "./applyPositioning";

const RADIUS_SPACING = 8;

const centerAround = (layout: GraphLayout, vertsToCenter?: Array<Vertex>, vertsToPosition?: Array<Vertex> ): any => {
  const toCenter = vertsToCenter || layout.getSelectedVertices();
  const toPosition = vertsToPosition || layout.getVertices().filter(v => (!v.isHidden() && toCenter.indexOf(v) < 0));

  const centerBBox = Rectangle.fromPoints(
    ...toCenter.map(v => v.position)
  );
  const radius = Math.max(centerBBox.width/2 + RADIUS_SPACING, centerBBox.height/2 + RADIUS_SPACING, toPosition.length);

  const positioningFunc = alignCircle({ vertices: toPosition, center: centerBBox.getCenter(), radius });

  return layout.applyPositioning(positioningFunc, toPosition);
}

export default centerAround;
