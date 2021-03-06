import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../dnd/constants'
import Figure from './Figure'

export default function Square({ x, y, isKnightHere, isBlack, checkPosition, onCanDrop, figurePosition, currentFigure }) {
  const color = isBlack ? 'black' : 'white'
  const stroke = isBlack ? 'white' : 'black'

  const styles = {
    square: {
      backgroundColor: color,
      color: stroke,
    },
    over: {
      opacity: 0.5,
      backgroundColor: 'yellow',
    },
    canDrop: {
      opacity: 0.5,
      backgroundColor: 'green',
    }
  }

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => checkPosition([x, y]),
      canDrop: () => onCanDrop([x, y]),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [x, y, figurePosition, currentFigure]
  )

  return (
    <div ref={drop} className='square'
      style={
        isOver
          ? canDrop
            ? styles.canDrop
            : styles.over
          : styles.square
      }
    >{isKnightHere ? <Figure /> : null}</div>
  )
}
