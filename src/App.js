import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Button';
import './css/style.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      current: '0',
      previews:[]
    }
  }
  addInCurrent=(params) =>{
    this.setState({current: this.state.current + params})
  }
  reset=()=>{
    this.setState({current:'0'})
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
      {symbol:'+',action:this.addInCurrent},
      {symbol:'0',action:this.addInCurrent},
      {symbol:'C',action:this.reset},
      {symbol:'=',action:this.addInCurrent},
      {symbol:'-',action:this.addInCurrent}
    ]
    return (
      <div className="calcDisplay">
        <input className="inptTxt" type="text" placeholder={this.state.current}/>
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
