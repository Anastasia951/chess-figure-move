export function setFigurePosition(position) {
  return {
    type: 'SET_KNIGHT_POSITION',
    payload: position
  }
}

export function setActiveFigure(figure) {
  return {
    type: 'SET_ACTIVE_FIGURE',
    payload: figure
  }
}