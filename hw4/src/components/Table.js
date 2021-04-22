import React from 'react'
import Row from './Row'

export default class Table extends React.Component{
    constructor(props){
        super(props);
    }
    /*

    handleChangedCell = ({x,y}, value, mode=0)=>{
        const modifiedData = Object.assign({},this.state.data);
        const modifiedEdit = Object.assign({},this.state.edit_array);
        if (!modifiedData[y]) modifiedData[y] = {};
        if (!modifiedEdit[y]) modifiedEdit[y] = {};
        modifiedEdit[y][x] = 0;
        modifiedData[y][x] = value;
        if(mode ==1){
            modifiedEdit[y+1][x] = 1;
            this.setState({ data: modifiedData,edit_array: modifiedEdit });
        }
        else{
            this.setState({ data: modifiedData,edit_array: modifiedEdit });
        }
    }
    updateEditArr = ({x,y}, value) =>{
        const modifiedEdit = Object.assign({},this.state.edit_array);
        if (!modifiedEdit[y]) modifiedEdit[y] = {};
        modifiedEdit[y][x] = value;
        console.log("EDITEDIT:",modifiedEdit[2][1]);
        this.setState({ edit_array: modifiedEdit });
    }
    updateCells = () => {
    this.forceUpdate();}*/
    render(){
        const rows=[];
        for (let y = 0; y < this.props.y; y += 1){
            const rowData = this.props.data[y] || {};
            const rowEdit = this.props.edit_array[y] || {};
            rows.push(
            <Row
            handleChangedCell={this.props.handleChangedCell}
            updateCells={this.props.updateCells}
            updateEditArr={this.props.updateEditArr}
            key={y}
            y={y}
            x={this.props.x}
            rowData={rowData}
            rowEdit={rowEdit}
            recordLocation={this.props.recordLocation}
            updateButton={this.props.updateButton}
            />,
            )
        }
        return (
            <div>
                {rows}
            </div>
        )
    }
}