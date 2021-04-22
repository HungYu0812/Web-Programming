import React, { Component } from "react";
//import Header from "../components/Header";
import Table from "../components/Table";
//import Form from "../components/Form";
import './FakeSheet.css';
function zeros(dimensions) {
    var array = [];
    for (let i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }
    return array;
}
/*
function findOne(object){
    for(let y in object){
        for(let x in object[y]){
            if(object[y][x]===1){
                return ([y,x]);
            }
        }
    }
    return 0;
}*/
class FakeSheet extends Component {
    constructor(props){
        super(props);
        this.gridX = 26;
        this.gridY = 100;
        this.record=[];
        this.button_state=false;
        this.state = {
            gridX:this.gridX,
            gridY:this.gridY,
            data: {},
            edit_array:zeros([this.gridY,this.gridX]),            
        }
        this.addColumn = this.addColumn.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeColumn = this.removeColumn.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.recordLocation = this.recordLocation.bind(this);
        this.updateButton = this.updateButton.bind(this);
    }
    updateButton(value){
        if (value==1){
            this.button_state = true;
        }
        else if (value==0){
            this.button_state = false;
        }
    }
    recordLocation(xx,yy){
        this.record = [xx,yy];
    }

    handleChangedCell = ({x,y}, value, mode=0)=>{
        let modifiedData = Object.assign({},this.state.data);
        let modifiedEdit = Object.assign({},this.state.edit_array);
        if (!modifiedData[y]) modifiedData[y] = {};
        if (!modifiedEdit[y]) modifiedEdit[y] = {};
        modifiedEdit[y][x] = 0;
        modifiedData[y][x] = {};
        modifiedData[y][x] = value;
        let Y = parseInt(y, 10);
        if(mode ==1){
            if (Y < this.state.gridY-1){
                modifiedEdit[y+1][x] = 1;
                this.updateButton(1);
            }
            else{
                modifiedEdit[y][x] = 0;
                this.updateButton(0);
            }
            this.setState({ data: modifiedData,edit_array: modifiedEdit,});
        }
        else{
            this.setState({ data: modifiedData,edit_array: modifiedEdit,});
        }
    }
    updateEditArr = ({x,y}, value) =>{
        let modifiedEdit = Object.assign({},this.state.edit_array);
        if (!modifiedEdit[y]) modifiedEdit[y] = {};
        modifiedEdit[y][x] =value;
        this.setState({ edit_array: modifiedEdit });
    }
    updateCells = () => {
        this.forceUpdate();
    }

    addColumn(){
        let modifiedData = Object.assign({},this.state.data);
        let newModifiedData = {};
        let newGridX = this.state.gridX + 1;
        if (this.button_state){
            for(let y in modifiedData){
                for (let x in modifiedData[y]){
                    let tmp = modifiedData[y][x];
                    let newX = parseInt(x, 10);
                    if(x > this.record[0][0]-1){
                        newX = parseInt(x, 10)+1;
                    }
                    if (newModifiedData[y]==undefined){
                        newModifiedData[y]={};
                    }
                    newModifiedData[y][newX] = tmp;
                }
            }
        }
        this.setState({data: newModifiedData,gridX:newGridX, edit_array: zeros([this.state.gridY,newGridX])});
    }
    removeColumn(){
        if (this.button_state){
            let modifiedData = Object.assign({},this.state.data);
            let newGridX = this.state.gridX - 1;
            for(let y in modifiedData){
                for (let x in modifiedData[y]){
                    if (x == this.record[0][0]){
                        delete modifiedData[y][x];
                    }
                    else if(x > this.record[0][0]){
                        let tmp = modifiedData[y][x];
                        delete modifiedData[y][x];
                        let newX = parseInt(x, 10)-1;
                        modifiedData[y][newX] = tmp;
                    }
                }
            }
            this.setState({data: modifiedData,gridX:newGridX,edit_array: zeros([this.state.gridY,newGridX])});
        }
    }
    addRow(){
        let modifiedData = JSON.parse(JSON.stringify(this.state.data));
        let newGridY = this.state.gridY + 1;
        let newModifiedData = {};
        if (this.button_state){
            for(let y in this.state.data){
                if(y > this.record[0][1]-1){
                    let tmp = this.state.data[y];
                    let newY = parseInt(y, 10)+1;
                    newModifiedData[newY]={};
                    newModifiedData[newY] = tmp;
                }
                else{
                    let tmp = this.state.data[y];
                    let newY = parseInt(y, 10);
                    newModifiedData[newY]={};
                    newModifiedData[newY] = tmp;
                }
            }
            this.setState({data: newModifiedData,gridY:newGridY, edit_array: zeros([newGridY,this.state.gridX])});
        }
        else{
            this.setState({data: modifiedData,gridY:newGridY, edit_array: zeros([newGridY,this.state.gridX])});
        }
    }
    removeRow(){
        if (this.button_state){
            let modifiedData = JSON.parse(JSON.stringify(this.state.data));
            let newGridY = this.state.gridY - 1;
            let newModifiedData = {};
            for(let y in this.state.data){
                if (y != this.record[0][1]){
                    let tmp = this.state.data[y];
                    let newY = parseInt(y, 10);
                    if (y > this.record[0][1]){
                        newY = parseInt(y, 10)-1;
                    }
                    newModifiedData[newY]= tmp;
                }
            }
            this.setState({data: newModifiedData,gridY:newGridY, edit_array: zeros([newGridY,this.state.gridX])});
        }
    }

    render() {
        return (
            <div>
                <div className="column_button_group">
                    <button onClick = {this.addColumn}>+</button>
                    <button onClick = {this.removeColumn}>-</button>
                </div>
                <div>
                    <div className="row_button_group" style={{display: "inline-block"}}>
                        <button className="row_button" onClick = {this.addRow}>+</button>
                        <button className="row_button" onClick = {this.removeRow}>-</button>
                    </div>
                    <div className="table_full" style={{display: "inline-block"}}>
                    <Table
                    x={this.state.gridX} 
                    y={this.state.gridY}
                    handleChangedCell={this.handleChangedCell}
                    updateCells={this.updateCells}
                    updateEditArr={this.updateEditArr}
                    data={this.state.data}
                    recordLocation={this.recordLocation}
                    edit_array = {this.state.edit_array}
                    updateButton={this.updateButton}
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default FakeSheet;

