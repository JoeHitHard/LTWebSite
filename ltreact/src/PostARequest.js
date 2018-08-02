// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
//eslint-disable-next-line
import CreateTeachingRequest from './CreateTeachersRequest.js';
//eslint-disable-next-line
import CreateLearningRequest from './CreateLearningRequest.js';
class PostARequest extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:props.username,
            token:props.token,
            locationVal:props.locationintial,
            objectToRender:null,
        };
    }
    changeToTeacher=()=>{
        this.setState({
          objectToRender: <CreateTeachingRequest mainSS={null} username={this.state.userName} token={this.state.token} locationintial={this.state.locationVal}/>, 
        });
    }
    changeToLearner=()=>{
        this.setState({
          objectToRender: <CreateLearningRequest mainSS={null} username={this.state.userName} token={this.state.token} locationintial={this.state.locationVal}/>, 
        });
    }
    render(){
        return (
            <div className="App">
              <div className="ccard text-white bg-primary mb-3">
              <h1 className="card-title">Post Requests</h1>
                <div className="nav nav-pills">
                  <li class="nav-item">
                    <button className="btn btn-primary" onClick={this.changeToTeacher} >Teacher</button>
                  </li>
                  <li class="nav-item">
                    <button className="btn btn-primary" onClick={this.changeToLearner} >Learner</button>
                  </li>
                </div>
                {this.state.objectToRender}
              </div>
            </div>
        );
    }
}
export default PostARequest;