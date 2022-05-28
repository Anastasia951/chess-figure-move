import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveFigure, setFigurePosition } from '../redux/actions/chess'
import ChooseFigure from './ChooseFigure'
import Square from './Square'

function renderSquares(i, [knightX, knightY]) {
  let x = i % 8
  let y = Math.floor(i / 8)

  const isKnightHere = x === knightX && y === knightY
  const isBlack = (x + y) % 2
  return { x, y, isKnightHere, isBlack }
}

export default function Board() {
  const [squares, setSquares] = useState([])
  const dispatch = useDispatch()

  const { figurePosition, figures, currentFigure } = useSelector(state => state)
  useEffect(() => {
    setSquares(new Array(64).fill(''))
  }, [])

  function setPosition(position) {
    dispatch(setFigurePosition(position))
  }
  function onCanDrop([toX, toY]) {
    const [fromX, fromY] = figurePosition
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)

    switch (currentFigure) {
      case figures.king:
        return (dx <= 1 && dy <= 1)
      case figures.queen:
        return (dx === 0 || dy === 0) || (dx === dy)
      case figures.bishop:
        return dx === dy
      case figures.rook:
        return (dx === 0 || dy === 0)
      case figures.knight:
        return ((dx === 1 && dy === 2) || (dx === 2 && dy === 1))
      default:
        return false
    }

  }
  function setCurrentFigure(figure) {
    dispatch(setActiveFigure(figure))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <ChooseFigure setCurrentFigure={setCurrentFigure} figures={figures} currentFigure={currentFigure} />
      <div className='board'>
        {squares.map((_, index) => {
          const settings = renderSquares(index, figurePosition)
          return <Square onCanDrop={onCanDrop} checkPosition={setPosition} {...settings} key={index} figurePosition={figurePosition} currentFigure={currentFigure} />
        })}
      </div>
    </DndProvider>
  )
}
