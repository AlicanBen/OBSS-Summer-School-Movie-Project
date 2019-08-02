import React, { Component } from "react";
import axios from "axios";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("/admins/users/update", { headers: { Authorization: jwttoken } })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.props.location.state);
    var user1 = {};
    var ser = this.props.location.state;

    for (var i = 0; i < ser; i++) {
      user1 = ser[i];

      console.log(user1);
    }

    this.setState({ user: user1 });
    console.log(user1);
    this.setState({ user: this.props.location.state });
  }
  handleInputChange(event) {
    console.log([event.target.name] + ":" + [event.target.value]);
    this.setState({ [event.target.name]: event.target.value });
  }
  handleCheckboxChange(event) {
    if (event.target.name === "isAdmin") {
      this.setState({
        [event.target.name]: event.target.checked ? "admin" : "user"
      });
    } else if (event.target.name === "isDisabled") {
      this.setState({
        [event.target.name]: event.target.checked ? "true" : "false"
      });
    }
  }
  handleButtonClick() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(this.state.user);
    let usernane = this.state.username;
    let mail = this.state.email;
    let frstNme = this.state.firstName;
    let isAdmn = this.state.isAdmin;
    let isDisbl = this.state.isDisabled;
    let lstName = this.state.lastName;
    let psswd = this.state.password;
    let newUser = {
      id: this.state.user.id,
      email: mail !== undefined ? mail : this.state.user.email,
      firstName: frstNme !== undefined ? frstNme : this.state.user.firstName,
      isAdmin: isAdmn !== undefined ? isAdmn : this.state.user.isAdmin,
      isDisabled: isDisbl !== undefined ? isDisbl : this.state.user.isDisabled,
      lastName: lstName !== undefined ? lstName : this.state.user.lastName,
      password: psswd !== undefined ? psswd : this.state.user.password,
      username: usernane !== undefined ? usernane : this.state.user.username
    };
    console.log(newUser);
    axios
      .put(
        "http://localhost:9090/admins/users/update",

        newUser,
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
              Value={this.state.user.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>First Name :</label>
          </div>
          <div>
            <input
              type="text"
              Value={this.state.user.firstName}
              name="firstName"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Last Name :</label>
          </div>
          <div>
            <input
              Value={this.state.user.lastName}
              type="text"
              name="lastName"
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
              Value={this.state.user.email}
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
          {this.componentDidMount}
          <input
            type="button"
            value="Update User"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
