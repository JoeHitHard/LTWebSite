// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
class LogIn extends Component{
    constructor(props){
        super(props);
        this.state={
            mainSS:props.mainSS,
            changeSignIn:props.changeSignIn,
            userName:null,
            password:null,
            error:null,
        };
    }
    userNameEnterd=(event)=>{
        this.setState({
            userName: event.target.value, 
       });
    }
    changeState=(event)=>{
        console.log("In The Changer");
        this.state.changeSignIn(true);
     }
    passwordEnterd=(event)=>{
        this.setState({
            password: event.target.value, 
       });
    }
    fetchToken=()=>{
        if(this.state.userName!==null&&this.state.password!==null){
            fetch('http://127.0.0.1:8000/api-token-auth/',{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.userName,
                    password: this.state.password,
                }),
            }).then(response=>response.json()).then(res=>{
                
                if(res.token){
                    this.state.mainSS(this.state.userName,res.user_id,res.token,res.locationintial);
                    return;
                }
                this.setState({
                    error:"Enter Valid Details or Try Signing In",
                })
            });
        }
        else{
            let message=null;
            if(this.state.userName==null){
                message="Enter User Name ";
            }
            if(this.state.password==null){
                if (message==null)
                    message="Enter Password";
                else{
                    message=message+"and Password";
                }
            }
            this.setState({
                error:message,
            })
        }
    }
    
    render(){
        return(
            <div className="card text-white bg-primary mb-3">
                <label ><h1 className="card-header">Log In:</h1></label>
                <div className="form-group">
                <label>{this.state.error}</label>
                <form className="card-body">
                    <label>
                        Name:
                        <input className="form-control" type="text" onChange={this.userNameEnterd} name="userName"  placeholder="User Name..."/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input className="form-control"  type="password" onChange={this.passwordEnterd} name="password"  placeholder="Password..."/>
                    </label>
                </form>
                    <br/>
                    <button className="btn btn-primary" onClick={this.fetchToken}  value="Submit" >Log-In</button>
                    <button className="btn btn-primary" onClick={this.changeState}  value="Submit" >Sign-Up</button>
                </div>  
            </div>
        );
    };
    
}
export default LogIn;