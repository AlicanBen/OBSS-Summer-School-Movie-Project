import React, { Component } from "react";
import axios from "axios";
export let director1 = {};
export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directorList: [],
      directors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDirectorInputChange = this.handleDirectorInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("http://localhost:9090/admins/directors/search?", {
        headers: { Authorization: jwttoken }
      })
      .then(obj => {
        this.setState({
          directorList: obj.data
        });
        console.log("directors", this.state.directorList);
      })
      .catch(err => {
        console.log("adsadsafasfsa");

        console.log(err);
      });
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  handleDirectorInputChange(event) {
    this.state.directorList.map(
      director =>
        (director1 =
          director.name === event.target.value ? director : director1)
    );

    console.log("director1 :", director1);
  }

  handleButtonClick() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    console.log(this.state);
    console.log(director1);

    axios
      .post(
        "http://localhost:9090/admins/movies/add",
        {
          name: this.state.name,
          releaseDate: this.state.releaseDate,
          imdbRating: parseFloat(this.state.imdbRating),
          duration: this.state.duration,
          genre: this.state.genre,
          director: director1
        },
        {
          headers: { Authorization: jwttoken }
        }
      )
      .then(obj => {
        this.setState({ resultMessage: "Congrats movie succesfully added." });
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
            <label>Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Release Date :</label>
          </div>
          <div>
            <input
              type="text"
              name="releaseDate"
              value={this.state.releaseDate}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>IMDB Rating :</label>
          </div>
          <div>
            <input
              type="text"
              name="imdbRating"
              value={this.state.imdbRating}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Duration :</label>
          </div>
          <div>
            <input
              type="text"
              name="duration"
              value={this.state.duration}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Genre :</label>
          </div>
          <div>
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Director :</label>
          </div>
          <div>
            <select name="directors" onChange={this.handleDirectorInputChange}>
              <option value="blank" />
              {this.state.directorList.map(director => (
                <option value={director.name} default>
                  {director.name}
                </option>
              ))}
            </select>
          </div>
          <br />

          <input
            type="button"
            value="Add Movie"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
