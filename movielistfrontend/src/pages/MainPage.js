import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <div>
          <p>
            Welcome to <strong>MovieService</strong>
          </p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}
