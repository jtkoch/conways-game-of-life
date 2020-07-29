import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-gap: 2px;
    grid-template-columns: ${({ numColumns }) => (`repeat(${numColumns}, 20px)`)};
    padding: 0 12px 12px;
`

const GridCell = styled.div`
    grid-column-start: auto;
    grid-row-start: auto;
    border: 1px solid black;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: ${({ isAlive }) => (isAlive ? 'salmon' : 'transparent')};
`

const Grid = ({ grid, onClick }) => {
    return (
        <GridContainer numColumns={grid.length}>
            {grid.map((rows, rowIndex) => (
                rows.map((column, columnIndex) => (
                    <GridCell
                        isAlive={column} // column value: 1 or 0
                        key={`${rowIndex}_${columnIndex}`}
                        onClick={() => onClick(rowIndex, columnIndex)}
                    />
                ))
            ))}
        </GridContainer> 
    )
}

export default Grid