// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
import GetUserTeachingRequests from './GetUserTeachingRequests';
import GetUserLearningRequests from './GetUserLearningRequests';
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
          objectToRender: <GetUserTeachingRequests mainSS={null}  user={this.state.userName} token={this.state.token}/>, 
        });
    }
    changeToLearner=()=>{
        this.setState({
          objectToRender: <GetUserLearningRequests mainSS={null}  user={this.state.userName} token={this.state.token}/>, 
        });
    }
    render(){
        return (
            <div className="App">
              <div className="ccard text-white bg-primary mb-3">
                <h1 className="card-title">Get Requests</h1>
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