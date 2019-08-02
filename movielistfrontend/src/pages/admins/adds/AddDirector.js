import React, { Component } from "react";
import axios from "axios";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { resultMessage: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log([event.target.name], ":", event.target.value);
  }

  handleButtonClick() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    console.log(this.state);

    axios
      .post(
        "http://localhost:9090/admins/directors/add",
        {
          name: this.state.name,
          surName: this.state.surName,
          birthDate: this.state.birthDate,
          birthPlace: this.state.birthPlace
        },
        {
          headers: { Authorization: jwttoken }
        }
      )
      .then(obj => {
        this.setState({
          resultMessage: "Congrats director succesfully added."
        });
        //  console.log(obj.data);
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
            <label>Firs Name :</label>
          </div>
          <div>
            <input type="text" name="name" onChange={this.handleInputChange} />
          </div>
          <div>
            <label>Last Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="surName"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Birth Date :</label>
          </div>
          <div>
            <input
              type="text"
              name="birthDate"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Birth Place :</label>
          </div>
          <div>
            <input
              type="text"
              name="birthPlace"
              onChange={this.handleInputChange}
            />
          </div>
          <input
            type="button"
            value="Add Director"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
