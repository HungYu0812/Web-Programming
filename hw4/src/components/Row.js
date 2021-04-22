import React from 'react'
import Cell from './Cell'

const Row = (props) => {
    const cells=[];
    const y = props.y;
    for (let x = 0; x < props.x; x += 1){
        cells.push(
            <Cell 
            key={`${x}-${y}`}
            y={y}
            x={x}
            onChangedValue={props.handleChangedCell}
            updateCells={props.updateCells}
            updateEditArr={props.updateEditArr}
            value={props.rowData[x] || ''}
            editArr={props.rowEdit[x]}
            recordLocation={props.recordLocation}
            updateButton={props.updateButton}
            />
        )
    }
    return (
        <div style={{whiteSpace:'nowrap'}}>
            {cells}
        </div>
    )
}


export default Row;