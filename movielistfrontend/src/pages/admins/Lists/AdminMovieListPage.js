import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AdminMovieListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], status: "LOADING...." };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("http://localhost:9090/admins/movies/search?", {
        headers: { Authorization: jwttoken }
      })
      .then(res => {
        this.setState({ movieList: res.data });
        console.log(this.state.movieList);
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
      .delete("http://localhost:9090/admins/movies/delete?id=" + props.id, {
        headers: { Authorization: jwttoken }
      })
      .then(res => this.componentDidMount)
      .catch(err => {
        console.log(err);
      });
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log([event.target.name], ":", event.target.value);
  }

  render() {
    let name = this.state.name;
    console.log("name:", name);
    return (
      <div>
        <div>
          <Link to="/admin/movies/add">Movie Add</Link>
        </div>
        <div>
          Director's Movies Search
          <input type="text" name="name" onChange={this.handleInputChange} />
          <Link
            to={{
              pathname: "/admins/directors-movies",
              item: name
            }}
          >
            <input type="button" value="Search" />
          </Link>
        </div>
        <h3>Movies </h3>

        <table>
          <tr>
            <th>Movie Name</th>
            <th>Release Date</th>
            <th>IMDB Rating</th>
            <th>Duration</th>
            <th>Genre</th>
            <th />
            <th />
          </tr>

          {this.state.movieList.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>{item.releaseDate}</td>
              <td>{item.imdbRating}</td>
              <td>{item.duration}</td>
              <td>{item.genre}</td>
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
                    pathname: "/admins/movies/update",
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
