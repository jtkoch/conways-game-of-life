import React from 'react'
import { produce } from 'immer'

const Grid = ({ grid, setGrid, startingColumns }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${startingColumns}, 18px)`
        }}>
            {grid.map((rows, rowIndex) =>
                rows.map((column, columnIndex) => (
                    <div key={`${rowIndex}=${columnIndex}`}
                        style={{
                            width: 18, height: 18,
                            backgroundColor: grid[rowIndex][columnIndex] ? '#00c9c3' : '#474747',
                            border: "1px solid black"
                        }}
                        onClick={() => {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[rowIndex][columnIndex] = gridCopy[rowIndex][columnIndex] ? 0 : 1
                            })
                            setGrid(newGrid)
                        }}
                    ></div>
                ))
            )}
        </div>
    )
}

export default Grid