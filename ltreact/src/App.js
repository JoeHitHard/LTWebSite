import React, { Component } from 'react';
import logo from './logo.svg';
import './mainBoot.css';
import './App.css';
import LogIn from './Login.js';
import SignIn from './SignIn.js';
import MainHeader from './MainHeader.js';
import {Helmet} from 'react-helmet';
import PostARequest from './PostARequest.js';
import GetRequest from './GetRequests';
import GetUserRequest from './GetUserRequests';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      willSignIn:false,
      userName:null,
      locationIntial:null,
      userId:null,
      token:null,
      display:false,
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
  changeToGetUserRequest=()=>{
    this.setState({
      objectToRender: <GetUserRequest user={this.state.userName} token={this.state.token}/>, 
    });
  }
  render() {
    if(this.state.willSignIn){
      return(
        <div className="App">
            <Helmet>
                <style>{'body { background-color: #1A1A1A; }'}</style>
            </Helmet>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <MainHeader className="wowState" name={this.state.userName} resetN={this.setIntialState} loggedin={this.state.isLoggedIn}/>
          </header>
          <SignIn mainSS={this.changeSignIn}/>
        </div>
      );
    }
    if(this.state.isLoggedIn===true){
      return (
        <div className="App">
          <Helmet>
                <style>{'body { background-color: #1A1A1A; }'}</style>
          </Helmet>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <MainHeader className="wowState" name={this.state.userName} resetN={this.setIntialState} loggedin={this.state.isLoggedIn}/>
          </header>
          <div className="ccard text-white bg-primary mb-3">
            <div className="nav nav-pills">
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.changeToPostARequest} >Post A Request</button>
              </li>
              <li class="nav-item">
                <button className="btn btn-primary" onClick={this.changeToGetRequest} >Get All Requests</button>
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
    return(
      <div className="App">
          <Helmet>
                <style>{'body { background-color: #1A1A1A; }'}</style>
          </Helmet>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <MainHeader className="wowState" name={this.state.userName} loggedin={this.state.isLoggedIn}/>
          </header>
          <LogIn mainSS={this.setLogInMainState} changeSignIn={this.changeSignIn}/>
      </div>
    );
  }
  changeSignIn=(stateChanger)=>{
    this.setState({
      willSignIn:stateChanger,
    });
  }
  

  setLogInMainState=(name,id,pass,locationintial)=>{
    this.setState({
      userName:name,
      userId:id,
      locationIntial:locationintial,
      isLoggedIn:true,
      token:pass,
    });
  }
  setIntialState=()=>{
    this.setState({
      userName:null,
      isLoggedIn:false,
      locationintial:null,
      token:null,
    });
  }
}
// eslint-disable-next-line
{/* <TeachingRequestView mainSS={null} username={this.state.userName} token={this.state.token}/> */}
export default App;
