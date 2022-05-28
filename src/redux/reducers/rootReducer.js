const initialState = {
  knightPosition: [0, 0]
}
function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_KNIGHT_POSITION':
      return {
        knightPosition: payload
      }
    default:
      return state
  }
}

export default rootReducer