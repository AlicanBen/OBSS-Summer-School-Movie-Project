import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AdminPage extends Component {
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("/", { headers: { Authorization: jwttoken } })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/admins/users"> Users</Link>
        </div>
        <div>
          <Link to="/admins/movies"> movies</Link>
        </div>
        <div>
          <Link to="/admins/directors"> directors</Link>
        </div>
      </div>
    );
  }
}
