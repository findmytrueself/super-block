import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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

  const bfs = (start: number[], isRemove: boolean, outVisited?: number[][]) => {
    const visited = outVisited
      ? outVisited
      : Array.from({ length: board.length }, () =>
          Array(board[0].length).fill(false)
        )

    const queue = [start]
    const group = [start]
    visited[start[0]][start[1]] = true

    while (queue.length > 0) {
      const [row, col] = queue.shift()!

      for (const direction of directions) {
        const newRow = row + direction[0]
        const newCol = col + direction[1]

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length &&
          !visited[newRow][newCol] &&
          board[newRow][newCol] === '🎈'
        ) {
          visited[newRow][newCol] = true
          queue.push([newRow, newCol])
          group.push([newRow, newCol])
        }
      }
    }

    if (isRemove) {
      const newBoard = [...board]
      group.forEach(([row, col]) => {
        newBoard[row][col] = ''
      })
      setBoard(newBoard)
    }
    return group
  }

  const handleClick = (rowIdx: number, colIdx: number) => {
    const allGroups = findGroup()
    if (board[rowIdx][colIdx] === '🎈') {
      const clickedGroup = bfs([rowIdx, colIdx], false)

      if (allGroups[0].length === clickedGroup.length) {
        bfs([rowIdx, colIdx], true)
      } else {
        MySwal.fire({
          icon: 'error',
          title: <p>패배</p>,
        })
      }
    } else {
      MySwal.fire({
        icon: 'error',
        title: <p>패배</p>,
      })
    }
  }

  const findGroup = () => {
    const visited = Array.from({ length: board.length }, () =>
      Array(board[0].length).fill(false)
    )

    const allGroups = []

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === '🎈' && !visited[i][j]) {
          const group = bfs([i, j], false, visited)
          allGroups.push(group)
        }
      }
    }

    allGroups.sort((a, b) => b.length - a.length)

    return allGroups
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${board[0].length}, 60px)`,
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((col, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
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
            onClick={() => handleClick(rowIdx, colIdx)}
          >
            {col}
          </div>
        ))
      )}
    </div>
  )
}

export default Game
