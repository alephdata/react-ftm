export interface ICoordinates {
  x: number
  y: number
}

export function getPositionByIndex(index: number): ICoordinates {
  const RADIUS = 12
  const ANGEL = Math.PI * (3 - Math.sqrt(5))
  const angelPer = ANGEL * index
  const radiusPer = RADIUS * Math.sqrt(index)
  return {
    x: radiusPer * Math.cos(angelPer),
    y: radiusPer * Math.sin(angelPer)
  }
}
