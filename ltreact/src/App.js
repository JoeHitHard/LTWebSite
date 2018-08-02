import React, { Component } from 'react';
import logo from './logo.svg';
import './mainBoot.css';
import './App.css';
import LogIn from './Login.js';
import SignIn from './SignIn.js';
import MainHeader from './MainHeader.js';
import {Helmet} from 'react-helmet';
import ViewPosts from './ViewPosts.js';
import ShowUserOptions from './ShowUserOptions';
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
  
  changeToShowUserOptions=()=>{
    this.setState({
      objectToRender: <ShowUserOptions change={this.changeToViewPosts} userid={this.state.userid} user={this.state.userName} token={this.state.token}/>, 
    });
  }
  changeToViewPosts=()=>{
    this.setState({
      objectToRender: <ViewPosts locationintial={this.state.locationIntial} userid={this.state.userid} user={this.state.userName} token={this.state.token}/>, 
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
            <MainHeader change={this.changeToShowUserOptions} className="wowState" name={this.state.userName} resetN={this.setIntialState} loggedin={this.state.isLoggedIn}/>
          </header>
          <SignIn mainSS={this.changeSignIn}/>
        </div>
      );
    }
    if(this.state.isLoggedIn===true){
      if(!this.state.objectToRender){
        this.changeToViewPosts();
      }
      return (
        <div className="App">
          <Helmet>
                <style>{'body { background-color: #1A1A1A; }'}</style>
          </Helmet>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <MainHeader change={this.changeToShowUserOptions} className="wowState" name={this.state.userName} resetN={this.setIntialState} loggedin={this.state.isLoggedIn}/>
          </header>
          {this.state.objectToRender}
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
            <MainHeader change={this.changeToShowUserOptions} className="wowState" name={this.state.userName} loggedin={this.state.isLoggedIn}/>
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
