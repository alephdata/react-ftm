import { GraphLayout, Rectangle } from '../layout';
import { Viewport } from '../Viewport';

export const exportSvg = (layout: GraphLayout, viewport: Viewport, svgData: any) => {
  const points = layout.getVertices().filter((v) => !v.isHidden()).map((v) => v.position)
  const rect = Rectangle.fromPoints(...points)
  const viewBox = viewport.fitToRect(rect).viewBox;

  if (svgData) {
    const svgClone = svgData.cloneNode(true) as HTMLElement
    svgClone.setAttribute("viewBox", viewBox as string)

    const canvas = svgClone.querySelector("#canvas-handle")
    canvas && canvas.setAttribute('fill', 'none');

    return new XMLSerializer().serializeToString(svgClone)
  }
}
