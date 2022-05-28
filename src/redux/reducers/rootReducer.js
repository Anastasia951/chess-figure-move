const initialState = {
  figurePosition: [0, 0],
  figures: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    // pawn: '♙'
  },
  currentFigure: '♔'
}
function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_KNIGHT_POSITION':
      return {
        ...state,
        figurePosition: payload
      }
    case 'SET_ACTIVE_FIGURE':
      return {
        ...state,
        currentFigure: payload
      }
    default:
      return state
  }
}

export default rootReducer