import React,{ Component} from "react";
import axios from 'axios';


export default class Dashboard extends Component{
    constructor(props){
      super(props);
  
      this.state={
        tickets:[]
      };
    }
    
      componentDidMount(){
        this.retrieveTickets();
      }
  
    retrieveTickets(){
      axios.get("http://localhost:4003/").then(res=>{
        if(res.data.success){
          this.setState({
            tickets:res.data.existingTickets
            });
            console.log(this.state.tickets)
        }
      });
    }
  
   
  
    filterData(tickets,searchKey){
  
      const result = tickets.filter((ticket) =>
      ticket.topic.toLowerCase().includes(searchKey)||
      ticket.description.toLowerCase().includes(searchKey)||
      ticket.postCategory.toLowerCase().includes(searchKey)
      )
    this.setState({tickets:result})
    }
  
    handleSearchArea= (e)=>{
      const searchKey = e.currentTarget.value;
      axios.get("http://localhost:4003/").then(res=>{
          if(res.data.success){
            
              this.filterData(res.data.existingtickets,searchKey)
    }
  });
    }
  
   render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
              <h4>My Tickets </h4>
          </div>
          <div className="col-lg-3 mt-2 mb-3">
              <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}>
  
              </input>
          </div>
        </div>
          
            <table className="table table-hover" style={{marginTop:'40px'}}>
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">subject</th>
                  <th scope="col">openAt</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tickets.map((tickets,index)=>(
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                      <a href={ `/ticket/${tickets._id}`} style={{textDecoration:'none'}}>
                      {tickets.subject}
                      </a>
                    </td>
                    <td>{tickets.openAt}</td>
                    <td>{tickets.status}</td>
                   
                  </tr>
  
                ))}
              </tbody>
            </table>
          
          <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create new Ticket</a></button>
  
  
      </div>
   
    
     )
   }
  }
  