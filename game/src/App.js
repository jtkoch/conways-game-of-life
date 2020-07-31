import React, { useState, useRef, useCallback } from 'react'
import produce from 'immer'
import Grid from './components/Grid'
import About from './components/About'
import styled from 'styled-components'

import Button from 'react-bootstrap/Button'

const Title = styled.div`
  padding: 1%;
`
const Generation = styled.div`
  padding: 0%;
`
const Controls = styled.nav`
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-;
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

function App() {
  const [grid, setGrid] = useState(() => 
    emptyGrid(startingRows, startingColumns)
  )
  const [generation, setGeneration] = useState(0)
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(10)

  // This gives the current value of the running state while being mutable
  const runningRef = useRef(running)
  runningRef.current = running 

  const speedRef = useRef(speed)
  speedRef.current = speed

    const handleClick = (i, j) => {
      let gridCopy = produce(grid, (newGrid) => {
        newGrid[i][j] = !newGrid[i][j]
      })
      setGrid(gridCopy)
    }

    const runSimulation = useCallback(() => {
      if (!runningRef.current) return

      setGrid(grid => {
        return produce(grid, (newGrid) => {

          for (let i = 0; i < startingRows; i++) {
            for (let j = 0; j < startingColumns; j++) {

              let neighbors = 0

              gridDirections.forEach(([x, y]) => {
                const rowBorder = i + x
                const columnBorder = j + y

                if (rowBorder >= 0 && rowBorder < startingRows && columnBorder >= 0 && columnBorder < startingColumns) {
                  neighbors += grid[rowBorder][columnBorder]
                }
              })

              if (neighbors < 2 || neighbors > 3) {
                newGrid[i][j] = 0
              } else if (grid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1
              }
            }
          }
          setGeneration(generation => generation += 1)
        })
      })  
      setTimeout(runSimulation, speedRef.current*100)
      }, [])

      const handleSpeedUp = () => {
        setSpeed(speed => speed -= 5)
        console.log(speed)
      }

      const handleSlowDown = () => {
        setSpeed(speed => speed += 5)
        console.log(speed)
      }



  return (
    <MainContainer>
        <Title>
          <h1>Conway's Game Of Life</h1>
        </Title>
        <Generation>
          Generation: {generation}
        </Generation>
      <Controls>
        <Button variant="info" onClick={() => {
          setRunning(!running)
          if (!running) {
            runningRef.current = true
            runSimulation()
          }
        }}>{`${running ? 'Stop' : 'Start'}`}</Button>
        <Button variant="info" onClick={() => {
          setRunning(false)
          setGrid(emptyGrid(startingRows, startingColumns))
          setGeneration(0)
        }}>Clear Grid</Button>
        <Button variant="info" onClick={() => {
          const rows = []
          for (let i = 0; i < startingRows; i++) {
            rows.push(
              Array.from(Array(startingColumns), () => 
                Math.random() > 0.8 ? 1 : 0
              )
            )
          }
          setGrid(rows)
        }}>Random Grid</Button>
        <Button variant="info" onClick={handleSpeedUp}>Speed Up</Button>
        <Button variant="info" onClick={handleSlowDown}>Slow Down</Button>        
        <About />
      </Controls>
      <div>

        <Grid grid={grid} setGrid={setGrid} handleClick={handleClick} />
      </div>
    </MainContainer>
  )
}

export default App
