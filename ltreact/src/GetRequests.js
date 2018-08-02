// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
//eslint-disable-next-line
//eslint-disable-next-line
import CreateLearningRequest from './CreateLearningRequest.js';
import GetTeachingRequests from './GetTeachingRequests';
import GetLearningRequests from './GetLearningRequests';
class GetRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:props.user,
            token:props.token,
            objectToRender:null,
        };
    }
    changeToTeacher=()=>{
        this.setState({
          objectToRender: <GetTeachingRequests mainSS={null} getFrom="http://127.0.0.1:8000/getTeachingRequests/" user={this.state.userName} token={this.state.token}/>, 
        });
    }
    changeToLearner=()=>{
        this.setState({
          objectToRender: <GetLearningRequests mainSS={null} getFrom="http://127.0.0.1:8000/getLearningRequests/" user={this.state.userName} token={this.state.token}/>, 
        });
    }
    render(){
        return (
            <div className="App">
              <div className="ccard text-white bg-primary mb-3">
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
export default GetRequest;