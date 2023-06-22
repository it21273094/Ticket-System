import React,{ Component} from 'react';
import axios from 'axios';

export default class Home extends Component{
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
    axios.get("http://localhost:4003/tickets").then(res=>{
      if(res.data.success){
        this.setState({
          tickets:res.data.existingTickets
          });
          console.log(this.state.tickets)
      }
    });
  }

  onDelete =(id)=>{
    axios.delete(`http://localhost:4003/ticket/delete/${id}`).then((res)=>{
    alert("Delete Successfully");
    this.retrieveTickets();
    })
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
    axios.get("http://localhost:4003/tickets").then(res=>{
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
            <h4>My posts </h4>
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
                <th scope="col">#</th>
                <th scope="col">Topics</th>
                <th scope="col">Description</th>
                <th scope="col">Post Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tickets.map((tickets,index)=>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>
                    <a href={ `/ticket/${tickets._id}`} style={{textDecoration:'none'}}>
                    {tickets.topic}
                    </a>
                  </td>
                  <td>{tickets.description}</td>
                  <td>{tickets.postCategory}</td>
                  <td> 
                    <a className="btn btn-warning" href={`/edit/${tickets._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(tickets._id)}>
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        
        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create new Ticket</a></button>


    </div>
 
  
   )
 }
}
