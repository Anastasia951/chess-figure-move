import React from 'react'

const ChooseFigure = React.memo(function ChooseFigure({ figures, setCurrentFigure, currentFigure }) {
  const onSetCurrentFigure = (figure) => {
    if (currentFigure !== figure) {
      setCurrentFigure(figure)
    }
  }
  return (
    <div className='choose-bar'>
      {Object.values(figures).map(figure => <div key={figure} onClick={() => onSetCurrentFigure(figure)} className='choose-bar__item icon'>{figure}</div>)}
    </div>
  )
}
)

export default ChooseFigure