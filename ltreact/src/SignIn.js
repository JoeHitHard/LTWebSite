// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
import './App.css';
// eslint-disable-next-line
import { RadioGroup, RadioButton } from 'react-radio-buttons';
class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            mainSS:props.mainSS,
            userName:null,
            email:null,
            kind:"Both",
            locationVal:null,
            reenterpassword:null,
            password:null,
            error:null,
            contactinfo:null,
        };
    }
    userNameEnterd=(event)=>{
        this.setState({
            userName: event.target.value, 
       });
    }
    contactinfoEnterd=(event)=>{
        this.setState({
            contactinfo: event.target.value, 
       });
    }
    passwordEnterd=(event)=>{
       this.setState({
            password: event.target.value, 
       });
    }
    repasswordEnterd=(event)=>{
        this.setState({
            reenterpassword: event.target.value, 
        });
    }
    emailEnterd=(event)=>{
        this.setState({
            email: event.target.value, 
        });
    }
    locationValEnterd=(event)=>{
        this.setState({
            locationVal: event.target.value, 
        });
    }
    typeofaccount=(event)=>{
        this.setState({
            kind:event,
        });
    }
    goToLogin=(event)=>{
        this.state.mainSS(false);
        return;
    }
    createUser=()=>{
        if(this.state.password!==this.state.reenterpassword){
            this.setState({
                userName:null,
                email:null,
                kind:null,
                reenterpassword:null,
                password:null,
                error:"Enter Right password",
                contactinfo:null,
            })
        }
        if(this.state.userName!==null&&this.state.password!==null&&this.state.userName!==""&&this.state.password!==""&&this.state.email!=null&&this.state.email!==""&&this.state.locationVal!=null&&this.state.locationVal!==""&&this.state.contactinfo!==null&&this.state.contactinfo!==""){
            fetch('http://127.0.0.1:8000/signup/',{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.userName,
                    password: this.state.password,
                    kind: this.state.kind,
                    email: this.state.email,
                    location:this.state.locationVal,
                    contactinfo: this.state.contactinfo,
                }),
            }).then(response=>response.json()).then(res=>{
                console.log("Here is Response:"+res);
                if(res.created){
                    this.state.mainSS(false);
                    return;
                }
                if(res.error){
                    var message=null;
                if(res.error.username){
                    if(message===null){
                        message="User Name:"+res.error.username;
                    }
                    else
                        message=message+",User Name"+res.error.username;
                }
                if(res.error.email){
                    if(message===null){
                        message="Email id:"+res.error.email;
                    }
                    else
                        message=message+", Email"+res.error.email;
                }
                if(res.error.password){
                    if(message===null){
                        message="Password:"+res.error.password;
                    }
                    else
                        message=message+", Password:"+res.error.email;
                }
                this.setState({
                    error:message,
                })
                }
                else{
                    this.setState({
                        error:res,
                    })
                }
            });
        }
        else{
            let message=null;
            if(this.state.userName==null){
                message="Enter User Name ";
            }
            if(this.state.password==null){
                if (message==null)
                    message="Enter Password ";
                else{
                    message=message+", Password ";
                }
            }
            if(this.state.reenterpassword==null){
                if (message==null)
                    message="Enter Password ";
                else{
                    message=message+", Password ";
                }
            }
            if(this.state.kind==null){
                if (message==null)
                    message="Enter Type Of Account ";
                else{
                    message=message+", Type of account ";
                }
            }
            if(this.state.contactinfo==null){
                if (message==null)
                    message="Enter Phone Number ";
                else{
                    message=message+", Phone Number ";
                }
            }
            if(this.state.email==null){
                if (message==null)
                    message="Enter Email ";
                else{
                    message=message+", Email ";
                }
            }
            if(this.state.locationVal==null){
                if (message==null)
                    message="Enter Location ";
                else{
                    message=message+", Location ";
                }
            }
            this.setState({
                error:message,
            })
        }
    }
    headerStyle={
        color: 'white',
    }
    // eslint-disable-next-line
    emailPattren="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    render(){
        return(
            <div className="ccard text-white bg-primary mb-3">
                <h1 className="card-header">Sign-In</h1>
                <div className="card-body">
                <label>{this.state.error}</label>
                <form>
                    <label>
                        Name:
                        <input className="form-control" type="text" onChange={this.userNameEnterd} name="userName" placeholder="User Name..."/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input className="form-control"  type="password" onChange={this.passwordEnterd} name="password" placeholder="Password..."/>
                    </label>
                    <br/>
                    <label>
                        Re-Password:
                        <input className="form-control" type="password" onChange={this.repasswordEnterd} name="password"  placeholder="Re-Enter Password..."/>
                    </label> 
                    <br/>
                    <label>
                        Phone Number:
                        <input className="form-control" onChange={this.contactinfoEnterd} type="text"  placeholder="Phone Number..." pattern="[0-9]{10}"  />
                    </label>
                    <br/>
                    <label>
                        Email Id:
                        <input className="form-control" onChange={this.emailEnterd} type="text"  placeholder="Email Id..." pattern={this.emailPattren}  />
                    </label>
                    <br/>
                    <label>
                        location:
                        <input className="form-control" onChange={this.locationValEnterd} type="text"  placeholder="Location..."   />
                    </label>
                    
                </form>
                    <br/>
                    <button className="btn btn-primary" onClick={this.createUser}  value="Submit" >Sign-Up</button> 
                    <button className="btn btn-primary" onClick={this.goToLogin}  value="Submit" >Log-In</button> 
                </div>
            </div>
        );
    };
    
}
export default SignIn;