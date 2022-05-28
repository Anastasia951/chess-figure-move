import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDispatch, useSelector } from 'react-redux'
import { setKnightPosition } from '../redux/actions/chess'
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

  let { knightPosition } = useSelector(state => state)
  useEffect(() => {
    setSquares(new Array(64).fill(''))
  }, [])

  function setPosition(position) {
    dispatch(setKnightPosition(position))
  }
  function onCanDrop([toX, toY]) {
    const [fromX, fromY] = knightPosition
    const dx = Math.abs(toX - fromX)
    const dy = Math.abs(toY - fromY)
    return ((dx === 1 && dy === 2) || (dx === 2 && dy === 1))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='board'>
        {squares.map((_, index) => {
          const settings = renderSquares(index, knightPosition)
          return <Square onCanDrop={onCanDrop} checkPosition={setPosition} {...settings} key={index} knightPosition={knightPosition} />
        })}
      </div>
    </DndProvider>
  )
}
