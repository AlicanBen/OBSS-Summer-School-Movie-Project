import React, { Component } from "react";
import UserMovieList from "../components/UserMovieList";
import axios from "axios";

export default class UserMovieListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: [], status: "LOADING...." };
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("http://localhost:9090/users/movieList", {
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
        {" "}
        <UserMovieList table={this.state.movieList} />{" "}
      </div>
    );
  }
}
