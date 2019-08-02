import React, { Component } from "react";
import axios from "axios";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      isAdmin: "",
      isDisabled: "false"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleInputChange(event) {
    console.log([event.target.name] + ":" + [event.target.value]);
    this.setState({ [event.target.name]: event.target.value });
  }
  handleCheckboxChange(event) {
    if (event.target.name === "isAdmin") {
      console.log(
        [event.target.name] + ":" + event.target.checked ? "admin" : "false"
      );

      this.setState({
        [event.target.name]: event.target.checked ? "admin" : "user"
      });
    } else if (event.target.name === "isDisabled") {
      console.log(
        [event.target.name] + ":" + event.target.checked ? "true" : "false"
      );
      this.setState({
        [event.target.name]: event.target.checked ? "true" : "false"
      });
    }
  }
  handleButtonClick() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    console.log({
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
      isDisabled: this.state.isDisabled
    });
    axios
      .post(
        "http://localhost:9090/admins/users/add",
        {
          username: this.state.username,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          isAdmin: this.state.isAdmin,
          isDisabled: this.state.isDisabled
        },
        {
          headers: { Authorization: jwttoken }
        }
      )
      .then(obj => {
        this.setState({ resultMessage: "Congrats user succesfully added." });
        console.log(obj.data);
      })
      .catch(err => {
        this.setState({ resultMessage: "I found some error." });
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <form>
          <div>
            <label>Username :</label>
          </div>
          <div>
            <input
              type="text"
              name="username"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>First Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Last Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>E-mail :</label>
          </div>
          <div>
            <input
              type="text"
              name="email"
              value={this.state.mail}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password :</label>
          </div>
          <div>
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            {" "}
            <label>Is Admin :</label>
          </div>
          <div>
            <select name="isAdmin" onChange={this.handleInputChange}>
              <option value="blank" default />
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            {" "}
            <label>Is Disabled :</label>
          </div>
          <div>
            <select name="isDisabled" onChange={this.handleInputChange}>
              <option value="blank" default />
              <option value="false">Active</option>
              <option value="true">Disabled</option>
            </select>
          </div>
          <br />

          <input
            type="button"
            value="Add User"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
