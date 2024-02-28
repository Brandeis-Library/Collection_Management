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
//import { config } from "./config/.env";

function App() {

  console.log("process.env.NODE_ENV-----------------  ", process.env.NODE_ENV);

  //console.log("config-----------------  ", config);

  const AuthRouteStudent = (props) => {
    console.log("props inside auth route", props);
    console.log("store.getState().account.role", store.getState().account.role);
    if (!store.getState().account.loggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    } else if (store.getState().account.role === "Student" || store.getState().account.role === "Staff" || store.getState().account.role === "Admin") {

      const { component, path } = props;
      return <Route path={path} component={component} />;
    }
    else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  const AuthRouteStaff = (props) => {
    console.log("props inside auth route", props);
    console.log("store.getState().account.role", store.getState().account.role);
    if (!store.getState().account.loggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    } else if (store.getState().account.role === "Staff" || store.getState().account.role === "Admin") {
      const { component, path } = props;
      return <Route path={path} component={component} />;
    }
    else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  const AuthRouteAdmin = (props) => {
    console.log("props inside auth route", props);
    console.log("store.getState().account.role", store.getState().account.role);
    if (!store.getState().account.loggedIn) {
      return <Redirect to={{ pathname: '/' }} />;
    } else if (store.getState().account.role === "Admin") {

      const { component, path } = props;
      return <Route path={path} component={component} />;
    }
    else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={Root} exact />
        <AuthRouteStudent path="/inventory" component={Inventory} />
        <AuthRouteStaff path="/mapping" component={Mapping} />
        <AuthRouteAdmin path="/admin" component={Admin} />
        <AuthRouteStaff path="/BulkCheckin" component={BulkCheckin} />
        <Route path="/IronMountain" component={IronMountain} />
        <Route path="/404" component={My404Component} />
        <Redirect from="*" to="/404" />
      </Switch>
    </div>
  );
}

export default App;
