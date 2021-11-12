
import "./App.css";
import { Route, Switch, Redirect} from "react-router-dom";
import Navbar from './components/Navbar'
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

     <Navbar />
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
