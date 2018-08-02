// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
class EditLearningRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            requestid:props.requestid,
            mainSS:props.mainSS,
            userName:props.username,
            token:props.token,
            locationVal:props.locationintial,
            nameOfTalent:props.nameOfTalent,
            talentDescription:props.talentDescription,
            category:props.category,
            error:null,
        };
    }
    nameOfTalentEntered=(event)=>{
        this.setState({
            nameOfTalent: event.target.value, 
       });
    }
    descriptionEntered=(event)=>{
        this.setState({
            talentDescription: event.target.value, 
       });
    }
    categoryEntered=(event)=>{
        this.setState({
            category: event.target.value, 
       });
    }
    locationEntered=(event)=>{
        this.setState({
            locationVal: event.target.value, 
       });
    }
    createTeacherRequest=()=>{
        if(this.state.nameOfTalent!=null&&this.state.nameOfTalent!==""&&this.state.talentDescription!=null&&this.state.talentDescription!==""&&this.state.locationVal!=null&&this.state.locationVal!==""&&this.state.category!=null&&this.state.category!==""){
            fetch('http://127.0.0.1:8000/editLearningRequest/',{
                method: 'POST',
                headers: {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+this.state.token,
                },
                body: JSON.stringify({
                    nameOfTalent:this.state.nameOfTalent,
                    category:this.state.category,
                    talentDescription:this.state.talentDescription,
                    location:this.state.locationVal,
                    user:this.state.userName,
                    token:this.state.token,
                    requestid:this.state.requestid
                }),
            }).then(response=>response.json()).then(res=>{
                if(res.edit){
                    this.setState({
                        error: "Done...", 
                   });
                }
                else{
                    this.setState({
                        error: res.error, 
                   });
                }
            })   
        }
        else{
            let message=null;
            if(this.state.nameOfTalent==null||this.state.nameOfTalent===""){
                message="Enter Name Of Talent ";
            }
            if(this.state.category==null||this.state.category===""){
                if (message==null)
                    message="Enter Category ";
                else{
                    message=message+", Category ";
                }
            }
            if(this.state.talentDescription==null||this.state.talentDescription===""){
                if (message==null)
                    message="Enter Description ";
                else{
                    message=message+", Description ";
                }
            }
            if(this.state.locationVal==null||this.state.locationVal===""){
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
    render(){
        return(
            <div className="ccard text-white bg-primary mb-3">
                <br/>
                <label>{this.state.error}</label>
                <br/>
                    <label>
                        Name of Talent:
                        <input value={this.state.nameOfTalent} className="form-control" type="text" onChange={this.nameOfTalentEntered} name="userName" placeholder="Name of Talent..."/>
                    </label>
                    <br/>
                    <label>
                        Category:
                        <input className="form-control" value={this.state.category}  type="text" onChange={this.categoryEntered} name="category" placeholder="Category..."/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea class="form-control" value={this.state.talentDescription} id="descriprion" onChange={this.descriptionEntered} rows="4" placeholder="Enter your talent Description..."></textarea>
                    </label>
                    <br/>
                    <label>
                        Location:
                        <input className="form-control" value={this.state.locationVal} type="text" onChange={this.locationEntered} name="password"  placeholder="Location..."/>
                    </label> 
                <br/>
                <button className="btn btn-primary" onClick={this.createTeacherRequest}  value="Submit" >Submit</button> 
            </div>
        );
    }
}
export default EditLearningRequest;