import { ICoordinates } from '../Point'

export function getPositionByIndex(index: number): ICoordinates {
  const RADIUS = 1;
  const ANGEL = Math.PI * (3 - Math.sqrt(5))
  const angelPer = ANGEL * index
  const radiusPer = RADIUS * Math.sqrt(index)
  return {
    x: radiusPer * Math.cos(angelPer),
    y: radiusPer * Math.sin(angelPer)
  }
}
