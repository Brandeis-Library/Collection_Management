import "./App.css";
import store from "./redux/store";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Root from "./components/Root";
import Inventory from "./components/Inventory/Inventory";
import Mapping from "./components/Mapping";
import Admin from "./components/Admin";
import BulkCheckin from "./components/BulkCheckin";
import IronMountain from "./components/IronMountain";
import My404Component from "./components/My404Component";

function App() {

  const AuthRoute = (props) => {
    if (!store.getState().account.loggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    } else {
      const { component, path } = props;
      return <Route path={path} component={component} />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={Root} exact />
        <AuthRoute path="/inventory" component={Inventory} />
        <AuthRoute path="/mapping" component={Mapping} />
        <AuthRoute path="/admin" component={Admin} />
        <AuthRoute path="/BulkCheckin" component={BulkCheckin} />
        <Route path="/IronMountain" component={IronMountain} />
        <Route path="/404" component={My404Component} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
