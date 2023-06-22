import React,{ Component} from 'react';

export default class Navebar extends Component{
  render(){
    return(
        <div>
          <nav className="navbar bg-light">
          <div className="container-fluid">
          <a className="navbar-brand" href="/">tickets</a>
          </div>
          </nav>
            
        </div>
    )
  }
}