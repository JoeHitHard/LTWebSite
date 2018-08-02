// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
class CreateLearningRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            mainSS:props.mainSS,
            userName:props.username,
            token:props.token,
            nameOfTalent:null,
            youTubeLink:null,
            category:null,
            locationVal:props.locationintial,
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
            locationintial:null,
            locationVal: event.target.value, 
       });
    }
    createTeacherRequest=()=>{
        if(this.state.nameOfTalent!=null&&this.state.nameOfTalent!==""&&this.state.talentDescription!=null&&this.state.talentDescription!==""&&this.state.locationVal!=null&&this.state.locationVal!==""&&this.state.category!=null&&this.state.category!==""){
            fetch('http://127.0.0.1:8000/createlearningRequest/',{
                method: 'POST',
                headers: {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Token '+this.state.token,
                },
                body: JSON.stringify({
                    nameOfTalent:this.state.nameOfTalent,
                    category:this.state.category,
                    location:this.state.locationVal,
                    user:this.state.userName,
                    description:this.state.talentDescription,
                    token:this.state.token,
                }),
            }).then(response=>response.json()).then(res=>{
                if(res.created){
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
                <h1 className="card-header">Learning Request</h1>
                <div className="card-body">
                <label>{this.state.error}</label>
                <form>
                    <label>
                        Name of Talent:
                        <input className="form-control" type="text" onChange={this.nameOfTalentEntered} name="userName" placeholder="Name of Talent..."/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea class="form-control" id="descriprion" onChange={this.descriptionEntered} rows="4" placeholder="Enter your talent Description..."></textarea>
                    </label>
                    <br/>
                    <label>
                        Category:
                        <input className="form-control"  type="text" onChange={this.categoryEntered} name="password" placeholder="Category..."/>
                    </label>
                    <br/>
                    <label>
                        Location:
                        <input className="form-control" type="text" onChange={this.locationEntered} name="password" value={this.state.locationVal}  placeholder="Location..."/>
                    </label> 
                </form>
                <br/>
                <button className="btn btn-primary" onClick={this.createTeacherRequest}  value="Submit" >Submit</button> 
                </div>
            </div>
        );
    }
}
export default CreateLearningRequest;