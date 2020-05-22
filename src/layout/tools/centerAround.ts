import { GraphLayout, Rectangle } from "../";
import alignCircle from "./alignCircle";
import { applyPositioning } from "./applyPositioning";
import _ from 'lodash';

const RADIUS_SPACING = 8;

const centerAround = (layout: GraphLayout): any => {
  const allVertices = layout.getVertices().filter(v=>!v.isHidden())
  const [centered, rest] = _.partition(allVertices, layout.isElementSelected.bind(this));

  const centerBBox = Rectangle.fromPoints(
    ...centered.map(v => v.position)
  );
  const radius = Math.max(centerBBox.width, centerBBox.height)/2 + RADIUS_SPACING;

  const positioningFunc = alignCircle({ vertices: rest, center: centerBBox.getCenter(), radius });

  return layout.applyPositioning(positioningFunc, rest);
}

export default centerAround;
