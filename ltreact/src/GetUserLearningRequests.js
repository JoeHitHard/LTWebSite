// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
import EditLearningRequest from './EditLearningRequest';
class GetUserLearningRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            sort:"timeStamp",
            offset:0,
            user:props.user,
            token:props.token,
            objects:null,
            isEnd:null,
            message:null,
            objectToEdit:null,
        };
    }
    linkStyle={
        fontSize:"64px",
        color:"white",
    }
    changeEditObject=(event)=>{
        var k=event.target.value;
        k=JSON.parse(k);
        var obj=<EditLearningRequest requestid={k.id} username={this.state.user} locationintial={k.locationOfTeaching} token={this.state.token}  nameOfTalent={k.name} talentDescription={k.description} category={k.category}/>;
         this.setState({
             objectToEdit:obj,
            })
        }
        deleteARequest=(event)=>{
            var reqid=event.target.value;
            fetch('http://127.0.0.1:8000/deleteUserLearningRequest/',{
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : 'Token '+this.state.token,
                    },
                    body: JSON.stringify({
                        user: this.state.user,
                        token:this.state.token,
                        requestid:reqid,
                    }),
                }).then(response=>response.json()).then(res=>{
                    if(res.delete){
                        this.setState({
                            message:"Learning Request Has been Deleted",
                        });
                    }
                    else{
                        this.setState({
                           message:res.error,
                        });
                    }
                });
        }
    loadLearningRequests=()=>{
        if(!(this.state.isEnd)){
            fetch('http://127.0.0.1:8000/getUserLearningRequest/',{
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Token '+this.state.token,
                },
                body: JSON.stringify({
                    user: this.state.user,
                    token:this.state.token,
                    offset:this.state.offset,
                    sort:this.state.sort,
                }),
            }).then(response=>response.json()).then(res=>{
                if(res.got){
                    var objectList=[];
                    objectList.push(this.state.objects);
                    var end=null;
                    for (let i=0;i<5;i++){
                        var k=res.listObjects[i];
                        if(k===undefined){
                            end=<div className="card text-white bg-danger mb-3"> <b>This is the end of Teaching Requests</b></div>;
                            break;
                        }
                        let reqObjects=(
                            <div className="ccard text-white bg-primary mb-3">
                                <h1 className="card-header">{k.name}</h1>
                                <label class="lead">Description: <br/>{k.description}</label>
                                <hr class="my-4" />
                                <label > Category: {k.category}|</label>
                                <label>Location: {k.locationOfTeaching}|</label>
                                <label>User Name: {k.username}|</label>
                                <lable>Phone Number: {k.contactinfo}| </lable>
                                <br/>
                                <a  id="myLink" href={k.youtubelink} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube-square" style={this.linkStyle}></i></a>
                                <br/>
                                <button className="btn btn-outline-success" onClick={this.changeEditObject} value={JSON.stringify(k)} >Edit</button>
                                <button className="btn btn-outline-danger" onClick={this.deleteARequest} value={k.id} >Delete</button>
                            </div>
                        );
                        objectList.push(reqObjects);
                    }
                    this.setState({
                        objects:objectList,
                        isEnd:end,
                        offset:this.state.offset+5,
                    })
                }
                this.setState({
                    error:res.error,
                })
            });
        }
    }
    render(){
        this.loadLearningRequests();
        return(
            <div  className="card text-white bg-primary mb-3">
                <h1 className="card-title">Learning Requests</h1>
                <label>{this.state.message}</label>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                {this.state.objectToEdit}
                {this.state.objects}
                {this.state.isEnd}
                <br/>
                <button className="btn btn-primary" onClick={this.loadLearningRequests}  value="Submit" >Load</button>
            </div>
        );
    }
}
export default GetUserLearningRequests;