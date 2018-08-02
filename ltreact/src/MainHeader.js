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
              <select style={this.capatalizeNow} className="btn btn-primary" value={this.state.value} onChange={this.handleChange}>
                <option className="btn btn-outline-success">{this.props.name}</option>
                <option className="btn btn-outline-danger" value="logout">Log Out</option>
              </select>
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
