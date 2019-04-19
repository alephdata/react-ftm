import { Point } from '../Point'

export function getPositionByIndex(index: number): Point {
  const RADIUS = 1;
  const ANGEL = Math.PI * (3 - Math.sqrt(5))
  const angelPer = ANGEL * index
  const radiusPer = RADIUS * Math.sqrt(index)
  return new Point(
    radiusPer * Math.cos(angelPer),
    radiusPer * Math.sin(angelPer)
  )
}
