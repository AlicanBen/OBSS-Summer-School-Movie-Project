import axios from "axios";

export function tokenToHeader() {
  const jwttoken = localStorage.getItem("jwttoken");

  axios
    .get("/movies", { headers: { Authorization: "Bearer " + jwttoken } })
    .then(res => {
      console.log(res.data);

      this.setState({ users: res.data });
    })
    .catch(err => {
      console.log(err);
    });
}

export const formSubmitHandler = e => {
  e.preventDefault();

  const { username, password } = this.state.input;

  axios
    .post("http://localhost:9090/login", { username, password })
    .then(res => {
      console.log(res.data);
      localStorage.setItem("jwttoken", res.data.token);

      this.setState({
        userData: res.data
      });

      this.props.history.push("/users");
    })
    .catch(err => {
      console.log(err);
    });
};
