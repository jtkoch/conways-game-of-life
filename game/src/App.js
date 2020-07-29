import React, { useState, useRef, useCallback } from 'react'
import Grid from './components/Grid'
import styled from 'styled-components'

const Generation = styled.div`
  padding: 5%;
`
const Controls = styled.div`
  padding: 0%;
`
const Buttons = styled.button`
  padding: 1%;
  margin: 2%;
  width: 60%;
  background-color: teal;
  box-shadow: 2px 2px black;
  border-radius: 8px;
  font-family: 'Mulish', sans-serif;
  cursor: pointer;
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: 'Mulish', sans-serif;
`


const startingRows = 68
const startingColumns = 35
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
    for (let i = 0; i < numRows; i++) {
        rows.push(Array(numColumns).fill(0))
    }
    return rows
}

const randomGrid = (numRows, numColumns) => {
  const rows = []
  for (let i = 0; i < numRows; i += 1) {
    rows.push(
      Array.from(Array(numColumns), () => (Math.random() > 0.6 ? 1 : 0))
    )
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
  const [grid, setGrid] = useState(() => 
    emptyGrid(startingRows, startingColumns)
  )

  const [generation, setGeneration] = useState(0)
  const [running, setRunning] = useState(false)
  
  const generationRef = useRef(generation)
  generationRef.current = generation
  
  const runningRef = useRef(running)
  runningRef.current = running // updates the current value on every render

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
      runningRef.current = true
      runSimulation()
    }
  }

    const runSimulation = useCallback(() => {
      if (!runningRef.current) {
        return
      }

      setGrid(prevGrid => {
        const newGrid = prevGrid.map(rows => rows.slice(0));
        
        for (let i = 0; i < startingRows; i += 1) {
          for (let j = 0; j < startingColumns; j += 1) {
            const neighbors = cellNeighbors(prevGrid, i, j);
            
            if (neighbors < 2 || neighbors > 3) { // cell dies
              newGrid[i][j] = 0;
            } else if (newGrid[i][j] === 0 && neighbors === 3) { // cell lives
              newGrid[i][j] = 1;
            }
          }
        }
        
        return newGrid;
      });
  
      setTimeout(runSimulation, 10);
    }, []);


  return (
    <MainContainer>
      <Controls>
        <Generation>
          Generation: {generation}
        </Generation>
        <Buttons onClick={onStartHandler}>{`${running ? 'Stop' : 'Start'}`}</Buttons>
        <Buttons onClick={() => {
          setRunning(false)
          setGrid(emptyGrid(startingRows, startingColumns))
          setGeneration(0)
        }}>Clear Grid</Buttons>
        <Buttons onClick={() => setGrid(randomGrid(startingRows, startingColumns))}>
          Random Grid
        </Buttons>
      </Controls>
      <div>
        <Grid grid={grid} setGrid={setGrid} onClick={onClickCellHandler} />
      </div>
    </MainContainer>
  )
}

export default App
