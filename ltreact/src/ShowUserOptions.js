import React, { Component } from 'react';
import './mainBoot.css';
import './App.css';
import {Helmet} from 'react-helmet';
import GetUserRequest from './GetUserRequests';
class ShowUserOptions extends Component {
  constructor(props){
    super(props);
    this.state={
      change:props.change,
      userName:props.user,
      userId:props.userid,
      token:props.token,
      objectToRender:null,
    }
  }
  changeToGetUserRequest=()=>{
    this.setState({
      objectToRender: <GetUserRequest user={this.state.userName} token={this.state.token}/>, 
    });
  }
  render() {
    return (
        <div className="App">
          <Helmet>
                <style>{'body { background-color: #1A1A1A; }'}</style>
          </Helmet>
          <div className="ccard text-white bg-primary mb-3">
            <div className="nav nav-pills">
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.state.change} >Home</button>
              </li>
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.changeToGetUserRequest} >Get My Requests</button>
              </li>
            </div>
            {this.state.objectToRender}
          </div>
        </div>
    );
    }
}
export default ShowUserOptions;
