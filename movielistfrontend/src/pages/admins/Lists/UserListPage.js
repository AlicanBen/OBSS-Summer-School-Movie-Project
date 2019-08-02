import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class UserListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], status: "LOADING...." };
    this.Delete = this.Delete.bind(this);
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("http://localhost:9090/admins/users/search", {
        headers: { Authorization: jwttoken }
      })
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      })
      .catch(err => {
        console.log(err);
      });
  }
  Delete(props) {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(props.id);
    console.log(jwttoken);
    axios
      .delete("http://localhost:9090/admins/users/delete?id=" + props.id, {
        headers: { Authorization: jwttoken }
      })
      .then(res => this.componentDidMount)
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/admins/users/add">Add User</Link>
        </div>
        <h3>USERS</h3>
        <table>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th />
            <th />
          </tr>

          {this.state.users.map(item => (
            <tr>
              <td>{item.username}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>

              <td>
                {console.log(item)}
                <input
                  type="button"
                  value="DELETE"
                  onClick={() => this.Delete(item)}
                />
              </td>
              <Link
                to={{
                  pathname: "/admins/users/update",
                  state: item
                }}
              >
                <input type="button" value="Update" />
              </Link>

              <td />
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
