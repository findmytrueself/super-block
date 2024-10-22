import React, { useState } from 'react'

const initialBoard = [
  ['🎈', '🎈', '', '', '', '🎈'],
  ['', '', '🎈', '', '🎈', '🎈'],
  ['', '🎈', '🎈', '', '', ''],
  ['', '🎈', '', '🎈', '🎈', ''],
  ['', '', '🎈', '', '', ''],
  ['', '', '🎈', '', '', '🎈'],
]

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

const Game = () => {
  const [board, setBoard] = useState(initialBoard)
  const [blockGroup, setBlockGroup] = useState([])

  const handleClickBalloon = (rowIdx, colIdx) => {
    console.log(rowIdx, 'rowIdx')
    console.log(colIdx, 'colIdx')
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${board[0].length}, 60px)`,
        // gap: '5px',
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((col, colIdx) => (
          <div
            style={{
              fontSize: 'xx-large',
              width: '60px',
              height: '60px',
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => handleClickBalloon(rowIdx, colIdx)}
          >
            {col}
          </div>
        ))
      )}
    </div>
  )
}

export default Game
