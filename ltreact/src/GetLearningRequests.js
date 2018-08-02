// eslint-disable-next-line
import React, { Component } from 'react';
import './mainBoot.css';
class GetLearningRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            sort:"timeStamp",
            offset:0,
            user:props.user,
            token:props.token,
            objects:null,
            isEnd:null,
            getFrom:props.getFrom
        };
    }
    linkStyle={
        fontSize:"64px",
        color:"white",
    }
    loadLearningRequests=()=>{
        if(!(this.state.isEnd)){
            fetch(this.state.getFrom,{
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
                            end=<div className="card text-white bg-danger mb-3"> <b>This is the end of Learning Requests</b></div>;
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
        return(
            <div  className="card text-white bg-primary mb-3">
                <h1 className="card-title">Learning Requests</h1>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                {this.state.objects}
                {this.state.isEnd}
                <br/>
                <button className="btn btn-primary" onClick={this.loadLearningRequests}  value="Submit" >Load</button>
            </div>
        );
    }
}
export default GetLearningRequests;