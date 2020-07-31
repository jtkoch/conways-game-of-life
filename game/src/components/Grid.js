import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-gap: 1px;
    grid-template-columns: ${({ numColumns }) => (`repeat(${numColumns}, 20px)`)};
    padding: 0%;
`

const GridCell = styled.div`
    grid-column-start: auto;
    grid-row-start: auto;
    border: 1px solid black;
    cursor: pointer;
    width: 18px;
    height: 18px;
    background-color: ${({ isAlive }) => (isAlive ? '#00c9c3' : '#474747')};
`

const Grid = ({ grid, handleClick }) => {
    return (
        <GridContainer numColumns={grid.length}>
            {grid.map((rows, rowIndex) => (
                rows.map((column, columnIndex) => (
                    <GridCell
                        isAlive={column}
                        onClick = {() => handleClick(rowIndex, columnIndex)}
                        key={`${rowIndex}-${columnIndex}`}
                    />
                ))
            ))}
        </GridContainer> 
    )
}

export default Grid