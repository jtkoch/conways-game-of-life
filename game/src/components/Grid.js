import React, { useState } from 'react'

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

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        emptyGrid(startingRows, startingColumns)
    })
    const [running, setRunning] = useState(false)

    return (
        <div>
            <h1>Grid</h1>
        </div>
    )
}

export default Grid