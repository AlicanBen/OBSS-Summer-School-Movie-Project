import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/users/movieList"> Movies</Link>
        </div>
      </div>
    );
  }
}
