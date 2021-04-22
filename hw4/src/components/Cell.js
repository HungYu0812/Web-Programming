import React from 'react'

function convertToNumberingScheme(number) {
  var baseChar = ("A").charCodeAt(0),
      letters  = "";

  do {
    number -= 1;
    letters = String.fromCharCode(baseChar + (number % 26)) + letters;
    number = (number / 26) >> 0; // quick `floor`
  } while(number > 0);

  return letters;
}

export default class Cell extends React.Component{
    constructor(props){
        super(props);
        this.state={
            singleClickMode: false,
            value:props.value,
        }
        //this.singleClickMode = false;
        this.inputBegin = false;
        this.display = this.determineDisplay(
            {x: props.x, y: props.y},
            props.value
        );
        this.timer = 0;
        this.delay = 200;
        this.prevent = false;
        this.id = `grid-${props.x}-${props.y}`;
    }
    componentDidMount(){
        window.document.addEventListener('unselectAll',this.handleUnselectAll);
    }
    componentWillUpdate(){
        this.display = this.determineDisplay({ x: this.props.x, y: this.props.y }, this.state.value)
    }
    componentWillUnmount(){
        window.document.removeEventListener('unselectAll',this.handleUnselectAll);
    }
    onChange = (e)=>{
        this.setState({ value: e.target.value });
        this.display = this.determineDisplay({ x: this.props.x, y: this.props.y },e.target.value);
    }
    
    onKeyPressOnInput = (e) =>{
        //console.log(e.target.mode);
        if (e.key && this.inputBegin){
            e.target.value = null;
            this.inputBegin = false;
        }
        if (e.key ==='Enter'){
            this.hasNewValue(e.target.value);
        }
        if (e.key ==="Delete"){
            e.target.value= null;
            e.target.value = "";
            //console.log("DEL:",e.target.value)
            this.hasNewValue(e.target.value);
            this.setState({ value: e.target.value })
            this.props.updateButton(0);
        }
    }
    onKeyDownOnInput = (e) =>{
        if (e.key && this.inputBegin){
            e.target.value = null;
            this.inputBegin = false;
        }
        if (e.key ==='Enter'){
            setTimeout(()=>{
                this.hasNewValue(e.target.value,1);
            },3);
            //this.hasNewValue(e.target.value,1);
            //this.props.updateButton(1);
        }
        if (e.key ==="Delete"){
            //console.log("DEL:",e.target.value)
            e.target.value = "";
            this.hasNewValue(e.target.value);
            this.setState({ value: e.target.value })
            this.props.updateButton(0);
        }
    }
    onBlur = (e) =>{
        this.props.recordLocation([this.props.x,this.props.y]);
        this.hasNewValue(e.target.value);
        //this.setState({ value: this.props.value });
        setTimeout(()=>{
            this.props.updateButton(0);
        },200);
    }
    hasNewValue = (value,mode) =>{
        //console.log("Value: ",value);
        //this.props.updateEditArr({x:this.props.x,y:this.props.y},0);
        if (mode ==1){
            this.props.onChangedValue({ x: this.props.x, y: this.props.y },value,1);
        }
        else{
            this.props.onChangedValue({ x: this.props.x, y: this.props.y },value);
        }
        this.setState({ singleClickMode :false});
    }
    emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll');
        window.document.dispatchEvent(unselectAllEvent);
    }

    clicked =(e) =>{
        this.timer = setTimeout(() => {
        if (!this.prevent) {
            this.setState({ value: this.props.value });
            this.props.updateButton(1);
            this.emitUnselectAllEvent();
            this.props.updateEditArr({x:this.props.x,y:this.props.y},1);
            this.inputBegin = true;
            this.setState({singleClickMode: true});
        }
        this.prevent = false
        }, this.delay)
    }
    doubleClicked = () => {
        clearTimeout(this.timer);
        this.prevent = true;
        this.props.updateButton(1);
        this.emitUnselectAllEvent();
        this.props.updateEditArr({x:this.props.x,y:this.props.y},1);
    }
    determineDisplay = ({x,y},value) =>{
        return value;
    }
    calculateCss = ()=>{
        const css = {
            width: '80px',
            padding: '4px',
            margin: '0',
            height: '25px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'inline-block',
            color: 'black',
            border: '1px solid #cacaca',
            textAlign: 'left',
            verticalAlign: 'top',
            fontSize: '14px',
            lineHeight: '15px',
            overflow: 'hidden',
        };
        return css;
    }
    render(){
        const css = this.calculateCss();
        if (this.props.x === 0){
            return(
                <span 
                style={css}
                id={this.id}>
                    {this.props.y}
                </span>
            )
        }
        if (this.props.y === 0){
            const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('');
            return (
                <span 
                style={css}
                role="presentation">
                    {convertToNumberingScheme(this.props.x)}
                </span>
            )
        }
        //console.log(this.props.editArr, this.props.x, this.props.y);
        if (this.props.editArr ==1) {
            css.outlineColor = 'blue';
            css.backgroundColor = '#D3D3D3';
        }
        if (this.props.editArr ==1 ){
            if (this.state.singleClickMode){
                return(
                    <input
                    style={css}
                    type="text"
                    onBlur={this.onBlur}
                    onKeyDown={this.onKeyDownOnInput}
                    value= {this.state.value}
                    onChange={this.onChange}
                    id={this.id}
                    autoFocus
                    />
                )
            }
            return(
                <input
                style={css}
                type="text"
                onBlur={this.onBlur}
                onKeyPress={this.onKeyDownOnInput}
                value={this.state.value}
                onChange={this.onChange}
                autoFocus
                />
            )
        }
        return (
            <span
            onClick={e => this.clicked(e)}
            onDoubleClick={e => this.doubleClicked(e)}
            style={css}
            role="presentation">
                {this.props.value}
            </span>
        )
    }
}