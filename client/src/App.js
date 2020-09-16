import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Switch, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import CreateCard from "./components/create-card";
import MyCards from "./components/my-cards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protected-route";
import EditCard from "./components/edit-card";
import WishList from "./components/wish-list";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main className="main" style={{ minHeight: "900px" }}>
          <Switch>
            <ProtectedRoute path="/my-gallery/edit/:id" component={EditCard} />
            <ProtectedRoute path="/my-gallery" component={MyCards} />
            <ProtectedRoute path="/wish-list" component={WishList} />
            <ProtectedRoute path="/create-card" component={CreateCard} />
            <Route path="/user/logout" component={Logout} />
            <Route path="/user/signin" component={Signin} />
            <Route path="/user/signup" component={Signup} />
            <Route path="/about" component={About} />
            <Route path="/home" exact render={() => <Home user={user} />} />
            <Route path="/" exact render={() => (window.location = "/home")} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
