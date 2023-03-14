import React from 'react';
import Nav from './components/Nav/Nav';
import Books from './components/Books/Books';
import home from './components/Home/home';
import Issue from './components/Issue/Issue';
import Return from './components/Return/Return';
import Search from './components/search/search';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo1 from "./Assets/image-1.png"
import Logo2 from "./Assets/image-2.png"


let getissueDetails = localStorage.getItem("isueDetails");
if (!getissueDetails)
  localStorage.setItem("isueDetails", '[]');

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Nav />
        <Switch>
          <Route path='/' exact strict component={home} />
          <Route path='/books' exact strict component={Books} />
          <Route path='/issue' exact strict component={Issue} />
          <Route path='/return' exact strict component={Return} />
          <Route path='/search' exact strict component={Search} />
          <Redirect from='*' to='/' />
        </Switch>
        <div style={{marginTop:"15%"}}>

        <div style={{ textAlign: "left", width : "40%" ,  float: "left"}}>
          <img src={Logo2} style={{ height: "300px" }} />
        </div>
        <div style={{ textAlign: "right", width : "40%",  float: "right" }}>
          <img src={Logo1} style={{ height: "300px" }} />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
