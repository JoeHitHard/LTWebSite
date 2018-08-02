import React, { Component } from 'react';
import './mainBoot.css';
import './App.css';
import PostARequest from './PostARequest';
import GetRequest from './GetRequests';
class ShowUserOptions extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:props.user,
      userId:props.userid,
      token:props.token,
      locationIntial:props.locationintial,
      objectToRender:null,
    }
  }
  changeToPostARequest=()=>{
    this.setState({
      objectToRender: <PostARequest username={this.state.userName} token={this.state.token} locationintial={this.state.locationIntial}/>, 
    });
  }
  changeToGetRequest=()=>{
    this.setState({
      objectToRender: <GetRequest user={this.state.userName} token={this.state.token}/>, 
    });
  }
  render() {
    return(
        <div className="ccard text-white bg-primary mb-3">
            <div className="nav nav-pills">
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.changeToPostARequest} >Post A Request</button>
              </li>
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.changeToGetRequest} >Get All Requests</button>
              </li>
            </div>
            {this.state.objectToRender}
        </div>
    );
  }
}
export default ShowUserOptions;
