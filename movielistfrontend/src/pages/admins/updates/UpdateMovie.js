import React, { Component } from "react";
import axios from "axios";
export let director1 = {};

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      directorList: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDirectorInputChange = this.handleDirectorInputChange.bind(this);
  }
  componentDidMount() {
    const jwttoken = localStorage.getItem("jwttoken");
    console.log(jwttoken);
    axios
      .get("/admins/movies/update", { headers: { Authorization: jwttoken } })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });

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
    console.log("asdasf", this.props.location.state);
    var movies1 = this.props.location.state;
    this.setState({ movie: movies1 });
    console.log(movies1);
  }
  handleInputChange(event) {
    console.log([event.target.name] + ":" + [event.target.value]);
    this.setState({ [event.target.name]: event.target.value });
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
    console.log(this.state.user);
    let name = this.state.name;
    let releaseDate = this.state.releaseDate;
    let imdbRating = this.state.imdbRating;
    let duration = this.state.duration;
    let genre = this.state.genre;

    let newUser = {
      id: this.state.movie.id,
      name: name !== undefined ? name : this.state.movie.name,
      releaseDate:
        releaseDate !== undefined ? releaseDate : this.state.movie.releaseDate,
      imdbRating:
        imdbRating !== undefined ? imdbRating : this.state.movie.imdbRating,
      duration: duration !== undefined ? duration : this.state.movie.duration,
      genre: genre !== undefined ? genre : this.state.movie.genre,
      director: director1
    };
    console.log(newUser);
    axios
      .put(
        "http://localhost:9090/admins/movies/update",

        newUser,
        {
          headers: { Authorization: jwttoken }
        }
      )
      .then(obj => {
        this.setState({ resultMessage: "Congrats user succesfully added." });
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
            <label>Name :</label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              Value={this.state.movie.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Release Date :</label>
          </div>
          <div>
            <input
              type="text"
              Value={this.state.movie.releaseDate}
              name="releaseDate"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>IMDB Rating :</label>
          </div>
          <div>
            <input
              Value={this.state.movie.imdbRating}
              type="text"
              name="imdbRating"
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
              Value={this.state.movie.duration}
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
              Value={this.state.movie.genre}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Director :</label>
          </div>
          <div>
            <select name="directors" onChange={this.handleDirectorInputChange}>
              <option value="blank" selected />
              {this.state.directorList.map(director => (
                <option value={director.name}>{director.name}</option>
              ))}
            </select>
          </div>

          <input
            type="button"
            value="Update Movie"
            onClick={this.handleButtonClick}
          />
          <hr />
          {this.state.resultMessage}
        </form>
      </div>
    );
  }
}
