import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Deque from "double-ended-queue";

const MySwal = withReactContent(Swal);

const showModal = (
  type: "error" | "success",
  title: string,
  confirmButtonText?: string,
  onConfirm?: () => void
) => {
  return MySwal.fire({
    icon: type,
    title: <p>{title}</p>,
    confirmButtonText: confirmButtonText || "확인",
    preConfirm: onConfirm,
  });
};

const initialBoard = [
  ["🎈", "🎈", "", "", "", "🎈"],
  ["", "", "🎈", "", "🎈", "🎈"],
  ["", "🎈", "🎈", "", "", ""],
  ["", "🎈", "", "🎈", "🎈", ""],
  ["", "", "🎈", "", "", ""],
  ["", "", "🎈", "", "", "🎈"],
];

const getInitialBoard = () => initialBoard.map((row: string[]) => [...row]);

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const Game = () => {
  const [board, setBoard] = useState(getInitialBoard());

  const bfs = useCallback(
    (start: number[], isRemove: boolean, outVisited?: boolean[][]) => {
      const visited =
        outVisited ||
        Array.from({ length: board.length }, () =>
          Array(board[0].length).fill(false)
        );

      const queue = new Deque([start]);
      const group = [start];
      visited[start[0]][start[1]] = true;

      while (queue.length > 0) {
        const [row, col] = queue.removeFront()!;

        for (const direction of directions) {
          const newRow = row + direction[0];
          const newCol = col + direction[1];

          if (
            newRow >= 0 &&
            newRow < board.length &&
            newCol >= 0 &&
            newCol < board[0].length &&
            !visited[newRow][newCol] &&
            board[newRow][newCol] === "🎈"
          ) {
            visited[newRow][newCol] = true;
            queue.insertBack([newRow, newCol]);
            group.push([newRow, newCol]);
          }
        }
      }

      if (isRemove) {
        const newBoard = removeGroup(group);
        if (newBoard.every((row) => row.every((cell) => cell === ""))) {
          showModal("success", "승리", "다시하기", () => {
            setBoard(getInitialBoard());
          });
        }
      }

      return group;
    },
    [board]
  );

  const removeGroup = (group: number[][]) => {
    const newBoard = board.map((row: string[]) => [...row]);

    group.forEach(([row, col]) => {
      newBoard[row][col] = "";
    });

    setBoard(newBoard);
    return newBoard;
  };

  const findGroups = (): number[][][] => {
    const visited = Array.from({ length: board.length }, () =>
      Array(board[0].length).fill(false)
    );

    const allGroups: number[][][] = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === "🎈" && !visited[i][j]) {
          const group = bfs([i, j], false, visited);
          allGroups.push(group);
        }
      }
    }

    allGroups.sort((a, b) => b.length - a.length);

    return allGroups;
  };

  const handleClickBlock = useCallback(
    (rowIdx: number, colIdx: number) => {
      const allGroups = findGroups();

      if (board[rowIdx][colIdx] === "🎈") {
        const clickedGroup = bfs([rowIdx, colIdx], false);

        if (allGroups[0].length === clickedGroup.length) {
          bfs([rowIdx, colIdx], true);
        } else {
          showModal("error", "패배");
        }
      } else {
        showModal("error", "패배");
      }
    },
    [board, findGroups]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board[0].length}, 60px)`,
      }}
    >
      {board.map((row: string[], rowIdx: number) =>
        row.map((col: string, colIdx: number) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            style={{
              fontSize: "xx-large",
              width: "60px",
              height: "60px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onClick={() => handleClickBlock(rowIdx, colIdx)}
          >
            {col}
          </div>
        ))
      )}
    </div>
  );
};

export default Game;
