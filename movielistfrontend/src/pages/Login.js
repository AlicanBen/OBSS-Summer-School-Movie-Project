import React, { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [], username1: "", password1: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  formSubmitHandler(e) {
    e.preventDefault();
    var token = null;
    const username = this.state.username1;
    const password = this.state.password1;

    console.log({ username, password });
    axios
      .post("http://localhost:9090/login", { username, password })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwttoken", "Bearer " + res.data.token);
        this.setState({ isAdmin: res.data.isAdmin });

        this.setState({
          userData: res.data
        });
        token = decode(localStorage.getItem("jwttoken"));
        console.log(token);
        console.log(this.state.isAdmin);
        this.state.isAdmin === "admin"
          ? this.props.history.push("/admins")
          : this.props.history.push("/users");
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const action =
      this.state.isAdmin === "admin"
        ? "http://localhost:9090/admins"
        : "http://localhost:9090/users";
    return (
      <div>
        <form action={action} className="">
          <label>
            Username:
            <input
              type="text"
              name="username1"
              onChange={this.handleInputChange}
            />
          </label>{" "}
          <label>
            Password:
            <input
              type="password"
              name="password1"
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Login" onClick={this.formSubmitHandler} />
        </form>
      </div>
    );
  }
}
