//import logo from './logo.svg';
import "./App.css";
import { Route, Switch, Redirect} from "react-router-dom";

import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Mapping from "./components/Mapping";
import Admin from "./components/Admin";
import BulkCheckin from "./components/BulkCheckin";
import IronMountain from "./components/IronMountain";
import My404Component from "./components/My404Component"
// testing Pretti
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/inventory" component={Inventory} />
        <Route path="/mapping" component={Mapping} />
        <Route path="/admin" component={Admin} />
        <Route path="/BulkCheckin" component={BulkCheckin} />
        <Route path="/IronMountain" component={IronMountain} />
        <Route path='/404' component={My404Component} />
        <Redirect from='*' to='/404' />
      </Switch>
    </div>
  );
}

export default App;
