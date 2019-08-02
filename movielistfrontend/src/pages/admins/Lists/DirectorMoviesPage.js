import React, { Component } from "react";
import axios from "axios";
export let name = undefined;
export default class DirectorMoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], status: "LOADING...." };
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    name = this.props.location.item;
    console.log(name);
    axios
      .get("http://localhost:9090/admins/" + name, {
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

  render() {
    return (
      <div>
        <h3>{name} Movies </h3>
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
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
