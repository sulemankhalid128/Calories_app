import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Page404 from "./common-component/Page404";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./auth/PrivateRoute";
import { privateRoutesPath } from "./utils/routs";

// Style Sheets
// import "./App.css";
import "../src/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import MainLayout from "./layouts/MainLayout";
import User from "./Main/users/UserPenal";
import "react-toastify/dist/ReactToastify.css";
import ResetLimitAndToken from "./auth/ResetLimitAndToken";

function App() {
  return (
    <MainLayout>
      <Router>
        <Switch>
          <Route path="/" exact component={User} />
          <Route
            key="threshold"
            path="/reset/threshold/:id/:limit"
            exact
            component={ResetLimitAndToken}
          />
          <Route
            key="token"
            path="/reset/token/:id"
            exact
            component={ResetLimitAndToken}
          />
          <Route
            key="username"
            path="/change/user/:name"
            exact
            component={ResetLimitAndToken}
          />
          {privateRoutesPath.map((item, index) => {
            return <PrivateRoute key={index} {...item} />;
          })}
          <Route path="*" exact component={Page404} />
        </Switch>
      </Router>
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
