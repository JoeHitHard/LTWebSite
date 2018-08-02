import React, { Component } from 'react';
import './mainBoot.css'
class MainHeader extends Component {
  constructor(props){
    super(props)
    this.state={
      reset:props.resetN,
      isloggedin:props.loggedin,
    }
  }
  resetNow=()=>{
    this.props.resetN();
  }
  handleChange=(event)=> {
    if(event.target.value==="logout"){
      this.resetNow();
    }
    if(event.target.value==="userOptions"){
      this.props.change();
    }
  }
  capatalizeNow={
    textTransform:"uppercase",
    color:"white",
  }
  render() {
    
    if(this.props.loggedin===true){
      return (
        <div className="wowState">
          <div className="nav nav-pills">
            <div className="btn-group">
              <button className="btn btn-outline-success" onClick={this.props.change}>{this.props.name}</button>
              <button className="btn btn-outline-danger" onClick={this.resetNow}>Log Out</button>
            </div>
          </div>
        </div>
      );
    }
      return (
        <div className="wowState">
          <button className="btn btn-outline-danger">Anonymous</button>
        </div>
      );

  }
}

export default MainHeader;
