import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import './css/style.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      current: '0',
      previous:[],
      nextIsReset: false
    }
  }
  
  addInCurrent=(params) =>{
    if(["/", "-", "+", "*","%","^"].indexOf(params)>-1){
        let {previous} = this.state;
        if(previous.length<1){
          if(params==='^') previous.push(this.state.current + "**");
          else previous.push(this.state.current + params);
          this.setState({previous,current:"0", nextIsReset: true});
        }
        else{
          let lastpara = String(previous.slice(previous.length - 1));
          previous.pop();
          if(["/","+","-","*","%","^"].indexOf(lastpara.charAt(lastpara.length -1))>-1){
              if(params==='^')  previous.push(lastpara+ this.state.current + "**");
              else previous.push(lastpara+ this.state.current + params);
              this.setState({previous,current:"0" ,nextIsReset: true});
          }
          else{
            if(this.state.current!=='0'){
              previous.push(this.state.current + params);
            }
            else{
              lastpara+=params;
              previous.push(lastpara);
            }
            this.setState({previous,nextIsReset: true})
          }
        }
    }
    else{
        if((this.state.current==="0" && params!==".") || this.state.nextIsReset){
          this.setState({current: params,nextIsReset:false})
        }
        else{
          this.setState({current: this.state.current + params})
        }
    }
  }
  reset=()=>{
    this.setState({current:'0', previous :[], nextIsReset:false})
  }
  calculate=(params)=>{
    let {current, previous}= this.state;
    if(previous.length >0){
      let lastpara = String(previous.slice(previous.length - 1));
      let lastchar = lastpara.substring(lastpara.length - 1);
      //console.log(lastchar);
      if(['/','*','+','-','%','^'].indexOf(lastchar)>-1)  current = eval(String(previous[previous.length - 1]+current));
      else current = eval(String(previous[previous.length - 1]));
      this.state.previous.push(current);
      this.setState({current:"0",previous,nextIsReset: true});
    }
  }
  deleteLastChar=()=>{
    if(this.state.current==='0'){
      if(this.state.previous.length==0) return;
      let {previous} =this.state;
      let lastpara =previous[previous.length - 1];
      if(String(lastpara).length>1) lastpara = lastpara.substring(0,String(lastpara).length -1);
      else lastpara='0';
      previous.pop();
      previous.push(lastpara);
      //console.log(lastpara);
      this.setState({previous});
    }
    else if(String(this.state.current).length>0){
      let {current} =this.state;
      if(current.length >1) current = current.substring(0,current.length -1);
      else current = '0';
      this.setState({current});
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', (event) => {
      //console.log(event.which);
      let pressedKey = event.code;
      let digits = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
                  'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9', 'Numpad0', ];
      if (digits.indexOf(event.code)>-1 ){
        let num = pressedKey.charAt(pressedKey.length - 1);
        this.addInCurrent(num);
      }
      
      else if(pressedKey === 'NumpadMultiply'){
        this.addInCurrent('*');
      }
      else if(pressedKey === 'NumpadDivide'){
        this.addInCurrent('/');
      }
      else if(pressedKey === 'NumpadAdd'){
        this.addInCurrent('+');
      }
      else if(pressedKey === 'NumpadSubtract'){
        this.addInCurrent('-');
      }
      else if(pressedKey === 'NumpadEnter'){
        this.calculate();
      }
      else if(pressedKey === 'NumpadDecimal' || pressedKey === 'Period'){
        this.addInCurrent('.');
      }
      else if(pressedKey === 'KeyC'){
        this.reset();
      }
      else if(pressedKey === 'Delete'){
        this.deleteLastChar();
      }
    });
  }
  render() {
    const buttons =[
      {symbol:'1',action:this.addInCurrent},
      {symbol:'2',action:this.addInCurrent},
      {symbol:'3',action:this.addInCurrent},
      {symbol:'/',action:this.addInCurrent},
      {symbol:'4',action:this.addInCurrent},
      {symbol:'5',action:this.addInCurrent},
      {symbol:'6',action:this.addInCurrent},
      {symbol:'*',action:this.addInCurrent},
      {symbol:'7',action:this.addInCurrent},
      {symbol:'8',action:this.addInCurrent},
      {symbol:'9',action:this.addInCurrent},
      
      {symbol:'-',action:this.addInCurrent},
      {symbol:'.',action:this.addInCurrent},
      {symbol:'0',action:this.addInCurrent},
      {symbol:'%',action:this.addInCurrent},
      {symbol:'+',action:this.addInCurrent},
      {symbol:'^',action:this.addInCurrent},
      {symbol:'C',action:this.reset},
      {symbol:'Del',action:this.deleteLastChar},
      
      
      {symbol:'=',action:this.calculate}
    ]
    return (
      <div className="calcDisplay">
        <div className="lastVal">{this.state.previous[this.state.previous.length - 1]}</div>
        <div className="inptTxt">{this.state.current}</div>
        <div className="keyboard">
          { buttons.map((btn,i)=>{
            return(
              <Button key={i} symbol={ btn.symbol } action={(symbol)=>btn.action(symbol)}/>
            )
          }) }
        </div>
      </div>
    );
  }
}

export default App;
