import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class DirectorListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { directorList: [], status: "LOADING...." };
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log("token", jwttoken);
    axios
      .get("http://localhost:9090/admins/directors/search?", {
        headers: { Authorization: jwttoken }
      })
      .then(res => {
        this.setState({ directorList: res.data });
        console.log("directors:", this.state.directorList);
      })
      .catch(err => {
        console.log("erorrs:", err);
      });
  }

  Delete(props) {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(props.id);
    axios
      .delete("http://localhost:9090/admins/directors/delete?id=" + props.id, {
        headers: { Authorization: jwttoken }
      })
      .then(res => this.render)
      .catch(err => {
        console.log("error:", err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/admins/directors/add">Director Add</Link>
        </div>
        <h3>Directors</h3>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Birth Place</th>
            <th />
            <th />
          </tr>

          {this.state.directorList.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>{item.surName}</td>
              <td>{item.birthDate}</td>
              <td>{item.birthPlace}</td>
              <td>
                <input
                  type="button"
                  value="DELETE"
                  onClick={() => this.Delete(item)}
                />
              </td>
              <td>
                <Link
                  to={{
                    pathname: "/admins/directors/update",
                    state: item
                  }}
                >
                  <input type="button" value="UPDATE" />
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
