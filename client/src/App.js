
import React,{ Component} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

//import AddTicket  from "./components/AddTicket";
import Dashboard  from './components/dashboard';
//import TicketLists from "./components/TicketLists";
//import TicketTable  from "./components/TicketTable";


export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <div className="container">
          <Routes>
 
            <Route  path="/" element ={<Dashboard/>}/>
          
         </Routes>
        </div></BrowserRouter>
      
    );
  }
}