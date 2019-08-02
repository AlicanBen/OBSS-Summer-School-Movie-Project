import React, { Component } from "react";
import axios from "axios";
export let director1 = {};

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = { resultMessage: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  componentDidMount() {
    director1 = this.props.location.state;
    console.log("asdasf", director1);
  }
  handleInputChange(event) {
    console.log([event.target.name] + ":" + [event.target.value]);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleButtonClick() {
    const jwttoken = localStorage.getItem("jwttoken");
    let name = this.state.name;
    let surName = this.state.surName;
    let birthDate = this.state.birthDate;
    let birthPlace = this.state.birthPlace;

    let newdirector1 = {
      id: director1.id,
      name: name !== undefined ? name : director1.name,
      surName: surName !== undefined ? surName : director1.surName,
      birthDate: birthDate !== undefined ? birthDate : director1.birthDate,
      birthPlace: birthPlace !== undefined ? birthPlace : director1.birthPlace
    };
    console.log("newdirector1", newdirector1);
    axios
      .put(
        "http://localhost:9090/admins/directors/update",

        newdirector1,
        {
          headers: { Authorization: jwttoken }
        }
      )
      .then(obj => {
        this.setState({
          resultMessage: "Congrats director succesfully updated."
        });
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
            <label>Firs Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              defaultValue={director1.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Last Name :</label>
          </div>
          <div>
            <input
              type="text"
              defaultValue={director1.surName}
              name="surName"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Birth Date :</label>
          </div>
          <div>
            <input
              defaultValue={director1.birthDate}
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
              defaultValue={director1.birthPlace}
              onChange={this.handleInputChange}
            />
          </div>

          <input
            type="button"
            value="Update Director"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
