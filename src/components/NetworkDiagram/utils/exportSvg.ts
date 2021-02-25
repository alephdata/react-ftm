export const exportSvg = (layout: GraphLayout, viewport: Viewport, svgData: any) => {
  const svgData = this.svgRef.current
  const points = layout.getVertices().filter((v) => !v.isHidden()).map((v) => v.position)
  const rect = Rectangle.fromPoints(...points)
  const viewBox = viewport.fitToRect(rect).viewBox;

  if (svgData && this.props.exportSvg) {
    const svgClone = svgData.cloneNode(true) as HTMLElement
    svgClone.setAttribute("viewBox",viewBox as string)

    const canvas = svgClone.querySelector("#canvas-handle")
    canvas && canvas.setAttribute('fill', 'none');

    const svgBlob = new XMLSerializer().serializeToString(svgClone)
    this.props.exportSvg(svgBlob)
  }
}
