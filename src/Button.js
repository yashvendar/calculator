import React, { Component } from 'react';
import './css/style.css';
class Button extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <button className="button" onClick={()=>this.props.action(this.props.symbol)}>{this.props.symbol}</button>
        )
    }
}
export default Button;