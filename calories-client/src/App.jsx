import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Page404 from "./common-component/Page404";
import AppContextProvider from "./context";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./auth/PrivateRoute";
import { privateRoutesPath } from "./utils/routs";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

// Style Sheets
// import "./App.css";
import "../src/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import MainLayout from "./layouts/MainLayout";
import User from "./Main/users/User";
import Admin from "./Main/admin/Admin";
import AllUserFood from "./Main/admin/AllUserFood";
import CreateUser from "./Main/users/CreateUser";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log(privateRoutesPath);
  return (
    <AppContextProvider>
      <MainLayout>
        <Router>
          <Switch>
            <Route path="/" exact component={User} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/create/user" exact component={CreateUser} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/admin/user/foods/:id" exact component={AllUserFood} />
            {/* {privateRoutesPath.map((item, index) => {
            return <PrivateRoute key={index} {...item} />;
          })}
          <PrivateRoute path="*" exact component={Page404} /> */}
          </Switch>
        </Router>
        <ToastContainer />
      </MainLayout>
    </AppContextProvider>
  );
}

export default App;
