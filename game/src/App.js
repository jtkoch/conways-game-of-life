import React, { useState, useRef } from 'react'
import Grid from './components/Grid'

const startingRows = 30
const startingColumns = 100
const gridDirections = [
    [0, 1],   // right
    [0, -1],  // left
    [1, 0],   // top
    [-1, 0],  // down
    [1, -1],  // top right
    [-1, 1],  // top left
    [1, 1],   // bottom right
    [-1, -1], // bottom left
]

const emptyGrid = (numRows, numColumns) => {
    const rows = []
    for (let i =0; i < numRows; i++) {
        rows.push(Array(numColumns).fill(0))
    }
    return rows
}

const randomGrid = (numRows, numColumns) => {
    const rows = []
    for (let i = 0; i < numRows; i += 1) {
        rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.6 ? 1 : 0)))
    }
    return rows
}

const cellNeighbors = (grid, i, j) => {
  const numRows = grid.length
  const numColumns = numRows ? grid[0].length : 0
  let neighbors = 0

  gridDirections.forEach(([x, y]) => {
    const rowBorder = i + x
    const columnBorder = j + y
    if (rowBorder >= 0 && rowBorder < numRows && columnBorder >= 0 && columnBorder < numColumns) {
      neighbors += grid[rowBorder][columnBorder]
    }
  })
  return neighbors
}



function App() {
  const [grid, setGrid] = useState(() => {
    emptyGrid(startingRows, startingColumns)
  })
  const [running, setRunning] = useState(false)
  const usingRef = useRef(running)
  usingRef.current = running // updates the current value on every render

  const onClickCellHandler = (rowIndex, columnIndex) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid]
      newGrid[rowIndex][columnIndex] = prevGrid[rowIndex][columnIndex] ? 0 : 1
      return newGrid
    })
  }

  const onStartHandler = () => {
    setRunning(!running)

    if (!running) {
      usingRef.current = true
      // runSimulation()
    }
  }


  return (
    <div>
      <div>
        <button onClick={onStartHandler}>{`${running ? 'Stop' : 'Start'}`}</button>
        <button onClick={() => {
          setRunning(false)
          setGrid(emptyGrid(startingRows, startingColumns))
        }}>Clear Grid</button>
        <button onClick={() => setGrid(randomGrid(startingRows, startingColumns))}>Random Grid</button>
      </div>
        <Grid grid={grid} onClick={onClickCellHandler} />
    </div>
  )
}

export default App
