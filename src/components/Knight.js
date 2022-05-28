import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../dnd/constants'

export default function Knight() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  const styles = {
    opacity: isDragging ? 0.5 : 1,
    fontSize: 25,
    fontWeight: 'bold',
    cursor: 'move',
  }
  return (
    <div ref={drag} style={styles}>♘</div>
  )
}
