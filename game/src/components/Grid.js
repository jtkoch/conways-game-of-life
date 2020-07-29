import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-gap: 1px;
    grid-template-columns: ${({ numColumns }) => (`repeat(${numColumns}, 20px)`)};
    padding: 1%;
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